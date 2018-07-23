function htmlValue(value) {
    if (value instanceof HTMLTemplateElement) {
        return value.innerHTML;
    }
    return value;
}

export const html = function html(strings, ...values) {
    const template = document.createElement('template');
    template.innerHTML = values.reduce((acc, v, idx) =>
        acc + htmlValue(v) + strings[idx + 1], strings[0]);
    return template;
};
