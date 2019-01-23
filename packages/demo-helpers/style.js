import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { html } from '@kano/styles/template.js';

const style = html`
    <style>
        html, body {
            width: 100vw;
            max-width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        fieldset {
            margin: 32px;
            padding: 20px 30px;
            border: 1px solid var(--color-kano-orange);
            border-radius: 16px;
            max-width: 640px;
        }
        legend {
            font-family: var(--font-body);
        }
    </style>
`;

document.head.appendChild(style.content);
