import { html } from '../template.js';

export const disabled = html`
<style>
    .btn.disabled,
    .btn.disabled:hover,
    .btn.disabled:focus {
        background: var(--color-grey) !important;
        cursor: default;
    }
</style>
`;
