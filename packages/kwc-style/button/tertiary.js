import { html } from '../template.js';
import { button } from "./base.js";

export const tertiary = html`
    ${button}
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
