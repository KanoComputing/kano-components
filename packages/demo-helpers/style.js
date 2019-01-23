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
        pre {
            margin: 0;
            padding: 0 0 10px 0;
            background-color: #f5f5f5;
            font-size: 13px;
            overflow: auto;
            overflow: auto;
            max-width: 600px;
        }
    </style>
`;

document.head.appendChild(style.content);
