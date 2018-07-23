import { html } from '../template.js';

export const tertiary = html`
<style>
    .btn.tertiary {
        background: var(--color-grey);
    }
    .btn.tertiary:hover,
    .btn.tertiary:focus {
        background: var(--color-chateau);
    }
</style>
`;
