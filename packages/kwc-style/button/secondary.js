import { html } from '../template.js';

export const secondary = html`
<style>
    .btn.secondary {
        background: var(--color-grassland);
    }
    .btn.secondary:hover,
    .btn.secondary:focus {
        background: var(--color-apple);
    }
</style>
`;
