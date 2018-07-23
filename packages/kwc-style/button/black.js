import { html } from '../template.js';
import { button } from './base.js';

export const black = html`
    ${button}
    <style>
        .btn.black {
            background: var(--color-black);
        }
        .btn.black:hover,
        .btn.black:focus {
            background: var(--color-abbey);
        }
    </style>
`;
