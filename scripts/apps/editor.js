import { getFileNameFromActor, cacheBusterImg, getUploadPath } from '../utils.js'
import { getActorTokens, getBucket, getSetting, subLocalize, templatePath, useForgeVTT } from '../utils/foundry.js'
import { divide, multiply, substract, textureFromFileName } from '../utils/pixi.js'
import { throttle } from '../utils/throttle.js'

const notification = subLocalize('notifications.editor')

export class Editor extends Application {
    /** @param {ActorSheet} sheet */
    constructor(sheet) {
        super({ id: Editor.idFromSheet(sheet) })

        this._sheet = sheet

        this._borderColorThrottle = throttle(this.#onBorderColorChange.bind(this), 50)
        this._backgroundColorThrottle = throttle(this.#onBackgroundColorChange.bind(this), 50)
    }

    /** @returns {ApplicationOptions} */
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            title: 'Easy-Token Editor',
            popOut: true,
            template: templatePath('editor.html'),
            dragDrop: [{ dropSelector: '.canvas' }],
        }
    }

    /** @param {ActorSheet} sheet */
    static idFromSheet(sheet) {
        return `easy-token-editor-${sheet.actor.id}`
    }

    get previewSize() {
        return 300
    }

    get tokenSize() {
        return 256
    }

    get defaultTokenFile() {
        return 'token_001.webp'
    }

    get renderer() {
        return /** @type {PIXI.Application} */ (this._pixi).renderer
    }

    get stage() {
        return /** @type {PIXI.Application} */ (this._pixi).stage
    }

    get screen() {
        return /** @type {PIXI.Application} */ (this._pixi).screen
    }

    get actor() {
        return this._sheet.actor
    }

    get previewToken() {
        return /** @type {PIXI.Container} */ (this._previewToken)
    }

    get editorBorder() {
        return /** @type {PIXI.Sprite} */ (this._editorBorder)
    }

    get previewBorder() {
        return /** @type {PIXI.Sprite} */ (this._previewBorder)
    }

    get previewBackground() {
        return /** @type {PIXI.Sprite} */ (this._previewBackground)
    }

    get editorImage() {
        return /** @type {PIXI.Sprite} */ (this._editorImage)
    }

    get previewImage() {
        return /** @type {PIXI.Sprite} */ (this._previewImage)
    }

    get imageTexture() {
        return /** @type {PIXI.Texture} */ (this._imageTexture)
    }

    get zoom() {
        return this.editorImage.scale.x
    }

    set zoom(value) {
        const editorImage = this.editorImage
        if (!editorImage.interactive) return

        const global = this.renderer.plugins.interaction.pointer.global
        const local = editorImage.toLocal(global)
        const newLocal = multiply(divide(local, editorImage.scale), value)
        const newGlobal = editorImage.toGlobal(newLocal)
        const offset = substract(newGlobal, global)

        editorImage.x -= offset.x
        editorImage.y -= offset.y

        this.previewImage.x -= offset.x
        this.previewImage.y -= offset.y

        editorImage.scale.set(value)
        this.previewImage.scale.set(value)
    }

    /** @param {string} value */
    set userImage(value) {
        this.zoom = 1

        this._imageTexture = PIXI.Texture.from(value)
        this.editorImage.texture = this._imageTexture
        this.previewImage.texture = this._imageTexture

        this.editorImage.position.set(0)
        this.previewImage.position.set(0)

        this.editorImage.interactive = true
        // this.editorImage.alpha = 1

        this.element.find('button').prop('disabled', false)
    }

    /** @param {string} value */
    set borderImage(value) {
        const texture = textureFromFileName(value)
        this.editorBorder.texture = texture
        this.previewBorder.texture = texture
    }

    /** @param {number} value */
    set borderTint(value) {
        // this.borderSprite.tint = value
        this.previewBorder.tint = value
    }

    /** @param {number} value */
    set backgroundTint(value) {
        this.previewBackground.tint = value
    }

    /** @param {object} data */
    async _renderInner(data) {
        const $html = await super._renderInner(data)
        this.#createPixiApplication($html)
        $html.css('--preview-size', this.previewSize + 'px')
        return $html
    }

    _canDragDrop() {
        return true
    }

    /** @param {JQuery.DropEvent} event */
    _onDrop(event) {
        event.preventDefault()

        const item = event.dataTransfer.items[0]
        if (!item) return
        if (item.kind === 'string') item.getAsString(this.#onUrlDrop.bind(this))
        else if (item.kind === 'file' && item.type.startsWith('image/')) this.#onImageDrop(item)
    }

    /** @param {JQuery.DragOverEvent} event */
    _onDragOver(event) {
        event.preventDefault()
        return false
    }

    getData() {
        return {
            isToken: this.actor.isToken,
            canBrowse: game.user.can('FILES_BROWSE'),
        }
    }

    /** @param {JQuery} $html */
    activateListeners($html) {
        $html.find('.border-color > input').on('input', this._borderColorThrottle.bind(this))
        $html.find('.background-color > input').on('input', this._backgroundColorThrottle.bind(this))

        $html.filter('.canvas').on('wheel', this.#onMouseWheel.bind(this))

        $html.find('.load-avatar').on('click', this.#onLoadAvatar.bind(this))
        $html.find('.open-local').on('click', this.#onOpenLocalFileBrowser.bind(this))
        $html.find('.open-server').on('click', this.#onOpenServerFileBrowser.bind(this))

        $html.find('.save-avatar').on('click', this.#onSaveAvatar.bind(this))
        $html.find('.save-token').on('click', this.#onSaveToken.bind(this))
        $html.find('.save-all').on('click', this.#onSaveAll.bind(this))

        $html.find('.open-local > input').on('change', this.#onLocalFileSelected.bind(this))
    }

    /**
     * @param {string} source
     * @param {string} path
     * @param {string | undefined} bucket
     */
    async #checkPathFolder(source, path, bucket) {
        const dirs = path.split('/')
        let current = ''
        for (const dir of dirs) {
            if (!current) current += dir
            else current += `/${dir}`
            try {
                // if (useForgeVTT()) await ForgeAPI.call('assets/new-folder', { current })
                // else await FilePicker.createDirectory(source, current, { bucket })
                await FilePicker.createDirectory(source, current, { bucket })
            } catch {}
        }
    }

    /**
     * @param {Blob | null} blob
     * @param {'token' | 'avatar'} cat
     * @param {(path: string) => void} onSuccess
     */
    async #saveImage(blob, cat, onSuccess) {
        if (!blob) return

        const source = getSetting('source')
        const bucket = getBucket(source)
        const actor = this.actor
        const name = getFileNameFromActor(actor, cat)
        const path = getUploadPath(source, actor.type, cat)

        await this.#checkPathFolder(source, path, bucket)

        try {
            const file = new File([blob], name, { type: 'image/webp' })
            const response = await FilePicker.upload(source, path, file, { bucket }, { notify: false })
            if (response.status === 'success') onSuccess(response.path)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * @param {string} key
     * @param {string} path
     */
    #savedNotification(key, path) {
        path = /** @type {string} */ (path.split('/').pop())
        ui.notifications.info(notification(key, { path }), { permanent: true })
    }

    /** @param {string} path */
    #updateAvatar(path) {
        const img = cacheBusterImg(path)
        this.actor.update({ img })
        this.#savedNotification('avatar-saved', path)
    }

    /** @param {string} path */
    #updateTokenImg(path) {
        const img = cacheBusterImg(path)
        const actor = this.actor
        if (actor.isToken) {
            const token = /** @type {TokenDocument} */ (actor.token)
            token.update({ img })
        } else {
            actor.update({ 'token.img': img })
            const tokens = getActorTokens(actor, true)
            for (const token of tokens) {
                token.update({ img })
            }
        }
        this.#savedNotification('token-saved', path)
    }

    #onSaveAvatar() {
        const img = this.imageTexture
        const tmp = PIXI.Sprite.from(img)
        const canvas = this.renderer.extract.canvas(tmp)
        canvas.toBlob(blob => this.#saveImage(blob, 'avatar', this.#updateAvatar.bind(this)), 'image/webp')
    }

    #onSaveToken() {
        const canvas = this.renderer.extract.canvas(this.previewToken)
        canvas.toBlob(blob => this.#saveImage(blob, 'token', this.#updateTokenImg.bind(this)), 'image/webp')
    }

    #onSaveAll() {
        this.#onSaveAvatar()
        this.#onSaveToken()
        this.close()
    }

    /** @param {string} url */
    #onUrlDrop(url) {
        this.userImage = url
    }

    /** @param {DataTransferItem} item */
    #onImageDrop(item) {
        const file = item.getAsFile()
        if (file) this.#readImage(file)
    }

    /** @param {File} file */
    #readImage(file) {
        const reader = new FileReader()
        reader.addEventListener('load', event => {
            const img = event.target?.result
            if (typeof img !== 'string') return
            this.userImage = img
        })
        reader.readAsDataURL(file)
    }

    #onLoadAvatar() {
        this.userImage = this.actor.img
    }

    #onOpenServerFileBrowser() {
        new FilePicker({ callback: this.#onUrlDrop.bind(this), allowUpload: false, type: 'image' }).render(true)
    }

    /** @param {JQuery.ChangeEvent} event */
    #onLocalFileSelected(event) {
        const file = /** @type {HTMLInputElement} */ (event.currentTarget).files?.[0]
        if (file) this.#readImage(file)
    }

    /** @param {JQuery.ClickEvent<any, any, HTMLElement>} event */
    #onOpenLocalFileBrowser(event) {
        const input = /** @type {HTMLInputElement} */ (event.currentTarget.querySelector('input'))
        input.value = ''
        input.click()
    }

    /** @param {JQuery.TriggeredEvent} event */
    #onMouseWheel(event) {
        let delta = /** @type {WheelEvent} */ (event.originalEvent).deltaY
        delta = delta >= 0 ? -1 : 1
        this.zoom = Math.max(this.zoom + delta * 0.05, 0.1)
    }

    /** @param {JQuery.ChangeEvent<any, any, HTMLInputElement>} event */
    #getTintFromEvent(event) {
        return Number(event.currentTarget.value.replace('#', '0x'))
    }

    /** @param {JQuery.ChangeEvent<any, any, HTMLInputElement>} event */
    #onBorderColorChange(event) {
        this.borderTint = this.#getTintFromEvent(event)
    }

    /** @param {JQuery.ChangeEvent<any, any, HTMLInputElement>} event */
    #onBackgroundColorChange(event) {
        this.backgroundTint = this.#getTintFromEvent(event)
    }

    /**
     * @param {number} x
     * @param {number} [y]
     * @param {string} [file]
     */
    #createTokenSprite(x, y, file) {
        const sprite = new PIXI.Sprite()
        const radius = this.tokenSize

        sprite.anchor.set(0.5)
        sprite.position.set(x, y)
        sprite.width = radius
        sprite.height = radius

        if (file) sprite.texture = textureFromFileName(file)

        return sprite
    }

    /**
     * @param {number} x
     * @param {number} [y]
     * @param {string} [file]
     */
    #createImageSprite(x, y, file) {
        const sprite = new PIXI.Sprite()

        sprite.anchor.set(0.5)
        sprite.position.set(x, y)

        if (file) sprite.texture = textureFromFileName(file)

        return sprite
    }

    #createEditorImage() {
        let dragging = false
        let offset = { x: 0, y: 0 }
        let prevOffset = { x: 0, y: 0 }

        const img = this.#createImageSprite(0, 0, 'drop.webp')
        // img.alpha = 0.7
        // img.interactive = true

        img.on('pointerdown', event => {
            dragging = true
            const prevImg = this.previewImage
            const { x, y } = event.data.getLocalPosition(img.parent)
            offset = { x: x - img.x, y: y - img.y }
            prevOffset = { x: x - prevImg.x, y: y - prevImg.y }
        })

        img.on('pointermove', event => {
            if (!dragging) return
            const { x, y } = event.data.getLocalPosition(img.parent)
            this.editorImage.position.set(x - offset.x, y - offset.y)
            this.previewImage.position.set(x - prevOffset.x, y - prevOffset.y)
        })

        img.on('pointerup', () => (dragging = false))

        return img
    }

    #createEditorMask() {
        const screen = this.screen
        const size = this.previewSize

        const width = screen.width
        const height = screen.height

        const mask = new PIXI.Graphics()
        mask.lineStyle(0)
        mask.beginFill(0x555555)
        mask.lineTo(width, 0)
        mask.lineTo(width, height - size)
        mask.lineTo(width - size, height - size)
        mask.lineTo(width - size, height)
        mask.lineTo(0, height)
        mask.lineTo(0, 0)
        mask.endFill()

        return mask
    }

    #addEditor() {
        const screen = this.screen
        const size = this.previewSize
        const centerX = (screen.width - size) / 2
        const centerY = screen.height / 2

        const editor = new PIXI.Container()
        editor.scale.set(1.3)
        editor.position.set(centerX, centerY)

        const mask = this.#createEditorMask()

        this._editorImage = this.#createEditorImage()
        this._editorImage.mask = mask

        this._editorBorder = this.#createTokenSprite(0)
        this._editorBorder.alpha = 0.4

        editor.addChild(this._editorImage)
        editor.addChild(this._editorBorder)

        this.stage.addChild(mask)
        this.stage.addChild(editor)
    }

    #addPreview() {
        const screen = this.screen
        const previewSize = this.previewSize
        const halfPreviewSize = previewSize / 2
        const tokenSize = this.tokenSize

        const preview = new PIXI.Container()
        preview.width = previewSize
        preview.height = previewSize
        preview.position.set(screen.width - previewSize - 1, screen.height - previewSize - 1)

        const gx = new PIXI.Graphics()
        gx.lineStyle(1, 0x000000)
        gx.drawRect(0, 0, previewSize, previewSize)

        const token = new PIXI.Container()
        token.width = tokenSize
        token.height = tokenSize
        token.position.set(halfPreviewSize)

        const mask = new PIXI.Graphics()
        mask.beginFill(0x555555)
        mask.drawCircle(0, 0, (tokenSize - 2) / 2)
        mask.endFill()

        this._previewBackground = this.#createTokenSprite(0, 0, 'background.webp')

        this._previewImage = this.#createImageSprite(0)
        this._previewImage.mask = mask

        this._previewBorder = this.#createTokenSprite(0)

        this._previewToken = token

        token.addChild(mask)
        token.addChild(this._previewBackground)
        token.addChild(this._previewImage)
        token.addChild(this._previewBorder)

        preview.addChild(gx)
        preview.addChild(token)

        this.stage.addChild(preview)
    }

    /** @param {JQuery} $html */
    #createPixiApplication($html) {
        this._pixi = new PIXI.Application({ width: 1024, height: 768, backgroundAlpha: 0 })
        $html.filter('.canvas').append(this._pixi.view)

        this.#addEditor()
        this.#addPreview()

        this.borderImage = this.defaultTokenFile
    }
}
