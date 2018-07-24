import { html } from './template.js';

const typography = html`
    <style>
        html {
            --font-heading: 'Bariol', Helvetica, Arial, sans-serif;
            --font-body: 'Bariol', Helvetica, Arial, sans-serif;
            --font-special: 'Bariol', Helvetica, Arial, sans-serif;
            --font-code: Monaco, monospace;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
`;

document.head.appendChild(typography.content);
