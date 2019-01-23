import { img, svg, dataURI } from '../index.js';

const sample = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32"></circle></svg>`;

const container = fixture`<div></div>`;
const image = fixture`<img />`;

suite('Icons rendering', () => {
    let el;
    setup(() => {
        el = container();
    });
    test('as svg', () => {
        const iconTemplate = sample;
        el.appendChild(iconTemplate.cloneNode(true).content);
        const injected = el.querySelector('svg');
        assert.isNotNull(injected);
    });
    test('as dataURI', () => {
        const iconSrc = dataURI(sample);
        const localImg = image();
        localImg.src = iconSrc;
    });
    test('as div background', () => {
        const iconTemplate = img(sample, 64, 64);
        el.appendChild(iconTemplate.content);
        const div = el.querySelector('div');
        assert.equal(div.style.width, '64px');
        assert.equal(div.style.height, '64px');
    });
});
