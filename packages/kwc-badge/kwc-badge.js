/**
`kwc-badge`
A small atomic badge display for Kano badges.

Custom property | Description | Default
----------------|-------------|----------
`--kwc-badge-size` | The width and height of the badge | `100px`

@group Kano Web Components
@demo demo/index.html
*/

import '@polymer/iron-image/iron-image.js';
import '@kano/kwc-paper-tooltip/kwc-paper-tooltip.js';
import '@kano/styles/color.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class KwcBadge extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                --paper-tooltip-background: var(--color-abbey);
                --paper-tooltip-opacity: 1;
                --paper-tooltip-text-color: var(--color-white);
                --paper-tooltip: {
                    border-radius: 3px;
                    font-family: var(--font-body);
                    line-height: 24px;
                    padding: 16px 24px;
                    width: 200px;
                };
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                justify-content: center;
            }
            :host iron-image {
                height: var(--kwc-badge-size, 100px);
                width: var(--kwc-badge-size, 100px);
                -webkit-filter: grayscale(100%);
                filter: grayscale(100%);
            }
            :host([unlocked]) iron-image {
                -webkit-filter: grayscale(0%);
                filter: grayscale(0%);
            }
            :host .triangle {
                border-left: 16px solid transparent;
                border-right: 16px solid transparent;
                border-bottom: 16px solid var(--color-abbey);
                height: 0;
                left: 0;
                margin: auto;
                position: absolute;
                right: 0;
                top: -8px;
                width: 0;
            }
            :host kwc-paper-tooltip h3 {
                font-size: 18px;
                margin: 0px 0px 10px 0px;
            }
            :host kwc-paper-tooltip p {
                font-size: 16px;
                margin: 0px 0px 5px 0px;
            }
            :host *[hidden] {
                display: none;
            }

            /*
            XXX: Hide fullscreen button on mobile screens while the
            functionality until a full responsive solution is in place.
            \`768px\` is the current media query value for \`kwc-masthead\`.
            */
            @media (max-width: 768px) {
                kwc-paper-tooltip {
                    display: none;
                }
            }
        </style>
        <iron-image id="badge" alt="[[title]]" sizing="contain" src="[[imageUrl]]"></iron-image>
        <template is="dom-if" if="[[tooltip]]">
            <kwc-paper-tooltip for="badge" animation-delay="0" margin-top="20" position="bottom" fit-to-visible-bounds="">
                <div class="triangle"></div>
                <h3>[[title]]</h3>
                <p hidden$="[[_displayDescription]]">[[criteria]]</p>
                <p hidden$="[[!_displayDescription]]">[[description]]</p>
            </kwc-paper-tooltip>
        </template>
`;
    }
    static get properties() {
        return {
            /** The criteria that users much meet to unlock the badge */
            criteria: {
                type: String,
            },
            /**
           * Boolean to indicate whether the user viewing the badge
           * is the one that has earned the badge
           */
            currentUser: {
                type: Boolean,
                value: false,
            },
            /** The badge description to show to the current user */
            description: {
                type: String,
            },
            /**
           * Boolean to indicate whether the desription or the criteria
           * should be shown. The criteria should be shown if the badge is
           * locked, or if the user that has earned the badge and the
           * user currently viewing the badge are different. If the badge
           * has been earned by the current user, then the description
           * should be shown.
           */
            _displayDescription: {
                type: Boolean,
                computed: '_unlockedByUser(currentUser, unlocked)',
            },
            /** The URL of the badge image */
            imageUrl: {
                type: String,
            },
            /** The title of the badge */
            title: {
                type: String,
            },
            /**
           * Boolean to indicate whether the tooltip should
           * be shown on mouseover
           */
            tooltip: {
                type: Boolean,
                value: true,
            },
            /**
           * Boolean to indicate whether the user has
           * unlocked the badge
           */
            unlocked: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
        };
    }
    _unlockedByUser(currentUser, unlocked) {
        return currentUser && unlocked;
    }
}

customElements.define('kwc-badge', KwcBadge);
