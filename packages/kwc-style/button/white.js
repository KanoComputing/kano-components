import { html } from '../template.js';
import { button } from "./base.js";

export const white = html`
    ${button}
    <style>
        .btn.white {
            background: rgba(255, 255, 255, 1);
            color: var(--color-abbey);
        }
        .btn.white:hover,
        .btn.white:focus {
            background: rgba(255, 255, 255, 0.8);
            color: var(--color-abbey);
        }
    </style>
`;
