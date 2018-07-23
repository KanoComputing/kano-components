import { html } from '../template.js';
import { button } from './base.js';
 
export const mega = html`
    ${button}
    <style>
        .btn.mega {
            height: 48px;
            min-width: 150px;
            display: inline-block;

            line-height: 48px;
            outline: none;
            overflow: hidden;
            padding: 0 22px;
            white-space: nowrap;
            cursor: pointer;

            background: rgba(255, 255, 255, 1);
            color: var(--color-abbey);

            border-color: var(--color-stone);
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;

            font-size: 16px;
            font-family: var(--font-body);
            font-weight: bold;

            text-align: center;
            text-transform: uppercase;

            transition-property: background, border-color, color;
            transition-duration: 0.3s;
            transition-timing-function: ease;
        }
        .btn.mega:hover,
        .btn.mega:focus, {
            color: white;
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
