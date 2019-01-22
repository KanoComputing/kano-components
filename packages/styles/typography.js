import { html } from './template.js';
import { bariol } from './fonts/bariol.js';

/**
 * Typography style, sets the fonts variables
 */
const typography = html`
    ${bariol}
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
