import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import '@kano/code/dist/app/elements/kc-player/kc-player.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './elements/kwc-code-display.js';
import './highlight-theme/app.js';
/**
`kwc-app-player`
Player UI component for kano code shares.

@demo demo/index-app.html
*/
class KwcAppPlayer extends PolymerElement {
    static get template() {
        return html`
        <style>
            /* :host {
                display: block;
                height: 100%;
                font-family: var(--font-body);
            }

            :host * {
                box-sizing: border-box;
            } */

            /* .app {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                position: relative;
            }
            kc-player:not([fullscreen]) {
                position: absolute;
                top: 0;
                left: 0;
                position: relative;

                transition: opacity 200ms linear;
                width: 100%;
            } */

        </style>
        <div class="app">
            <kc-player id="player" src="[[_appUrl]]" show-toolbar></kc-player>
        </div>
        <template is="dom-if" if="[[displayCode]]">
            <kwc-code-display code="[[_mdCode]]" lines="[[_lines]]" code-type="Javascript" on-hide-code="_hideCode"></kwc-code-display>
        </template>
        `;
    }
    static get properties() {
        return {
            /**
             * The code that creates this share.
             * @type {String}
             */
            _code: {
                type: String,
                value: null,
            },
            /**
             * Flag to indicate whether the code display element is visible.
             * @type {Boolean}
             */
            displayCode: {
                type: Boolean,
                value: false,
            },
            /**
             * An array of line numbers for rendering the code display.
             * @type {Array}
             */
            _lines: {
                type: Array,
                computed: '_computeLines(_mdCode)',
            },
            /**
             * The markdown version of the share code to display in the
             * code display element.
             * @type {String}
             */
            _mdCode: {
                type: String,
                value: null,
            },
            _appUrl: {
                type: String,
                value: null,
            },
            /**
             * The current share to be played.
             * @type {Object}
             */
            share: {
                type: Object,
                observer: '_shareChanged',
            },
        };
    }
    /** OBSERVERS * */
    /**
     * Computed the number of lines in the share's code and
     * populated an array with the list of numbers.
     * @param {String} mdCode Markdown string of share code
     * @return{Array} List of numbers.
     */
    _computeLines(mdCode) {
        if (!mdCode) {
            return [];
        }
        const newLines = mdCode.match(/\n(?!$)/g);


        const lineCount = newLines ? newLines.length : 1;
        const lines = [];
        /* Don't include the header */
        for (let i = 1; i < lineCount; i += 1) {
            lines.push(i);
        }
        return lines;
    }
    /**
     * Load any code from storage and compute the markdown for
     * display in the display code element.
     * @param {Object} share Current share data
     */
    _shareChanged(share) {
        if (!share) {
            return;
        }
        const attachment = this.share.attachment_url;
        if (attachment) {
            this._appUrl = attachment;
        }
    }
    /** EVENT HANDLERS* */
    /**
     * Proxy the hide code event from the code display element.
     *
     * @event hide-code
     */
    _hideCode() {
        this.this.dispatchEvent(new CustomEvent('hide-code'));
    }
}

customElements.define('kwc-app-player', KwcAppPlayer);
