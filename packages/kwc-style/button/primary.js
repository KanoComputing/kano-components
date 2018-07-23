import { html } from '../template.js';

export const primary = html`
<style>
    .btn.primary {
        color: var(--kwc-button-color, white);
        background: var(--kwc-button-background, var(--color-kano-orange));
    }
    .btn.primary:hover,
    .btn.primary:focus {
        color: var(--kwc-button-color-hover, white);
        background-color: var(--kwc-button-background-hover, var(--color-flame));
    }
</style>
`;
