import { html } from '../template.js';
 
export const text = html`
    <style>
        .input[type="text"],
        .input[type="email"],
        .input[type="password"],
        textarea.input {
            background: white;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #d3d6d8;
            display: block;
            font-size: 14px;
            padding: 8px 16px;
            width: 100%;
        }
        .input[type="text"]:focus,
        .input[type="email"]:focus,
        .input[type="password"]:focus,
        textarea.input:focus {
            outline: none;
            border-color: var(--color-kano-orange);
        }
        /**
            * Style the placeholders with all the browser-prefixes.
            * See here: https://css-tricks.com/almanac/selectors/p/placeholder/
            */
        .input[type="text"]::-webkit-input-placeholder,
        .input[type="email"]::-webkit-input-placeholder,
        .input[type="password"]::-webkit-input-placeholder {
            text-transform: uppercase;
        }
        .input[type="text"]::-moz-placeholder,
        .input[type="email"]::-moz-placeholder,
        .input[type="password"]::-moz-placeholder {
            text-transform: uppercase;
        }
        .input[type="text"]:-moz-placeholder,
        .input[type="email"]:-moz-placeholder,
        .input[type="password"]:-moz-placeholder {
            text-transform: uppercase;
        }
        .input[type="text"]:-ms-input-placeholder,
        .input[type="email"]:-ms-input-placeholder,
        .input[type="password"]:-ms-input-placeholder {
            text-transform: uppercase;
        }
    </style>
`;
