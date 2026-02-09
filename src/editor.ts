import { EditorApplication, MaskData, MaskUpdateType, SavedCustomOptions } from "application";
import { DirectorySource, getFilePath, PathCategory } from "directories";
import {
    addListener,
    addListenerAll,
    getSetting,
    htmlClosest,
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
    #application: EditorApplication = new EditorApplication(this);
    #isPF2e: boolean;

    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration> = {
        classes: ["themed", "theme-dark"],
    };

    constructor(actor: Actor, options: DeepPartial<fa.ApplicationConfiguration> = {}) {
        options.id = TokenEditor.idFromActor(actor);

        super(options);

        this.#actor = actor;
        this.#isPF2e = R.isIncludedIn(game.system.id, ["pf2e", "sf2e"]);
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

    get application(): EditorApplication {
        return this.#application;
    }

    get previewSize(): number {
        return this.application.previewSize;
    }

    unlockButtons() {
        const buttons = this.element.querySelectorAll<HTMLButtonElement>(".menu button");

        for (const button of buttons) {
            if (button.dataset.action === "open-server") continue;
            button.disabled = false;
        }
    }

    resetMasks() {
        const masks = this.element.querySelectorAll<HTMLInputElement>(`input[name=update-mask]`);

        for (const input of masks) {
            const update = input.dataset.update as MaskUpdateType;
            const id = htmlClosest(input, "[data-id]")?.dataset.id as string;
            input.valueAsNumber = this.application.masks.get(id)?.[update] ?? 0;
        }
    }

    protected async _onClose(_options: fa.ApplicationClosingOptions) {
        await setSetting<SavedCustomOptions>("custom", {
            background: this.application.background,
            ring: this.application.ring,
        });
    }

    protected async _prepareContext(_options: fa.ApplicationRenderOptions): Promise<EditorContext> {
        const rings: EditorContext["rings"] = R.map(EditorApplication.RINGS, (name) => {
            const label =
                name === "token-dynamic"
                    ? localize("editor.ring.dynamic")
                    : localize("editor.ring.label", { number: name.split("-")[1] });
            return { value: name, label };
        });

        const backgrounds: EditorContext["backgrounds"] = R.map(EditorApplication.BACKGROUNDS, (name) => {
            const label = localize("editor.background", name);
            return { value: name, label };
        });

        return {
            background: this.application.background,
            backgrounds,
            canBrowse: game.user.can("FILES_BROWSE"),
            masks: this.application.masks,
            ring: this.application.ring,
            rings,
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
            const canvasWrapper = this.element.querySelector<HTMLElement>(".window-content .canvas");
            if (!canvasWrapper) return;

            canvasWrapper.append(this.application.view);
            this.application.resizeTo = canvasWrapper;
            this.application.draw();
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
                const base64 = await this.application.getTokenBase64();
                const blob = await fetch(base64).then((result) => result.blob());

                const link = document.createElement("a");
                link.download = this.#getFileName("token");
                link.href = window.URL.createObjectURL(blob);
                link.click();

                return;
            }

            case "load-avatar": {
                return this.application.setAvatar(this.actor.img);
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
                this.application.setAvatar(path);
            },
            type: "image",
        });

        return picker.browse();
    }

    #getFileName(category: PathCategory): string {
        const baseName = this.actor.token?.name ?? this.actor.name;
        const name = baseName.slugify({ strict: true }) || "baseName";
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
        const base64 = await this.application.getAvatarBase64();
        const path = await this.#saveImage("avatar", base64, source);
        if (!path) return;

        await this.actor.update({ img: path });
    }

    #getTokenUpdates(token: TokenDocument | foundry.data.PrototypeToken<Actor>, path: string) {
        const isDynamic = this.application.isDynamicToken;
        const baseScale = isDynamic ? 1 : this.application.isPopoutToken ? 1.5 : 1;

        let scaleX = token.texture.scaleX < 0 ? baseScale * -1 : baseScale;
        let scaleY = token.texture.scaleY < 0 ? baseScale * -1 : baseScale;

        if (this.#isPF2e && (token.actor as ActorPF2e).size === "sm") {
            scaleX *= 0.8;
            scaleY *= 0.8;
        }

        let updates: Record<string, any> = {
            "texture.scaleX": scaleX,
            "texture.scaleY": scaleY,
            "ring.enabled": isDynamic,
        };

        if (isDynamic) {
            updates["ring.enabled"] = true;
            updates["ring.subject.texture"] = path;
        } else {
            updates["texture.src"] = path;
        }

        if (token instanceof foundry.data.PrototypeToken) {
            updates = R.mapKeys(updates, (key) => `prototypeToken.${key}`);
        }

        if (this.#isPF2e) {
            updates[`flags.${game.system.id}.autoscale`] = isDynamic || !this.application.isPopoutToken;
        }

        return updates;
    }

    async #saveToken(source?: DirectorySource) {
        const base64 = await this.application.getTokenBase64();
        const path = await this.#saveImage("token", base64, source);
        if (!path) return;

        const actor = this.actor;

        if (actor.token) {
            const updates = this.#getTokenUpdates(actor.token, path);
            await actor.token.update(updates);
        } else {
            const actorUpdates = this.#getTokenUpdates(actor.prototypeToken, path);
            await actor.update(actorUpdates);

            const updatePromises = R.pipe(
                game.scenes.contents,
                R.map((scene) => {
                    const updates = R.pipe(
                        scene.tokens.contents,
                        R.filter((token) => token.actorId === actor.id && token.actorLink),
                        R.map((token) => {
                            const updates = this.#getTokenUpdates(token, path);
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

    #readImage(file: File) {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const img = reader.result;
            if (R.isString(img)) {
                this.application.setAvatar(img);
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
                    this.application.setBackgroundColor(target.value);
                } else if (target.name === "border") {
                    this.application.setBorderColor(target.value);
                }
            }, 50),
        );

        addListenerAll(html, `input[name="update-mask"]`, "input", (target: HTMLInputElement) => {
            const update = target.dataset.update as "angle" | "range" | "width";
            const id = htmlClosest(target, `[data-id]`)?.dataset.id as string;
            const value = target.valueAsNumber;

            this.application.updateMask(id, update, value);
        });

        addListener(html, `input[name="local-file"]`, "change", (target: HTMLInputElement) => {
            const file = target.files?.[0];
            return file && this.#readImage(file);
        });

        addListener(html, `input[name="toggle-popout"]`, "change", (target: HTMLInputElement) => {
            const enabled = target.checked;
            this.application.isPopoutToken = enabled;
            this.element.classList.toggle("use-popout", enabled);
        });

        addListener(html, `select[name="select-background"]`, "change", (target: HTMLSelectElement) => {
            const value = target.value;
            this.application.setSelectedBackground(value);
        });

        addListener(html, `select[name="select-ring"]`, "change", (target: HTMLSelectElement) => {
            const value = target.value;
            this.application.setSelectedRing(value);
        });

        html.addEventListener("drop", (event) => {
            const item = event.dataTransfer?.items[0];
            if (!item) return;

            if (item.kind === "string") {
                item.getAsString((path) => {
                    this.application.setAvatar(path);
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
    | "save-all"
    | "save-avatar"
    | "save-token";

type EditorContext = fa.ApplicationRenderContext & {
    background: string;
    backgrounds: { value: string; label: string }[];
    canBrowse: boolean;
    masks: Collection<string, MaskData>;
    ring: string;
    rings: { value: string; label: string }[];
    warning: string | undefined;
};
