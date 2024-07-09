import { getSetting, worldPath } from "./utils/foundry.js";
import { snakeCase } from "./utils/string.js";

/**
 * @param {'data' | 's3' } source
 * @param {string} type
 * @param {'avatar' | 'token'} cat
 */
export function getDefaultPath(source, type, cat) {
    const key = `images/${cat}s/${type}s`;
    if (source === "s3") return key;
    return worldPath(key);
}

/**
 * @param {'data' | 's3' } source
 * @param {string} type
 * @param {'avatar' | 'token'} cat
 */
export function getUploadPath(source, type, cat) {
    const paths = /** @type {Record<String, string>} */ (getSetting("paths"));
    return /** @type {string} */ (
        foundry.utils.getProperty(paths, `${type}.${cat}`) ?? getDefaultPath(source, type, cat)
    );
}

/**
 * @param {Actor} actor
 * @param {'token' | 'avatar'} cat
 */
export function getFileNameFromActor(actor, cat) {
    let name;
    if (actor.isToken) {
        const token = /** @type {TokenDocument} */ (actor.token);
        name = `${snakeCase(token.name)}.${token.id}`;
    } else {
        name = snakeCase(actor.name);
    }
    name += `.${cat}.webp`;
    return name;
}

/** @param {string} path */
export function cacheBusterImg(path) {
    return `${path}?${Date.now()}`;
}
