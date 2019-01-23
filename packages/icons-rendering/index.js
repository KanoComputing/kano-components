function toSrc(data) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(data)}`;
}

function toTemplate(string) {
    const template = document.createElement('template');
    template.innerHTML = string;
    return template;
}

function litteral(strings, ...values) {
    return values.reduce((acc, v, idx) => `${acc}${v}${strings[idx + 1]}`, strings[0]).trim();
}

export const svg = (strings, ...values) => toTemplate(litteral(strings, ...values));

export const dataURI = (tpl) => {
    const svgString = tpl.innerHTML;
    return toSrc(svgString);
};

export const img = (tpl, width, height) => {
    const svgString = tpl.innerHTML;
    const src = toSrc(svgString);
    return toTemplate(`<div style="width: ${width}px; height: ${height}px; background-image: url('${src}'); background-repeat: no-repeat; background-size: contain"></div>`);
};
