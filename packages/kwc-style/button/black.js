import { html } from '../template.js';

export const black = html`
<style>
    .btn.black {
        background-color: var(--color-black);
    }
    .btn.black:hover,
    .btn.black:focus {
        background-color: var(--color-abbey);
    }
</style>
`;
