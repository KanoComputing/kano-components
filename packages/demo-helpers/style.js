import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { html } from '@kano/styles/template.js';

const style = html`
    <style>
        fieldset {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px 30px;
            border: 1px solid var(--color-kano-orange);
            border-radius: 16px;
        }
        legend {
            font-family: var(--font-body);
        }
    </style>
`;

document.head.appendChild(style.content);