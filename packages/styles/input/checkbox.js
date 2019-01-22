import { html } from '../template.js';
import { checkedIcon } from './assets.js';
 
export const checkbox = html`
    <style>
        .input[type="checkbox"] {
            height: 14px;
            margin-right: 14px;
            position: relative;
            width: 14px;
        }
        .input[type="checkbox"]::before,
        .input[type="checkbox"]::after {
            border: 1px solid var(--color-abbey);
            border-radius: 3px;
            color: white;
            cursor: pointer;
            height: 14px;
            left: 0;
            position: absolute;
            top: 0;
            width: 14px;
        }
        .input[type="checkbox"]::before {
            background-color: white;
            content: '';
        }
        .input[type="checkbox"]::after {
            content: url(${checkedIcon});
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .input[type="checkbox"]:checked::after {
            background-color: var(--color-abbey);
            opacity: 1;
        }
        .input[type="checkbox"]:focus {
            outline: none;
            border-color: var(--color-kano-orange);
        }
        .input[type="checkbox"] ~ label {
            cursor: pointer;
        }
    </style>
`;
