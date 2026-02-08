import { TokenEditor } from "editor";
import {
    CycleArray,
    dividePoints,
    drawCircleMask,
    drawRectangleMask,
    getSetting,
    MODULE,
    multiplyPointBy,
    subtractPoint,
} from "foundry-helpers";
import { Point } from "foundry-pf2e/foundry/common/_types.mjs";

export class EditorApplication extends PIXI.Application<HTMLCanvasElement> {
    static BACKGROUNDS = ["background-plain", "background-marble", "background-noise"] as const;
    static RINGS = ["token-001", "token-002", "token-003", "token-dynamic"] as const;

    #avatar!: PIXI.Sprite;
    #backgrounds: CycleArray<string> = new CycleArray(...EditorApplication.BACKGROUNDS);
    #dragData: DragData = { avatar: { x: 0, y: 0 }, preview: { x: 0, y: 0 } };
    #editor!: PIXI.Container<PIXI.DisplayObject>;
    #editorBorder!: PIXI.Sprite;
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

            this.#masks.set(id, { id, ...maskDefault, default: maskDefault });
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

    get previewTokenRation(): number {
        return 0.85;
    }

    get previewDynamicRatio(): number {
        return 0.66;
    }

    get previewTokenSize(): number {
        return this.previewSize * this.previewTokenRation;
    }

    get previewScaledTokenSize(): number {
        return this.previewTokenSize * (this.isDynamicToken ? this.previewDynamicRatio / this.previewTokenRation : 1);
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
        for (const mask of this.masks) {
            mask.angle = mask.default.angle;
            mask.range = mask.default.range;
            mask.width = mask.default.width;
        }

        this.#parent.resetMasks();
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

    async getTokenBase64(): Promise<{ base64: string; isDynamic: boolean; scale: number }> {
        const isDynamic = this.isDynamicToken;
        const rect = this.#getTokenRect();

        return {
            base64: await this.renderer.extract.base64(this.#preview, "image/webp", undefined, rect),
            isDynamic,
            scale: isDynamic ? 1 : this.isPopoutToken ? 1.2 : 1, // magic number, we know the border/preview ratio
        };
    }

    #getTokenRect() {
        if (this.isPopoutToken || this.isDynamicToken) {
            return new PIXI.Rectangle(this.#preview.x, this.#preview.y, this.previewSize, this.previewSize);
        }

        const { x, y } = this.#previewBorder.getGlobalPosition();
        const { width, height } = this.#previewBorder;
        return new PIXI.Rectangle(x - width / 2, y - height / 2, this.previewTokenSize, this.previewTokenSize);
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
        const alpha = this.isDynamicToken ? 0 : 1;
        this.#previewBackground.alpha = alpha;
        this.#previewBorder.alpha = alpha;

        const scale = this.isDynamicToken ? 0.66 / 0.85 : 1;
        this.#editorBorder.scale.set(scale);
        this.#previewBorder.scale.set(scale);
    }

    #setPreviewMask() {
        for (const mask of [this.#underMask, this.#overMask]) {
            if (!mask) continue;
            this.#preview.removeChild(mask);
            mask.destroy();
        }

        const size = this.previewSize;
        const tokenSize = this.previewScaledTokenSize;
        const halfSize = size / 2;
        const tokenHalfSize = tokenSize / 2;

        this.#underMask = drawCircleMask(halfSize, halfSize, tokenHalfSize);
        this.#overMask = new PIXI.Graphics();

        if (this.isPopoutToken) {
            this.#overMask.x = halfSize;
            this.#overMask.y = halfSize;

            for (const { angle, range, width } of this.masks) {
                if (range <= 0 || width <= 0) continue;

                const top = halfSize - halfSize * range;
                const side = halfSize * width;
                const mask = drawRectangleMask(halfSize - side, top, side * 2, halfSize - top);

                mask.pivot.set(halfSize);
                mask.angle = angle;

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

        const editor = (this.#editor = new PIXI.Container());

        const avatar = (this.#avatar = new PIXI.Sprite());

        const border = (this.#editorBorder = new PIXI.Sprite());
        border.alpha = 0.4;
        border.texture = PIXI.Texture.from(this.borderImage);

        for (const sprite of [avatar, border]) {
            sprite.anchor.set(0.5);
            sprite.position.set((width - size) / 2);

            editor.addChild(sprite);
        }

        const mask = drawRectangleMask(0, 0, width - size, height);

        editor.mask = mask;
        editor.addChild(mask);

        this.stage.addChild(editor);
    }

    #createPreview() {
        const screen = this.screen;
        const size = this.previewSize;
        const tokenSize = this.previewTokenSize;

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

        const borderMask = drawCircleMask(0, 0, tokenSize / 2);
        border.mask = borderMask;
        border.addChild(borderMask);

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
    angle: number;
    range: number;
    width: number;
    default: Omit<MaskData, "id" | "default">;
};

export type MaskUpdateType = Exclude<keyof MaskData, "id" | "default">;

export type PopoutType = "both" | "bottom" | "disabled" | "top";

export type SavedCustomOptions = {
    background?: string;
    ring?: string;
};
