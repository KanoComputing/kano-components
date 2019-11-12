import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/marked-element/marked-element.js';
import '@polymer/prism-element/prism-highlighter.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { close } from '@kano/icons/ui.js';
import { code } from '@kano/icons/social.js';

class KwcCodeDisplay extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                position: absolute;
                top:0;
                right: 0;
                left: 0;
                bottom: 0;
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-start-justified;
                background-color: rgba(50, 50, 50, 0.8);
                padding: 50px 16px 0 16px;
                width: 100%;
                z-index: 100;
            }
            .code {
                width: 100%;
                height: 100%;
            }

            .code-contents {
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-start-justified;
                height: 100%;
                margin: auto;
                max-width: 880px;
                width: 100%;
            }

            .code-header {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-justified;
                border-bottom: 1px solid var(--color-grey);
                color: white;
                padding-bottom: 16px;
                width: 100%;
                box-sizing: border-box;
            }

            .code-icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                fill: var(--color-azure);
                margin-right: 16px;
                vertical-align: -25%;
            }

            .code-title {
                margin: 0;
                text-transform: uppercase;
            }

            .close-button {
                -webkit-appearance: none;
                appearance: none;
                background-color: var(--color-grey);
                border: 0;
                border-radius: 3px;
                cursor: pointer;
                padding: 8px;
            }

            .close-button:focus {
                outline: 0;
            }

            .close-button-icon {
                color: white;
                height: 16px;
                width: 16px;
            }

            .code-main {
                @apply --layout-horizontal;
                @apply --layout-start;
                @apply --layout-justified;
                overflow-y: scroll;
                padding: 16px 0;
                width: 100%;
            }

            .line-numbers {
                @apply --layout-flex-1;
                color: white;
                font-family: monospace;
                font-size: 14px;
                line-height: 18px;
                opacity: 0.1;
                padding: 1em 16px 0 0;
                position: relative;
                text-align: center;
            }

            marked-element {
                @apply --layout-flex-12;
                font-size: 14px;
                line-height: 18px;
                width: 100%;
            }

            .markdown-html {
                color: white;
            }

            .markdown-html .token.number {
                color: var(--color-amber);
            }

            .markdown-html .token.function,
            .markdown-html .token.keyword {
                color: #d356cf;
            }

            .markdown-html .token.title {
                color: var(--color-kano-orange);
            }

            .markdown-html .token.string {
                color: var(--color-grassland);
            }

            .markdown-html .token.punctuation,
            .markdown-html .token.operator {
                color: white;
                background: transparent;
            }
        </style>
        <div class="code">
            <div class="code-contents">
                <div class="code-header">
                    <h3 class="code-title">
                        <div class="icon code-icon">${code}</div>
                        [[codeType]]
                    </h3>
                    <button type="button" class="close-button" on-tap="_hideCode">
                        <div class="icon close-button-icon">${close}</div>
                    </button>
                </div>
                <div class="code-main">
                    <div class="line-numbers">
                        <template is="dom-repeat" items="[[lines]]" as="line">
                            <div class="line-number">[[line]]</div>
                        </template>
                    </div>
                    <prism-highlighter></prism-highlighter>
                    <marked-element id="code" markdown="[[code]]">
                        <div slot="markdown-html" class="markdown-html"></div>
                    </marked-element>
                </div>
            </div>
        </div>
        `;
    }
    static get properties() {
        return {
            /**
             * A list of numbers for use to enumerate the lines of code.
             * @type {Array}
             */
            lines: {
                type: Array,
                value: null,
            },
            /**
             * The code to display.
             * @type {String}
             */
            code: {
                type: String,
                value: null,
            },
            /**
             * A string to place in the header to indicate the code type.
             * @type {String}
             */
            codeType: {
                type: String,
                value: 'Code',
            },
        };
    }
    /**
     * @event hide-code
     */
    _hideCode() {
        this.dispatchEvent(new CustomEvent('hide-code'));
    }
}

customElements.define('kwc-code-display', KwcCodeDisplay);
