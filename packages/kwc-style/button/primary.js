import { html } from '../template.js';

export const primary = html`
<style>
    .btn.primary {
        color: white;
        background: var(--color-kano-orange);
    }
    .btn.primary:hover,
    .btn.primary:focus {
        color: white;
        background: var(--color-flame);
    }
</style>
`;
