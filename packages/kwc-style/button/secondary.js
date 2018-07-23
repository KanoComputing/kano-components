import { html } from '../template.js';

export const secondary = html`
<style>
    .btn.secondary {
        background-color: var(--color-grassland);
    }
    .btn.secondary:hover,
    .btn.secondary:focus {
        background-color: var(--color-apple);
    }
</style>
`;
