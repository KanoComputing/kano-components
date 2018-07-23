import { html } from '../template.js';
import { button } from './base.js';

export const disabled = html`
    ${button}
    <style>
        .btn[disabled],
        .btn[disabled]:hover,
        .btn[disabled]:focus {
            background: var(--color-grey) !important;
            cursor: default;
        }
    </style>
`;
