import { html } from '../template.js';

export const tertiary = html`
<style>
    .btn.tertiary {
        background-color: var(--color-grey);
    }
    .btn.tertiary:hover,
    .btn.tertiary:focus {
        background-color: var(--color-chateau);
    }
</style>
`;
