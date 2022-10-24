/**
 * @param {(...args: any[]) => void} callback
 * @param {number} delay
 */
export function throttle(callback, delay) {
    let throttling = false
    return function (/** @type {any} */ ...args) {
        throttling = true
        setTimeout(() => {
            callback(...args)
            throttling = false
        }, delay)
    }
}
