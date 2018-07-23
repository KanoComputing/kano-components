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
        }
        .btn.soft:hover,
        .btn.soft[active] {
            border-color: var(--color-kano-orange);
        }
        .btn.soft[disabled],
        .btn.soft[disabled]:hover {
            background: transparent !important;
            border-color: #d3d6d8;
            color: #a2a6aa;
        }
    </style>
`;
