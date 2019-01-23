/**
`kwc-badge-listing`
An element to display a list of Kano badges

Custom property | Description | Default
----------------|-------------|----------
`--kwc-badge-listing-gutter` | The width of the margin around badges | `25px`


@demo demo/index.html
*/
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@kano/kwc-badge/kwc-badge.js';
import '@kano/styles/color.js';
import '@kano/styles/typography.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class KwcBadgeListing extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                --paper-spinner-color: var(--color-kano-orange);
                --kwc-badge-margin: 30px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
                font-family: var(--font-body);
                min-height: 100px;
                position: relative;
            }
            :host .loader {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                margin: auto;
            }
            :host .loader-label {
                color: var(--color-abbey);
                font-size: 24px;
                font-weight: bold;
                padding-bottom: 24px;
                text-align: center;
            }
            :host paper-spinner-lite {
                display: block;
                margin: auto;
            }
            :host kwc-badge {
                margin: var(--kwc-badge-listing-gutter, 25px);
            }
        </style>
        <template is="dom-if" if="[[!badges.length]]">
            <div class="loader">
                <div class="loader-label">
                    Loading...
                </div>
                <paper-spinner-lite active="[[!badges.length]]">
                </paper-spinner-lite>
            </div>
        </template>
        <template is="dom-repeat" items="[[badges]]" as="badge">
            <kwc-badge title="[[badge.title]]" criteria="[[badge.criteria]]" current-user="[[currentUser]]" description="[[badge.description]]" image-url="[[badge.imageUrl]]" unlocked="[[badge.unlocked]]">
                       </kwc-badge>
        </template>
`;
    }
    static get properties() {
        return {
            /** Array of badges to be displayed */
            badges: {
                type: Array,
                value: function () {
                    return [];
                }
            },
            /**
             * Boolean to indicate whether the user viewing the badges
             * is the one that has earned them
             */
            currentUser: {
                type: Boolean,
                value: false
            }
        };
    }
}

customElements.define('kwc-badge-listing', KwcBadgeListing);
