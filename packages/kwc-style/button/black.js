import { html } from '../template.js';

export const black = html`
<style>
    .btn.black {
        background: var(--color-black);
    }
    .btn.black:hover,
    .btn.black:focus {
        background: var(--color-abbey);
    }
</style>
`;
