/**
 * Returns the contents of an HTMLTemplateElement or the value itself
 * @param {any} value Any value that can either be casted to a string or is a HTMLTemplateElement
 */
function htmlValue(value) {
    if (value instanceof HTMLTemplateElement) {
        return value.innerHTML;
    }
    return value;
}
/**
 * Literal temnplate tag that creates a HTMLTemplateElement from strings
 * and other HTMLTemplateElements
 * Use as
 * ```js
 * const template = html`<button>Click</button>`
 * const otherTemplate = html`
 * <div>${template}</div>
 * `
 * ```
 */
export const html = function html(strings, ...values) {
    const template = document.createElement('template');
    template.innerHTML = values.reduce((acc, v, idx) => acc
        + htmlValue(v) + strings[idx + 1], strings[0]);
    return template;
};

export default html;
