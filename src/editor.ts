import { EditorApplication, PopoutType } from "application";
import { DirectorySource, getFilePath, PathCategory } from "directories";
import {
    addListener,
    addListenerAll,
    getSetting,
    htmlQuery,
    localize,
    MODULE,
    notify,
    R,
    render,
    setSetting,
    setStyleProperty,
} from "foundry-helpers";
import { ActorPF2e } from "foundry-pf2e";

export class TokenEditor extends foundry.applications.api.ApplicationV2 {
    #actor: Actor;
    #application: EditorApplication = new EditorApplication();

    constructor(actor: Actor, options: DeepPartial<fa.ApplicationConfiguration> = {}) {
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

    protected async _onClose(_options: fa.ApplicationClosingOptions) {
        await setSetting("ring", this.#application.ring);
    }

    protected async _prepareContext(_options: fa.ApplicationRenderOptions): Promise<EditorContext> {
        return {
            canBrowse: game.user.can("FILES_BROWSE"),
            popoutRange: this.#application.defaultPopoutRange,
            warning: this.actor.isToken ? "token" : !this.actor.prototypeToken.actorLink ? "actor" : undefined,
        };
    }

    protected _renderHTML(context: EditorContext, _options: fa.ApplicationRenderOptions): Promise<string> {
        return render("editor", context);
    }

    protected async _onFirstRender(_context: object, _options: fa.ApplicationRenderOptions): Promise<void> {
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

    protected _replaceHTML(result: string, content: HTMLElement, _options: fa.ApplicationRenderOptions) {
        content.innerHTML = result;
        this.#activateListeners(content);
    }

    protected async _onClickAction(_event: PointerEvent, target: HTMLElement) {
        const action = target.dataset.action as EventAction;

        switch (action) {
            case "download": {
                const { base64 } = await this.#application.getTokenBase64();
                const blob = await fetch(base64).then((result) => result.blob());

                const link = document.createElement("a");
                link.download = this.#getFileName("token");
                link.href = window.URL.createObjectURL(blob);
                link.click();

                return;
            }

            case "load-avatar": {
                this.#unlockButtons();
                return this.#application.setAvatar(this.actor.img);
            }

            case "open-local": {
                const input = htmlQuery(target, "input");

                if (input) {
                    input.value = "";
                    input.click();
                }

                return;
            }

            case "open-server": {
                return this.#openBrowser();
            }

            case "ring-cycle": {
                const direction = Number(target.dataset.direction);
                return this.#application.cycleBorder(direction);
            }

            case "save-all": {
                const source = getSetting<DirectorySource>("source");
                await this.#saveAvatar(source);
                await this.#saveToken(source);
                return this.close();
            }

            case "save-avatar": {
                return this.#saveAvatar();
            }

            case "save-token": {
                return this.#saveToken();
            }
        }
    }

    async #openBrowser() {
        const picker = new CONFIG.ux.FilePicker({
            allowUpload: true,
            current: this.actor.img,
            callback: (path: string) => {
                this.#unlockButtons();
                this.#application.setAvatar(path);
            },
            type: "image",
        });

        return picker.browse();
    }

    #getFileName(category: PathCategory): string {
        const name = (this.actor.token?.name ?? this.actor.name).slugify({ strict: true });
        const fullName = this.actor.token ? `${name}.${this.actor.token.id}` : name;
        return `${fullName}.${category}.webp`;
    }

    async #saveImage(
        category: PathCategory,
        base64: string,
        source: DirectorySource = getSetting<DirectorySource>("source"),
    ): Promise<string | undefined> {
        const fileName = this.#getFileName(category);
        const filePath = getFilePath(this.actor.type, source, category);
        const blob = await fetch(base64).then((result) => result.blob());
        // @ts-ignore
        const bucket = source === "s3" ? game.data.files.s3?.buckets[0] : undefined;

        const dirs = filePath.split("/");
        const cursors = [];

        for (const dir of dirs) {
            try {
                cursors.push(dir);
                const path = cursors.join("/");
                await CONFIG.ux.FilePicker.createDirectory(source, path, { bucket });
            } catch (error: any) {}
        }

        try {
            const file = new File([blob], fileName, { type: "image/webp" });
            const response = await CONFIG.ux.FilePicker.upload(source, filePath, file, { bucket }, { notify: false });

            const path = R.isObjectType(response) && response.status === "success" ? response.path : undefined;

            if (path) {
                notify.info("editor.saved", category, { path });
                // we add cache buster
                return `${path}?${Date.now()}`;
            }
        } catch (error: any) {
            MODULE.error("an error occured while saving an image", error);
        }
    }

    async #saveAvatar(source?: DirectorySource) {
        const base64 = await this.#application.getAvatarBase64();
        const path = await this.#saveImage("avatar", base64, source);
        if (!path) return;

        await this.actor.update({ img: path });
    }

    #getTokenUpdates(
        token: TokenDocument | foundry.data.PrototypeToken<Actor>,
        path: string,
        baseScale: number,
        isPF2e: boolean,
    ) {
        const isPopout = baseScale !== 1;

        let scaleX = token.texture.scaleX < 0 ? baseScale * -1 : baseScale;
        let scaleY = token.texture.scaleY < 0 ? baseScale * -1 : baseScale;

        if (isPF2e && (token.actor as ActorPF2e).size === "sm") {
            scaleX *= 0.8;
            scaleY *= 0.8;
        }

        let updates: Record<string, any> = {
            "texture.scaleX": scaleX,
            "texture.scaleY": scaleY,
            "texture.src": path,
            "ring.enabled": false,
        };

        if (token instanceof foundry.data.PrototypeToken) {
            updates = R.mapKeys(updates, (key) => `prototypeToken.${key}`);
        }

        if (isPopout && isPF2e) {
            updates[`flags.${game.system.id}.autoscale`] = false;
        }

        return updates;
    }

    async #saveToken(source?: DirectorySource) {
        const { base64, scale } = await this.#application.getTokenBase64();
        const path = await this.#saveImage("token", base64, source);
        if (!path) return;

        const actor = this.actor;
        const isPF2e = R.isIncludedIn(game.system.id, ["pf2e", "sf2e"]);

        if (actor.token) {
            const updates = this.#getTokenUpdates(actor.token, path, scale, isPF2e);
            await actor.token.update(updates);
        } else {
            const actorUpdates = this.#getTokenUpdates(actor.prototypeToken, path, scale, isPF2e);
            await actor.update(actorUpdates);

            const updatePromises = R.pipe(
                game.scenes.contents,
                R.map((scene) => {
                    const updates = R.pipe(
                        scene.tokens.contents,
                        R.filter((token) => token.actorId === actor.id && token.actorLink),
                        R.map((token) => {
                            const updates = this.#getTokenUpdates(token, path, scale, isPF2e);
                            return { ...updates, _id: token.id };
                        }),
                    );

                    return scene.updateEmbeddedDocuments("Token", updates);
                }),
                R.flat(),
            );

            await Promise.all(updatePromises);
        }
    }

    #unlockButtons() {
        const buttons = this.element.querySelectorAll<HTMLButtonElement>(".menu button");

        for (const button of buttons) {
            if (button.dataset.action === "open-server") continue;
            button.disabled = false;
        }
    }

    #readImage(file: File) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const img = reader.result;
            if (R.isString(img)) {
                this.#unlockButtons();
                this.#application.setAvatar(img);
            }
        });

        reader.readAsDataURL(file);
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

        addListener(html, `input[name="local-file"]`, "change", (target: HTMLInputElement) => {
            const file = target.files?.[0];
            return file && this.#readImage(file);
        });

        html.addEventListener("drop", (event) => {
            const item = event.dataTransfer?.items[0];
            if (!item) return;

            if (item.kind === "string") {
                item.getAsString((path) => {
                    this.#unlockButtons();
                    this.#application.setAvatar(path);
                });
            } else if (item.kind === "file" && item.type.startsWith("image/")) {
                const file = item.getAsFile();
                return file && this.#readImage(file);
            }
        });
    }
}

type EventAction =
    | "download"
    | "load-avatar"
    | "open-local"
    | "open-server"
    | "ring-cycle"
    | "save-all"
    | "save-avatar"
    | "save-token";

type EditorContext = fa.ApplicationRenderContext & {
    canBrowse: boolean;
    popoutRange: number;
    warning: string | undefined;
};
