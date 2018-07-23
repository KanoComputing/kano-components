import { html } from '../template.js';

export const white = html`
<style>
    .btn.white {
        background-color: rgba(255, 255, 255, 1);
        color: var(--color-abbey);
    }
    .btn.white:hover,
    .btn.white:focus {
        background-color: rgba(255, 255, 255, 0.8);
        color: var(--color-abbey);
    }
</style>
`;
