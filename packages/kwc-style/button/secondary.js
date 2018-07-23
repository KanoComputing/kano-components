import { html } from '../template.js';
import { button } from "../button.js";

export const secondary = html`
    ${button}
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
