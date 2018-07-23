import { html } from '../template.js';
import { button } from "./base.js";

export const warning = html`
    ${button}
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
