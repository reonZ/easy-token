import { Directories } from './apps/directories.js'
import { Editor } from './apps/editor.js'
import { bringAppToTop, registerSetting, registerSettingMenu } from './utils/foundry.js'
import { registerLocalize } from './utils/handlebars.js'

Hooks.once('init', async () => {
    registerLocalize()

    registerSetting({
        name: 'source',
        type: String,
        default: 'data',
    })

    registerSetting({
        name: 'paths',
        type: Object,
        default: {},
    })

    registerSettingMenu({
        name: 'directories',
        icon: 'fas fa-folder-open',
        type: Directories,
    })
})

/**
 * @param {ActorSheet} sheet
 * @param {ApplicationHeaderButton[]} buttons
 */
function getActorSheetHeaderButtons(sheet, buttons) {
    // if (!game.user.can('FILES_UPLOAD')) return
    buttons.unshift({
        label: 'Easy-Token',
        icon: 'fas fa-image',
        class: 'lvk-easy-token',
        onclick: () => openEditor(sheet),
    })
}

/** @param {ActorSheet} sheet */
function openEditor(sheet) {
    const id = Editor.idFromSheet(sheet)
    if (bringAppToTop(id)) return
    new Editor(sheet).render(true)
}

Hooks.on('getActorSheetHeaderButtons', getActorSheetHeaderButtons)
