import { html } from '../template.js';

export const warning = html`
<style>
    .btn.warning {
        background: var(--color-cinnabar);
    }
    .btn.warning:hover,
    .btn.warning:focus {
        background: var(--color-flamingo);
    }
</style>
`;
