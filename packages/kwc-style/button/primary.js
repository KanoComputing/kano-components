import { html } from '../template.js';
import { button } from "./base.js";

export const primary = html`
    ${button}
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
