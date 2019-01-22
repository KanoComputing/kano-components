import { demo, html } from '@kano/demo-helpers/index.js';
import '../kwc-pagination.js';

const simple = html`
    <kwc-pagination total-pages="20" current-page="1" range="5" pagination-controls></kwc-pagination>
`;
const jump = html`
    <kwc-pagination total-pages="20" current-page="1" range="3" pagination-controls jump-controls></kwc-pagination>
`;
const start = html`
    <kwc-pagination total-pages="20" current-page="7" starts-on="5" range="4" pagination-controls jump-controls></kwc-pagination>
`;

demo('kwc-pagination simple example', simple, (element) => {
    element.addEventListener('go-to-page', (e) => {
        console.log('go to page', e.detail);
        element.set('currentPage', e.detail);
    });
});

demo('kwc-pagination jump controls', jump, (element) => {
    element.addEventListener('go-to-page', (e) => {
        console.log('go to page', e.detail);
        element.set('currentPage', e.detail);
    });
});

demo('kwc-pagination starts on', start, (element) => {
    element.addEventListener('go-to-page', (e) => {
        console.log('go to page', e.detail);
        element.set('currentPage', e.detail);
    });
});
