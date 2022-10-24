import MODULE_ID from './module.js'

/** @param {...string} path */
export function templatePath(...path) {
    return `modules/${MODULE_ID}/templates/${path.join('/')}`
}

/** @param {...string} path */
export function imagePath(...path) {
    return `modules/${MODULE_ID}/images/${path.join('/')}`
}

/**@param {string} key*/
export function getSetting(key) {
    return game.settings.get(MODULE_ID, key)
}

/**
 * @template T
 * @param {string} key
 * @param {T} value
 */
export function setSetting(key, value) {
    return game.settings.set(MODULE_ID, key, value)
}

/** @param {string[]} path */
function getSettingLocalizationPath(...path) {
    return `${MODULE_ID}.settings.${path.join('.')}`
}

/**
 * @template {*} T
 * @param {Omit<RequiredBy<SettingConfig<T>, 'name'>, 'key' | 'namespace'>} options
 * options.scope = 'world'
 *
 * options.config = false
 */
export function registerSetting(options) {
    const name = options.name
    options.scope = options.scope ?? 'world'
    options.config = options.config ?? false
    if (options.config) {
        options.name = getSettingLocalizationPath(name, 'name')
        options.hint = getSettingLocalizationPath(name, 'hint')
    }
    game.settings.register(MODULE_ID, name, options)
}

/**
 * @param {RequiredBy<SettingSubmenuConfig, 'name'>} options
 * options.restricted = true
 *
 * options.icon = 'fas fa-cogs'
 */
export function registerSettingMenu(options) {
    const name = options.name
    options.name = getSettingLocalizationPath(name, 'name')
    options.label = getSettingLocalizationPath(name, 'label')
    options.hint = getSettingLocalizationPath(name, 'hint')
    options.restricted = options.restricted ?? true
    options.icon = options.icon ?? 'fas fa-cogs'
    game.settings.registerMenu(MODULE_ID, name, options)
}

/**
 * @param {string} id
 * @return {boolean}
 */
export function bringAppToTop(id) {
    const app = Object.values(ui.windows).find(x => x.id == id)
    if (!app) return false
    app.bringToTop()
    return true
}

export function getActorsTypes() {
    return game.system.documentTypes.Actor
}

/** @param {...string} path */
export function worldPath(...path) {
    return `worlds/${game.world.id}/${path.join('/')}`
}

/**
 * @param {string} key
 * @param {object} [data]
 */
export function localize(key, data) {
    key = `${MODULE_ID}.${key}`
    if (data) return game.i18n.format(key, data)
    return game.i18n.localize(key)
}

/**
 * @param {string} subKey
 * @returns {(key: string, data?: object) => string}
 */
export function subLocalize(subKey) {
    return (key, data) => localize(`${subKey}.${key}`, data)
}

/** @param {'data' | 's3'} source */
export function getBucket(source) {
    if (source !== 's3') return undefined
    return game.data.files.s3?.buckets[0]
}

/**
 * @param {Actor} actor
 * @param {boolean} [linkedOnly]
 */
export function getActorTokens(actor, linkedOnly = false) {
    return /** @type {TokenDocument[]} */ (
        game.scenes
            .map(scene => scene.tokens.filter(token => token.actorId === actor.id && (!linkedOnly || token.actorLink)))
            .flat()
    )
}

export function useForgeVTT() {
    return typeof ForgeVTT !== 'undefined' && ForgeVTT.usingTheForge
}
