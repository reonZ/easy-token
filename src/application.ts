import {
    addPoints,
    CycleArray,
    dividePoints,
    drawCircleMask,
    drawPolygonMask,
    drawRectangleMask,
    getSetting,
    MODULE,
    multiplyPointBy,
    R,
    subtractPoint,
} from "foundry-helpers";
import { Point } from "foundry-pf2e/foundry/common/_types.mjs";

const RINGS = ["token-001", "token-002", "token-003"] as const;

export class EditorApplication extends PIXI.Application<HTMLCanvasElement> {
    #avatar!: PIXI.Sprite;
    #background!: PIXI.Sprite;
    #bottom!: PIXI.Sprite;
    #bottomMask!: PIXI.Graphics;
    #editor!: PIXI.Container<PIXI.DisplayObject>;
    #editorBorder!: PIXI.Sprite;
    #hitArea: PIXI.Rectangle;
    #dragData: DragData = {
        avatar: { offset: { x: 0, y: 0 } },
        preview: { offset: { x: 0, y: 0 }, origin: { x: 0, y: 0 } },
    };
    #popout: { value: PopoutType; range: number } = { value: "disabled", range: this.defaultPopoutRange / 100 };
    #preview!: PIXI.Container;
    #previewBorder!: PIXI.Sprite;
    #rings: CycleArray<string> = new CycleArray(...RINGS);
    #top!: PIXI.Sprite;
    #topMask!: PIXI.Graphics;

    constructor() {
        super({
            backgroundAlpha: 0,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio,
        });

        this.stage.eventMode = "static";
        this.stage.hitArea = this.#hitArea = new PIXI.Rectangle();

        const ring = getSetting<string>("ring");
        this.#rings.setFromValue(ring);
    }

    get previewSize(): number {
        return 300;
    }

    get previewTokenSize(): number {
        return this.previewSize * 0.85;
    }

    get previewBorderIndex(): number {
        return 10;
    }

    get ring(): string {
        return this.#rings.current;
    }

    get borderImage(): string {
        return MODULE.imagePath(this.#rings.current);
    }

    get backgroundImage(): string {
        return MODULE.imagePath("background");
    }

    get defaultPopoutRange(): number {
        return 66;
    }

    get dropImage(): string {
        return MODULE.imagePath("drop");
    }

    setAvatar(image: string, skipPreview: boolean = false) {
        const size = this.previewSize;
        const texture = PIXI.Texture.from(image);

        this.#avatar.texture = texture;
        this.#avatar.position.set((this.screen.width - size) / 2);
        this.#avatar.scale.set(1);

        if (skipPreview) return;

        for (const sprite of [this.#top, this.#bottom]) {
            sprite.texture = texture;
            sprite.position.set(size / 2);
            sprite.scale.set(1);
        }

        this.#setPreviewMask();

        this.#bottomMask.position.set(0);
        this.#topMask.position.set(0);
    }

    setPopout(popout: PopoutType) {
        this.#popout.value = popout;

        this.#top.zIndex = R.isIncludedIn(popout, ["both", "top"]) ? this.previewBorderIndex * 2 : 0;
        this.#bottom.zIndex = R.isIncludedIn(popout, ["both", "bottom"]) ? this.previewBorderIndex * 2 : 0;

        this.#setPreviewMask();
    }

    setPopoutRange(range: number) {
        this.#popout.range = range / 100;
        this.#setPreviewMask();
    }

    setBackgroundColor(color: PIXI.ColorSource) {
        this.#background.tint = color;
    }

    setBorderColor(color: PIXI.ColorSource) {
        this.#previewBorder.tint = color;
    }

    cycleBorder(direction: number | boolean) {
        this.#rings.cycle(direction);

        const texture = PIXI.Texture.from(this.borderImage);

        this.#editorBorder.texture = texture;
        this.#previewBorder.texture = texture;
    }

    draw() {
        this.#createEditor();
        this.#createPreview();

        this.setAvatar(this.dropImage, true);

        this.#hitArea.width = this.screen.width;
        this.#hitArea.height = this.screen.height;

        this.stage.on("pointerdown", this.#onDragLeftStart, this);
        this.stage.on("wheel", this.#onMouseWheel, this);
    }

    getAvatarBase64(): Promise<string> {
        return this.renderer.extract.base64(this.#avatar, "image/webp");
    }

    async getTokenBase64(): Promise<{ base64: string; scale: number }> {
        const isPopout = this.#popout.value !== "disabled";
        const rect = isPopout
            ? new PIXI.Rectangle(this.#preview.x, this.#preview.y, this.previewSize, this.previewSize)
            : undefined;

        return {
            base64: await this.renderer.extract.base64(this.#preview, "image/webp", undefined, rect),
            scale: isPopout ? 1.2 : 1, // magic number, we know the border/preview ratio
        };
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

        for (const sprite of [this.#top, this.#bottom]) {
            sprite.x -= offset.x;
            sprite.y -= offset.y;
            sprite.scale.set(value);
        }
    }

    #onDragLeftStart(event: PIXI.FederatedPointerEvent) {
        const editorCursor = event.getLocalPosition(this.#editor);
        const previewCursor = event.getLocalPosition(this.#preview);

        this.#dragData = {
            avatar: {
                offset: subtractPoint(editorCursor, this.#avatar),
            },
            preview: {
                offset: subtractPoint(previewCursor, this.#top),
                origin: addPoints(this.#top.position, this.#topMask.position),
            },
        };

        this.stage.on("pointermove", this.#onDragLeftMove, this);
        this.stage.on("pointerup", this.#onDragLeftEnd, this);
        this.stage.on("pointerupoutside", this.#terminateDrag, this);
    }

    #onDragLeftMove(event: PIXI.FederatedPointerEvent) {
        const editorCursor = event.getLocalPosition(this.#editor);
        const previewCursor = event.getLocalPosition(this.#preview);
        const avatar = subtractPoint(editorCursor, this.#dragData.avatar.offset);
        const preview = subtractPoint(previewCursor, this.#dragData.preview.offset);

        this.#avatar.position.set(avatar.x, avatar.y);
        this.#top.position.set(preview.x, preview.y);
        this.#bottom.position.set(preview.x, preview.y);
    }

    #onDragLeftEnd(_event: PIXI.FederatedPointerEvent) {
        this.#terminateDrag();
    }

    #terminateDrag() {
        this.stage.off("pointermove", this.#onDragLeftMove);
        this.stage.off("pointerup", this.#onDragLeftEnd);
        this.stage.off("pointerupoutside", this.#terminateDrag);
    }

    #setPreviewMask() {
        for (const mask of [this.#topMask, this.#bottomMask]) {
            this.#preview.removeChild(mask);
            mask?.destroy();
        }

        const size = this.previewSize;
        const tokenSize = this.previewTokenSize;
        const halfSize = size / 2;
        const tokenHalfSize = tokenSize / 2;

        if (this.#popout.value === "disabled") {
            this.#topMask = drawCircleMask(halfSize, halfSize, tokenHalfSize);
            this.#bottomMask = drawRectangleMask(0, 0, 0, 0);
        } else if (this.#popout.value === "top") {
            const limit = size * this.#popout.range;
            this.#topMask = drawRectangleMask(0, 0, size, limit);
            this.#bottomMask = drawCircleMask(halfSize, halfSize, tokenHalfSize);

            const mask = drawRectangleMask(0, limit, size, size - limit);
            this.#bottomMask.mask = mask;
            this.#bottomMask.addChild(mask);
        } else if (this.#popout.value === "bottom") {
            const top = size * (1 - this.#popout.range);
            this.#topMask = drawCircleMask(halfSize, halfSize, tokenHalfSize);
            this.#bottomMask = drawRectangleMask(0, top, size, size - top);

            const mask = drawRectangleMask(0, 0, size, top);
            this.#topMask.mask = mask;
            this.#topMask.addChild(mask);
        } else {
            this.#topMask = drawRectangleMask(0, 0, size, size);
            this.#bottomMask = drawRectangleMask(0, 0, 0, 0);
        }

        this.#top.mask = this.#topMask;
        this.#bottom.mask = this.#bottomMask;

        this.#preview.addChild(this.#topMask, this.#bottomMask);
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

        const mask = drawPolygonMask(
            [0, 0],
            [width, 0],
            [width, height - size],
            [width - size, height - size],
            [width - size, height],
            [0, height],
        );

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

        const background = (this.#background = new PIXI.Sprite());
        background.texture = PIXI.Texture.from(this.backgroundImage);

        const backgroundNoise = new PIXI.NoiseFilter(0.05, 0.2);
        background.filters = [backgroundNoise];

        const top = (this.#top = new PIXI.Sprite());
        const bottom = (this.#bottom = new PIXI.Sprite());

        const border = (this.#previewBorder = new PIXI.Sprite());
        border.zIndex = this.previewBorderIndex;
        border.texture = PIXI.Texture.from(this.borderImage);

        const borderMask = drawCircleMask(0, 0, tokenSize / 2);
        border.mask = borderMask;
        border.addChild(borderMask);

        for (const sprite of [background, bottom, top, border]) {
            sprite.anchor.set(0.5);
            sprite.position.set(size / 2, size / 2);

            preview.addChild(sprite);
        }

        for (const sprite of [background, border]) {
            sprite.width = tokenSize;
            sprite.height = tokenSize;
        }

        preview.sortableChildren = true;

        this.stage.addChild(preview);
    }
}

type DragData = {
    avatar: {
        offset: Point;
    };
    preview: {
        offset: Point;
        origin: Point;
    };
};

export type PopoutType = "both" | "bottom" | "disabled" | "top";
