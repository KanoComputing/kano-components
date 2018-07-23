import { html } from '../template.js';
import { button } from './base.js';
 
export const soft = html`
    ${button}
    <style>
        .btn.soft {
            background: transparent;
            border: 1px solid #a2a6aa;
            border-radius: 3px;
            color: var(--color-chateau);
            cursor: pointer;
            display: inline-block;
            font-family: var(--font-body);
            font-size: 14px;
            font-weight: bold;
            height: 40px;
            line-height: 40px;
            outline: none;
            overflow: hidden;
            padding: 0 22px;
            text-align: center;
            text-transform: uppercase;
            transition-property: background, border-color, color;
            transition-duration: 0.3s;
            transition-timing-function: ease;
            white-space: nowrap;
        }
        .btn.soft:hover,
        .btn.soft[active] {
            border-color: var(--color-kano-orange);
        }
        .btn.soft[disabled],
        .btn.soft[disabled]:hover {
            background: transparent;
            border-color: #d3d6d8;
            color: #a2a6aa;
        }
    </style>
`;
