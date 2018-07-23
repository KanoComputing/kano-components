import { html } from '../template.js';
import { button } from './base.js';
 
export const mega = html`
    ${button}
    <style>
        .btn.mega {
            height: 48px;
            min-width: 150px;

            background: rgba(255, 255, 255, 1);
            color: var(--color-abbey);

            border-color: var(--color-stone);
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;

            font-size: 16px;
        }
        .btn.mega:hover,
        .btn.mega:focus, {
            background: var(--color-kano-orange);
        }
        .btn.mega[disabled],
        .btn.mega[disabled]:hover,
        .btn.mega[disabled]:focus {
            background: var(--color-grey);
            cursor: default;
            color: var(--color-chateau);
            border-color: var(--color-stone);
        }
    </style>
`;
