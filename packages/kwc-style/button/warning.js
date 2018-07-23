import { html } from '../template.js';

export const warning = html`
<style>
    .btn.warning {
        background-color: var(--color-cinnabar);
    }
    .btn.warning:hover,
    .btn.warning:focus {
        background-color: var(--color-flamingo);
    }
</style>
`;
