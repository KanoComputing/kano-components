import { html } from './template.js';
import { closeIcon } from './assets.js';
import './color.js';

const closureColors = html`
    <style>
        html {
            --closure-primary-color: var(--color-grey);
            --closure-primary-hover-color: var(--color-abbey);
            --closure-secondary-color:  var(--color-abbey);
            --closure-secondary-hover-color: var(--color-grey);
        }
    </style>
`;
document.head.appendChild(closureColors.content);

export const closure = html`
    <style>
        .closure {
            border: none;
            cursor: pointer;
            display: inline-block;
            outline: none;
            background-color: var(--closure-primary-color);
            height: 24px;
            width: 24px;
            border-radius: 3px;
            transition-property: background-color;
            transition-duration: 0.2s;
            transition-timing-function: ease;
        }
        .closure::after {
            content: url(${closeIcon});
        }
        .closure:hover,
        .closure:focus {
            background-color: var(--closure-primary-hover-color);
        }
        .closure.secondary {
            background-color: var(--closure-secondary-color);
        }
        .closure.secondary:hover,
        .closure.secondary:focus {
            background-color: var(--closure-secondary-hover-color);
        }
    </style>
`;
