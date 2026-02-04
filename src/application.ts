import {
    addPoints,
    drawCircleMask,
    drawPolygonMask,
    drawRectangleMask,
    MODULE,
    R,
    subtractPoint,
} from "foundry-helpers";
import { Point } from "foundry-pf2e/foundry/common/_types.mjs";

export class EditorApplication extends PIXI.Application<HTMLCanvasElement> {
    #avatar!: PIXI.Sprite;
    #background!: PIXI.Sprite;
    #border!: PIXI.Sprite;
    #bottom!: PIXI.Sprite;
    #bottomMask?: PIXI.Graphics;
    #editor!: PIXI.Container<PIXI.DisplayObject>;
    #hitArea: PIXI.Rectangle;
    #dragData: DragData = {
        avatar: { offset: { x: 0, y: 0 } },
        preview: { offset: { x: 0, y: 0 }, origin: { x: 0, y: 0 } },
    };
    #popout: { value: PopoutType; range: number } = { value: "disabled", range: this.defaultPopoutRange / 100 };
    #preview!: PIXI.Container;
    #top!: PIXI.Sprite;
    #topMask?: PIXI.Graphics;

    constructor() {
        super({
            backgroundAlpha: 0,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio,
        });

        this.stage.eventMode = "static";
        this.stage.hitArea = this.#hitArea = new PIXI.Rectangle();
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

    get borderImage(): string {
        return MODULE.relativePath("images", "token-001.webp");
    }

    get backgroundImage(): string {
        return MODULE.relativePath("images", "background.webp");
    }

    get defaultPopoutRange(): number {
        return 66;
    }

    setAvatar(image: string) {
        const size = this.previewSize;
        const texture = PIXI.Texture.from(image);

        for (const sprite of [this.#top, this.#bottom]) {
            sprite.texture = texture;
            sprite.position.set(size / 2);
            sprite.scale.set(1);
        }

        this.#bottomMask?.position.set(0);
        this.#topMask?.position.set(0);

        this.#avatar.texture = texture;
        this.#avatar.position.set((this.screen.width - size) / 2);
        this.#avatar.scale.set(1);

        this.#setPreviewMask();
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
        this.#border.tint = color;
    }

    draw() {
        this.#createEditor();
        this.#createPreview();

        this.#hitArea.width = this.screen.width;
        this.#hitArea.height = this.screen.height;

        this.stage.on("pointerdown", this.#onDragLeftStart, this);
    }

    async getTokenBase64(): Promise<string> {
        const rect =
            this.#popout.value === "disabled"
                ? undefined
                : new PIXI.Rectangle(this.#preview.x, this.#preview.y, this.previewSize, this.previewSize);

        return await this.renderer.extract.base64(this.#preview, "image/webp", undefined, rect);
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
                origin: addPoints(this.#top.position, this.#topMask?.position ?? { x: 0, y: 0 }),
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

        const inverseOffset = subtractPoint(this.#dragData.preview.origin, preview);
        this.#bottomMask?.position.set(inverseOffset.x, inverseOffset.y);
        this.#topMask?.position.set(inverseOffset.x, inverseOffset.y);
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
        const topOffset = this.#topMask?.position;
        const bottomOffset = this.#bottomMask?.position;

        if (this.#topMask) {
            this.#top.removeChild(this.#topMask);
            this.#topMask.destroy();
        }

        if (this.#bottomMask) {
            this.#bottom.removeChild(this.#bottomMask);
            this.#bottomMask.destroy();
        }

        const size = this.previewSize;
        const tokenSize = this.previewTokenSize;
        const halfSize = size / 2;
        const tokenHalfSize = tokenSize / 2;

        if (this.#popout.value === "disabled") {
            this.#topMask = drawCircleMask(0, 0, tokenHalfSize);
            this.#bottomMask = drawCircleMask(0, 0, tokenHalfSize);
        } else if (this.#popout.value === "top") {
            this.#topMask = drawRectangleMask(-halfSize, -halfSize, size, size * this.#popout.range);
            this.#bottomMask = drawCircleMask(0, 0, tokenHalfSize);
        } else if (this.#popout.value === "bottom") {
            const offset = size * ((1 - this.#popout.range) / 2);
            this.#topMask = drawCircleMask(0, 0, tokenHalfSize);
            this.#bottomMask = drawRectangleMask(-halfSize, -offset, size, halfSize + offset);
        } else {
            this.#topMask = drawRectangleMask(-halfSize, -halfSize, size, halfSize);
            this.#bottomMask = drawRectangleMask(-halfSize, 0, size, halfSize);
        }

        this.#top.mask = this.#topMask;
        this.#top.addChild(this.#topMask);

        this.#bottom.mask = this.#bottomMask;
        this.#bottom.addChild(this.#bottomMask);

        if (topOffset) {
            this.#topMask.position.set(topOffset.x, topOffset.y);
        }

        if (bottomOffset) {
            this.#bottomMask.position.set(bottomOffset.x, bottomOffset.y);
        }
    }

    #createEditor() {
        const { height, width } = this.screen;
        const size = this.previewSize;

        const editor = (this.#editor = new PIXI.Container());

        const avatar = (this.#avatar = new PIXI.Sprite());

        const border = new PIXI.Sprite();
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

        const backgroundNoise = new PIXI.NoiseFilter(0.1, 0.2);
        background.filters = [backgroundNoise];

        const top = (this.#top = new PIXI.Sprite());
        const bottom = (this.#bottom = new PIXI.Sprite());

        const border = (this.#border = new PIXI.Sprite());
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
