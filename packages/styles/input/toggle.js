import { html } from '../template.js';
import '../typography.js';

export const toggle = html`
    <style>
        input[type="checkbox"].toggle {
            display: none;
        }
        input[type="checkbox"].toggle + label {
            font-family: var(--font-body);
            position: relative;
            padding: 5px 0 0 50px;
            line-height: 2.0em;
            cursor: pointer;
            display: block;
        }
        input[type="checkbox"].toggle + label:before {
            content: "";
            position: absolute;
            display: block;
            left: 0px;
            margin-left: 8px;
            top: calc(50% - 7px);
            width: 32px;
            height: 17px;
            border-radius: 16px;
            background: #9FA4A8;
            transition: all 0.3s;
        }
        input[type="checkbox"].toggle + label:after {
            content: "";
            position: absolute;
            display: block;
            left: 0px;
            top: calc(50% - 5px);
            width: 13px;
            height: 13px;
            border-radius: 16px;
            background: #fff;
            margin-left: 11px;
            transition: all 0.3s;
        }
        input[type="checkbox"].toggle + label:hover:after {
            box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
        }
        input[type="checkbox"].toggle:checked + label:after {
            margin-left: 24px;
        }
        input[type="checkbox"].toggle:checked + label:before {
            background: #FF6900;
        }
    </style>
`;
