import { html } from './template.js';
import './typography.js';
import './color.js';

const buttonColors = html`
    <style>
        html {
            --button-primary-color: var(--color-kano-orange);
            --button-primary-hover-color:  var(--color-flame);
            --button-secondary-color: var(--color-grey);
            --button-secondary-hover-color: var(--color-abbey);
            --button-action-background: #f6f7f9;
            --button-action-background-hover: #e5e8eC;
            --button-action-highlight: var(--button-action-background-hover);
        }
    </style>
`;

document.head.appendChild(buttonColors.content);

export const button = html`
    <style>
        .btn {
            border: none;
            cursor: pointer;
            display: inline-block;
            font-family: var(--font-body);
            font-weight: bold;
            outline: none;
            overflow: hidden;
            text-align: center;
            white-space: nowrap;
            background: var(--button-primary-color);
            font-size: 16px;
            height: 32px;
            line-height: 32px;
            padding: 0 14px;
            border-radius: 40px;
            color: white;
            transition-property: background, border-color, color;
            transition-duration: 0.2s;
            transition-timing-function: ease;
        }
        .btn:hover,
        .btn:focus {
            color: white;
            background: var(--button-primary-hover-color);
        }
        /* SIZES */
        .btn.tab {}
        .btn.s {
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            padding: 0 10px;
        }
        .btn.l {
            font-size: 18px;
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
        }

        /* SECONDARY */
        .btn.secondary {
            background: var(--button-secondary-color);
        }
        .btn.secondary:hover,
        .btn.secondary:focus {
            background: var(--button-secondary-hover-color);
        }

        .btn.round {}

        /* DISABLED */
        .btn[disabled],
        .btn[disabled]:hover,
        .btn[disabled]:focus {
            background: var(--color-grey) !important;
            opacity: 0.5;
            cursor: default;
        }
        /* ACTION */
        .btn.action {
            background-color: var(--button-action-background);
            display: flex;
            flex-direction: row;
            align-items: center;
            color: var(--color-chateau);
            fill: var(--color-grey);
        }
        .btn.action:hover,
        .btn.action:focus {
            background-color: var(--button-action-background-hover);
            fill: var(--button-action-highlight);
            color: var(--color-chateau);
        }
        .btn.action.active {
            background-color: var(--button-action-highlight);
            fill: white;
            color: white;
        }
        .btn.action svg {
            width: 16px;
            height: 16px;
            margin-right: 9px;
        }

        /* INVERTED */
        .btn.inverted.secondary {
            background: none;
            padding: 0;
            border-radius: 0;
            color: var(--button-secondary-color);
        }
        .btn.inverted:hover,
        .btn.inverted:focus {
            background: none;
            color: var(--button-secondary-hover-color);
        }
        .btn.inverted svg {
            background: none;
            border-radius: 0;
            padding: 0;
            width: 12px;
            height: 12px;
            margin-right: 6px;
        }
        .btn.inverted svg * {
            fill: var(--button-secondary-color);
        }
        .btn.inverted:hover svg *,
        .btn.inverted:focus svg * {
            fill: var(--button-secondary-hover-color);
        }
    </style>
`;

export default button;
