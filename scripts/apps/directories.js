import { getDefaultPath } from '../utils.js'
import { getActorsTypes, getSetting, setSetting, templatePath } from '../utils/foundry.js'

export class Directories extends FormApplication {
    /** @returns {FormApplicationOptions} */
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            id: 'easy-token-directories',
            title: 'Actor Types Directories',
            template: templatePath('directories.html'),
            // closeOnSubmit: false,
            width: 600,
        }
    }

    /**
     * @param {Event} _event
     * @param {Record<string, string>} data
     */
    async _updateObject(_event, data) {
        setSetting('source', data.source)
        delete data.source

        const paths = {}

        for (const key in data) {
            const value = data[key]
            if (value) setProperty(paths, key, data[key])
        }

        setSetting('paths', paths)
    }

    getData() {
        const source = this._source ?? getSetting('source')
        const actors = getActorsTypes()
        const paths = getSetting('paths')

        const list = actors.map(type => {
            const { avatar = '', token = '' } = paths[type] ?? {}
            return {
                type,
                avatar: { value: avatar, placeholder: getDefaultPath(source, type, 'avatar') },
                token: { value: token, placeholder: getDefaultPath(source, type, 'token') },
            }
        })

        return {
            list,
            source,
            hasS3: game.data.files.storages.includes('s3'),
        }
    }

    /** @param {JQuery} $html */
    activateListeners($html) {
        $html.find('button.cancel').on('click', this.#onCancel.bind(this))
        $html.find('select[name=source]').on('change', this.#onSourceChange.bind(this))
    }

    /** @param {JQuery.ChangeEvent} event */
    #onSourceChange(event) {
        this._source = event.currentTarget.value
        this.render()
    }

    /** @param {JQuery.ClickEvent} event */
    #onCancel(event) {
        event.preventDefault()
        this.close()
    }
}
