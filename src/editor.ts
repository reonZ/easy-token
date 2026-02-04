import { EditorApplication, PopoutType } from "application";
import { DirectorySource, getFilePath, PathCategory } from "directories";
import {
    addListener,
    addListenerAll,
    getSetting,
    localize,
    MODULE,
    notify,
    R,
    render,
    setStyleProperty,
} from "foundry-helpers";
import {
    ApplicationConfiguration,
    ApplicationRenderContext,
    ApplicationRenderOptions,
} from "foundry-pf2e/foundry/client/applications/_module.mjs";

export class TokenEditor extends foundry.applications.api.ApplicationV2 {
    #actor: Actor;
    #application: EditorApplication = new EditorApplication();

    constructor(actor: Actor, options: DeepPartial<ApplicationConfiguration> = {}) {
        options.id = TokenEditor.idFromActor(actor);
        super(options);
        this.#actor = actor;
    }

    static idFromActor(actor: Actor): string {
        return `easy-token-editor-${actor.uuid}`;
    }

    static async open(actor: Actor): Promise<void | TokenEditor> {
        const id = this.idFromActor(actor);
        const exist = foundry.applications.instances.get(id);

        if (exist) {
            return exist.bringToFront();
        } else {
            return new TokenEditor(actor).render(true);
        }
    }

    get actor(): Actor {
        return this.#actor;
    }

    get title(): string {
        const label = localize("label");
        return `${label} - ${this.actor.name}`;
    }

    get previewSize(): number {
        return this.#application.previewSize;
    }

    protected async _prepareContext(_options: ApplicationRenderOptions): Promise<EditorContext> {
        return {
            canBrowse: game.user.can("FILES_BROWSE"),
            isToken: this.actor.isToken,
            popoutRange: this.#application.defaultPopoutRange,
        };
    }

    protected _renderHTML(context: EditorContext, _options: ApplicationRenderOptions): Promise<string> {
        return render("editor", context);
    }

    protected async _onFirstRender(_context: object, _options: ApplicationRenderOptions): Promise<void> {
        setStyleProperty(this.element, "--preview-size", this.previewSize);

        // we wait one frame before initializing the canvas
        requestAnimationFrame(() => {
            const content = this.element.querySelector<HTMLElement>(".window-content");
            if (!content) return;

            content.prepend(this.#application.view);
            this.#application.resizeTo = content;
            this.#application.draw();
        });
    }

    protected _replaceHTML(result: string, content: HTMLElement, _options: ApplicationRenderOptions) {
        content.innerHTML = result;
        this.#activateListeners(content);
    }

    protected _onClickAction(_event: PointerEvent, target: HTMLElement) {
        const action = target.dataset.action as EventAction;

        switch (action) {
            case "load-avatar": {
                this.#unlockButtons();
                return this.#application.setAvatar(this.actor.img);
            }

            case "open-local": {
                return;
            }

            case "open-server": {
                return;
            }

            case "save-all": {
                return;
            }

            case "save-avatar": {
                return;
            }

            case "save-token": {
                return this.#saveToken();
            }
        }
    }

    #getFileName(category: PathCategory): string {
        const name = (this.actor.token?.name ?? this.actor.name).slugify({ strict: true });
        const fullName = this.actor.token ? `${name}.${this.actor.token.id}` : name;
        return `${fullName}.${category}.webp`;
    }

    async #saveImage(
        category: PathCategory,
        source: DirectorySource = getSetting("source"),
    ): Promise<string | undefined> {
        const base64 = await this.#application.getTokenBase64();
        const fileName = this.#getFileName(category);
        const filePath = getFilePath(this.actor.type, source, category);
        const blob = await fetch(base64).then((result) => result.blob());
        // @ts-ignore
        const bucket = source === "s3" ? game.data.files.s3?.buckets[0] : undefined;
        const FilePicker = foundry.applications.apps.FilePicker.implementation;

        const dirs = filePath.split("/");
        const cursors = [];

        for (const dir of dirs) {
            try {
                cursors.push(dir);
                const path = cursors.join("/");
                await FilePicker.createDirectory(source, path, { bucket });
            } catch (error: any) {}
        }

        try {
            const file = new File([blob], fileName, { type: "image/webp" });
            const response = await FilePicker.upload(source, filePath, file, { bucket }, { notify: false });

            const path = R.isObjectType(response) && response.status === "success" ? response.path : undefined;
            return path ? `${path}?${Date.now()}` : undefined;
        } catch (error: any) {
            MODULE.error("an error occured while saving an image", error);
        }
    }

    async #saveToken(source?: DirectorySource) {
        const path = await this.#saveImage("token", source);
        if (!path) return;

        const actor = this.actor;
        if (actor.token) {
            await actor.token.update({ "texture.src": path, "ring.enabled": false });
        } else {
            await actor.update({
                "prototypeToken.texture.src": path,
                "prototypeToken.ring.enabled": false,
            });

            const updatePromises = R.pipe(
                game.scenes.contents,
                R.map((scene) => {
                    const updates = R.pipe(
                        scene.tokens.contents,
                        R.filter((token) => token.actorId === actor.id && token.actorLink),
                        R.map((token) => {
                            return { _id: token.id, "texture.src": path, "ring.enabled": false };
                        }),
                    );

                    return scene.updateEmbeddedDocuments("Token", updates);
                }),
                R.flat(),
            );

            await Promise.all(updatePromises);
        }

        notify.info("editor.token-saved", { path });
    }

    #unlockButtons() {
        const buttons = this.element.querySelectorAll<HTMLButtonElement>(".menu button");

        for (const button of buttons) {
            if (button.dataset.action === "open-server") continue;
            button.disabled = false;
        }
    }

    #activateListeners(html: HTMLElement) {
        addListenerAll(
            html,
            `input[type="color"]`,
            "input",
            foundry.utils.throttle((target: HTMLInputElement) => {
                if (target.name === "background") {
                    this.#application.setBackgroundColor(target.value);
                } else if (target.name === "border") {
                    this.#application.setBorderColor(target.value);
                }
            }, 50),
        );

        addListener(html, `select[name="popout"]`, "change", (target: HTMLSelectElement) => {
            const popout = target.value as PopoutType;
            const input = target.nextElementSibling as HTMLInputElement;

            input.disabled = R.isIncludedIn(popout, ["disabled", "both"]);
            this.#application.setPopout(popout);
        });

        addListener(html, `input[name="popout-range"]`, "input", (target: HTMLInputElement) => {
            const range = target.valueAsNumber;
            this.#application.setPopoutRange(range);
        });
    }
}

type EventAction = "load-avatar" | "open-local" | "open-server" | "save-all" | "save-avatar" | "save-token";

type EditorContext = ApplicationRenderContext & {
    canBrowse: boolean;
    isToken: boolean;
    popoutRange: number;
};
