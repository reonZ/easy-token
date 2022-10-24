import { imagePath } from './foundry.js'

/** @typedef {{x: number, y?: number} | {x?: number, y: number} | number} OtherPoint */

/** @param {string} file */
export function textureFromFileName(file) {
    return PIXI.Texture.from(imagePath(file))
}

/**
 * Multiply 'original' with 'other'
 * @param {PIXI.IPointData} original
 * @param {OtherPoint} other
 * @returns {PIXI.Point}
 */
export function multiply(original, other) {
    return calcWith(
        original,
        other,
        (x, o) => x * o,
        (y, o) => y * o
    )
}

/**
 * Divide 'other' from 'original'
 * @param {PIXI.IPointData} original
 * @param {OtherPoint} other
 * @returns {PIXI.Point}
 */
export function divide(original, other) {
    return calcWith(
        original,
        other,
        (x, o) => x / o,
        (y, o) => y / o
    )
}

/**
 * Add 'other' to 'original'
 * @param {PIXI.IPointData} original
 * @param {OtherPoint} other
 * @returns {PIXI.Point}
 */
export function add(original, other) {
    return calcWith(
        original,
        other,
        (x, o) => x + o,
        (y, o) => y + o
    )
}

/**
 * Substract 'other' from 'original'
 * @param {PIXI.IPointData} original
 * @param {OtherPoint} other
 * @returns {PIXI.Point}
 */
export function substract(original, other) {
    return calcWith(
        original,
        other,
        (x, o) => x - o,
        (y, o) => y - o
    )
}

/**
 * @param {PIXI.IPointData} original
 * @param {OtherPoint} other
 * @param {((originalX: number, otherX: number) => number) | null} [fnX]
 * @param {((originalY: number, otherY: number) => number) | null} [fnY]
 * @returns {PIXI.Point}
 */
export function calcWith(original, other, fnX, fnY) {
    const point = setOther(other)
    const result = new PIXI.Point()
    result.x = fnX?.(original.x, point.x) ?? original.x
    result.y = fnY?.(original.y, point.y) ?? original.y
    return result
}

/** @param {OtherPoint} other */
function setOther(other) {
    if (typeof other === 'number') other = { x: other, y: other }
    return {
        x: other.x ?? 1,
        y: other.y ?? 1,
    }
}
