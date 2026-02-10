import { TokenEditor } from "editor";
import {
    CycleArray,
    dividePoints,
    drawCircleMask,
    drawRectangleMask,
    getSetting,
    MODULE,
    multiplyPointBy,
    R,
    subtractPoint,
} from "foundry-helpers";
import { Point } from "foundry-pf2e/foundry/common/_types.mjs";

const MASKS_COLORS = ["#ff0000", "#00ff00", "#0051ff"];

export class EditorApplication extends PIXI.Application<HTMLCanvasElement> {
    static BACKGROUNDS = ["background-plain", "background-marble"] as const;
    static RINGS = [...R.range(1, 5).map((x) => `token-${String(x).padStart(3, "0")}`), "token-dynamic"] as const;

    #avatar!: PIXI.Sprite;
    #backgrounds: CycleArray<string> = new CycleArray(...EditorApplication.BACKGROUNDS);
    #dragData: DragData = { avatar: { x: 0, y: 0 }, preview: { x: 0, y: 0 } };
    #editor!: PIXI.Container<PIXI.DisplayObject>;
    #editorBorder!: PIXI.Sprite;
    #editorMasks: Collection<string, PIXI.Graphics> = new Collection();
    #hitArea: PIXI.Rectangle;
    #isPopout: boolean = false;
    #masks: Collection<string, MaskData> = new Collection();
    #overImage!: PIXI.Sprite;
    #overMask!: PIXI.Graphics;
    #parent: TokenEditor;
    #preview!: PIXI.Container;
    #previewBackground!: PIXI.Sprite;
    #previewBorder!: PIXI.Sprite;
    #rings: CycleArray<string> = new CycleArray(...EditorApplication.RINGS);
    #underImage!: PIXI.Sprite;
    #underMask!: PIXI.Graphics;

    constructor(parent: TokenEditor) {
        super({
            backgroundAlpha: 0,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio,
        });

        this.#parent = parent;

        this.stage.eventMode = "static";
        this.stage.hitArea = this.#hitArea = new PIXI.Rectangle();

        for (let i = 0; i < 4; i++) {
            const id = foundry.utils.randomID();

            const maskDefault: MaskData["default"] = {
                angle: 0,
                range: i === 0 ? 1.5 : 0,
                width: i === 0 ? 1.5 : 0,
            };

            this.#masks.set(id, {
                ...maskDefault,
                id,
                color: MASKS_COLORS.at(i) ?? "#ffffff",
                default: maskDefault,
            });
        }

        const { background, ring } = getSetting<SavedCustomOptions>("custom");

        if (background) {
            this.#backgrounds.setFromValue(background);
        }

        if (ring) {
            this.#rings.setFromValue(ring);
        }
    }

    get masks(): Collection<string, MaskData> {
        return this.#masks;
    }

    get previewSize(): number {
        return 300;
    }

    get previewTokenSize(): number {
        return this.previewSize * (this.isPopoutToken || this.isDynamicToken ? 0.66 : 1);
    }

    get ring(): string {
        return this.#rings.current;
    }

    get background(): string {
        return this.#backgrounds.current;
    }

    get borderImage(): string {
        return MODULE.imagePath(this.#rings.current);
    }

    get backgroundImage(): string {
        return MODULE.imagePath(this.#backgrounds.current);
    }

    get dropImage(): string {
        return MODULE.imagePath("drop");
    }

    get isPopoutToken(): boolean {
        return this.#isPopout;
    }

    set isPopoutToken(value: boolean) {
        this.#isPopout = value;
        this.resetMasks();
    }

    get isDynamicToken(): boolean {
        return this.#rings.isLast;
    }

    setAvatar(image: string, skipPreview: boolean = false) {
        const size = this.previewSize;
        const texture = PIXI.Texture.from(image);

        this.#avatar.texture = texture;
        this.#avatar.position.set((this.screen.width - size) / 2);
        this.#avatar.scale.set(1);

        if (skipPreview) return;

        for (const sprite of [this.#overImage, this.#underImage]) {
            sprite.texture = texture;
            sprite.position.set(size / 2);
            sprite.scale.set(1);
        }

        this.#parent.unlockButtons();
    }

    resetMasks() {
        for (const data of this.masks) {
            data.angle = data.default.angle;
            data.range = data.default.range;
            data.width = data.default.width;
        }

        this.#parent.resetMasks();
        this.#setPreview();
        this.#setPreviewMask();
    }

    updateMask(id: string, type: MaskUpdateType, value: number) {
        const mask = this.masks.get(id);

        if (mask) {
            mask[type] = value;
            this.#setPreviewMask();
        }
    }

    setBackgroundColor(color: PIXI.ColorSource) {
        this.#previewBackground.tint = color;
    }

    setBorderColor(color: PIXI.ColorSource) {
        this.#previewBorder.tint = color;
    }

    setSelectedBackground(value: string) {
        this.#backgrounds.setFromValue(value);
        this.#previewBackground.texture = PIXI.Texture.from(this.backgroundImage);
    }

    setSelectedRing(value: string) {
        this.#rings.setFromValue(value);

        const texture = PIXI.Texture.from(this.borderImage);

        this.#editorBorder.texture = texture;
        this.#previewBorder.texture = texture;

        this.#setPreview();
        this.#setPreviewMask();
    }

    draw() {
        this.#createEditor();
        this.#createPreview();
        this.#setPreview();
        this.#setPreviewMask();

        this.setAvatar(this.dropImage, true);

        this.#hitArea.width = this.screen.width;
        this.#hitArea.height = this.screen.height;

        this.stage.on("pointerdown", this.#onDragLeftStart, this);
        this.stage.on("wheel", this.#onMouseWheel, this);
    }

    getAvatarBase64(): Promise<string> {
        return this.renderer.extract.base64(this.#avatar, "image/webp");
    }

    async getTokenBase64(): Promise<string> {
        this.#preview.scale.set(2);

        return new Promise((resolve) => {
            setTimeout(() => {
                const size = this.previewSize * 2;
                const rect = new PIXI.Rectangle(this.#preview.x, this.#preview.y, size, size);
                const base64 = this.renderer.extract.base64(this.#preview, "image/webp", 1, rect);

                resolve(base64);
                this.#preview.scale.set(1);
            }, 200);
        });
    }

    #onMouseWheel(event: PIXI.FederatedWheelEvent) {
        const avatar = this.#avatar;
        const delta = event.deltaY >= 0 ? -1 : 1;

        const current = avatar.scale.x;
        const change = current > 5 ? 0.5 : current > 2 ? 0.2 : current > 1 ? 0.05 : 0.02;
        const value = Math.max(current + delta * change, 0.1);
        const global = this.renderer.events.pointer.global;
        const local = avatar.toLocal(global);
        const newLocal = multiplyPointBy(dividePoints(local, avatar.scale), value);
        const newGlobal = avatar.toGlobal(newLocal);
        const offset = subtractPoint(newGlobal, global);

        avatar.x -= offset.x;
        avatar.y -= offset.y;
        avatar.scale.set(value);

        for (const sprite of [this.#overImage, this.#underImage]) {
            sprite.x -= offset.x;
            sprite.y -= offset.y;
            sprite.scale.set(value);
        }
    }

    #onDragLeftStart(event: PIXI.FederatedPointerEvent) {
        const editorCursor = event.getLocalPosition(this.#editor);
        const previewCursor = event.getLocalPosition(this.#preview);

        this.#dragData = {
            avatar: subtractPoint(editorCursor, this.#avatar),
            preview: subtractPoint(previewCursor, this.#overImage),
        };

        this.stage.on("pointermove", this.#onDragLeftMove, this);
        this.stage.on("pointerup", this.#onDragLeftEnd, this);
        this.stage.on("pointerupoutside", this.#terminateDrag, this);
    }

    #onDragLeftMove(event: PIXI.FederatedPointerEvent) {
        const editorCursor = event.getLocalPosition(this.#editor);
        const previewCursor = event.getLocalPosition(this.#preview);
        const avatar = subtractPoint(editorCursor, this.#dragData.avatar);
        const preview = subtractPoint(previewCursor, this.#dragData.preview);

        this.#avatar.position.set(avatar.x, avatar.y);
        this.#overImage.position.set(preview.x, preview.y);
        this.#underImage.position.set(preview.x, preview.y);
    }

    #onDragLeftEnd(_event: PIXI.FederatedPointerEvent) {
        this.#terminateDrag();
    }

    #terminateDrag() {
        this.stage.off("pointermove", this.#onDragLeftMove);
        this.stage.off("pointerup", this.#onDragLeftEnd);
        this.stage.off("pointerupoutside", this.#terminateDrag);
    }

    #setPreview() {
        const size = this.previewTokenSize;
        const alpha = this.isDynamicToken ? 0 : 1;

        this.#editorBorder.width = size;
        this.#editorBorder.height = size;

        for (const sprite of [this.#previewBackground, this.#previewBorder]) {
            sprite.alpha = alpha;
            sprite.width = size;
            sprite.height = size;
        }
    }

    #setPreviewMask() {
        for (const mask of [this.#underMask, this.#overMask]) {
            if (!mask) continue;
            this.#preview.removeChild(mask);
            mask.destroy();
        }

        const size = this.previewSize;
        const tokenSize = this.previewTokenSize;
        const halfSize = size / 2;
        const tokenHalfSize = tokenSize / 2;

        this.#underMask = drawCircleMask(halfSize, halfSize, tokenHalfSize);
        this.#overMask = new PIXI.Graphics();

        if (this.isPopoutToken) {
            this.#overMask.x = halfSize;
            this.#overMask.y = halfSize;

            for (const { id, color, angle, range, width } of this.masks) {
                const editorMask = this.#editorMasks.get(id) as PIXI.Graphics;

                if (range <= 0 || width <= 0) {
                    editorMask.alpha = 0;
                    continue;
                }

                const top = halfSize - halfSize * range;
                const side = halfSize * width;
                const mask = drawRectangleMask(halfSize - side, top, side * 2, halfSize - top);

                mask.pivot.set(halfSize);
                mask.angle = angle;

                editorMask.clear();
                editorMask.lineStyle(1, color);
                editorMask.drawRect(0, 0, side * 2, halfSize - top);
                editorMask.pivot.set(editorMask.width / 2, editorMask.height);

                editorMask.alpha = 0.5;
                editorMask.angle = angle;

                this.#overMask.addChild(mask);
            }
        }

        this.#underImage.mask = this.#underMask;
        this.#overImage.mask = this.#overMask;

        this.#preview.addChild(this.#underMask, this.#overMask);
    }

    #createEditor() {
        const { height, width } = this.screen;
        const size = this.previewSize;
        const center = (width - size) / 2;

        const editor = (this.#editor = new PIXI.Container());

        const avatar = (this.#avatar = new PIXI.Sprite());

        const border = (this.#editorBorder = new PIXI.Sprite());
        border.alpha = 0.4;
        border.texture = PIXI.Texture.from(this.borderImage);

        for (const sprite of [avatar, border]) {
            sprite.anchor.set(0.5);
            sprite.position.set(center);

            editor.addChild(sprite);
        }

        const mask = drawRectangleMask(0, 0, width - size, height);

        editor.mask = mask;
        editor.addChild(mask);

        for (const { id } of this.masks) {
            const editorMask = new PIXI.Graphics();

            editorMask.alpha = 0;
            editorMask.position.set(center);

            this.#editorMasks.set(id, editorMask);
            editor.addChild(editorMask);
        }

        this.stage.addChild(editor);
    }

    #createPreview() {
        const screen = this.screen;
        const size = this.previewSize;

        const preview = (this.#preview = new PIXI.Container());
        preview.width = size;
        preview.height = size;
        preview.position.set(screen.width - size, screen.height - size);

        const previewMask = drawRectangleMask(0, 0, size, size);
        preview.mask = previewMask;
        preview.addChild(previewMask);

        const background = (this.#previewBackground = new PIXI.Sprite());
        background.texture = PIXI.Texture.from(this.backgroundImage);

        const overImage = (this.#overImage = new PIXI.Sprite());
        const underImage = (this.#underImage = new PIXI.Sprite());

        const border = (this.#previewBorder = new PIXI.Sprite());
        border.texture = PIXI.Texture.from(this.borderImage);

        for (const sprite of [background, underImage, border, overImage]) {
            sprite.anchor.set(0.5);
            sprite.position.set(size / 2, size / 2);

            preview.addChild(sprite);
        }

        preview.sortableChildren = true;

        this.stage.addChild(preview);
    }
}

type DragData = {
    avatar: Point;
    preview: Point;
};

export type MaskData = {
    id: string;
    color: PIXI.ColorSource;
    angle: number;
    range: number;
    width: number;
    default: Omit<MaskData, "id" | "color" | "default">;
};

export type MaskUpdateType = keyof MaskData["default"];

export type PopoutType = "both" | "bottom" | "disabled" | "top";

export type SavedCustomOptions = {
    background?: string;
    ring?: string;
};
