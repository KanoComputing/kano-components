/**
`kwc-art-player`
Player UI component for make art shares.

@demo demo/index-art.html
*/
/*
FIXME(polymer-modulizer): the above comments were extracted
from HTML and may be out of place here. Review them and
then delete this comment!
*/

import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './elements/kwc-code-display.js';
import './highlight-theme/art.js';

class KwcArtPlayer extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host * {
                box-sizing: border-box;
            }
            .player {
                text-align: center;
            }
            img {
                display: inline-block;
                margin: 0 auto ;
                background-color: white;
                max-width: 100%;
                margin-bottom: 48px;
                box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.15);
            }
        </style>
        <div class="player">
            <img id="image" src="[[share.cover_url]]" sizing="contain" preload fade>
        </div>
        <template is="dom-if" if="[[displayCode]]">
                <kwc-code-display code="[[_mdCode]]" lines="[[_lines]]" code-type="[[_computeCodeType(share.app)]]" on-hide-code="_hideCode">
                                    </kwc-code-display>
        </template>
    `;
    }
    static get properties() {
        return {
            /**
             * The code that creates this share.
             */
            _code: {
                type: String,
                value: null,
            },
            /**
             * Flag to indicate whether the code display element is visible.
             */
            displayCode: {
                type: Boolean,
                value: false,
                notify: true,
            },
            /**
             * An array of line numbers for rendering the code display.
             */
            _lines: {
                type: Array,
                computed: '_computeLines(_mdCode)',
            },
            /**
             * The markdown version of the share code to display in the
             * code display element.
             */
            _mdCode: {
                type: String,
                value: null,
            },
            /**
             * The current share to be played.
             */
            share: {
                type: Object,
                value: () => ({}),
            },
        };
    }
    static get observers() {
        return [
            '_shareChanged(share.*)',
        ];
    }
    /** OBSERVERS * */
    /**
     * Computed the number of lines in the share's code and
     * populated an array with the list of numbers.
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
     */
    _shareChanged() {
        if (!this.share) { return; }
        const attachment = this.share.attachment_url;
        if (attachment) {
            fetch(attachment)
                .then(r => r.text())
                .then((code) => {
                    this._code = code;
                    this._mdCode = `\`\`\`coffeescript\n${code}\n\`\`\``;
                });
        }
    }
    _computeCodeType(app) {
        if (app === 'make-light') {
            return 'Python';
        }
        return 'CoffeeScript';
    }
    /** EVENT HANDLERS* */
    /**
     * Set the property responsible for displaying and hiding the
     * display code element.
     */
    _hideCode() {
        this.set('displayCode', false);
        this.dispatchEvent(new CustomEvent('hide-code'));
    }
}

customElements.define('kwc-art-player', KwcArtPlayer);
