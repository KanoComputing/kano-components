/**
`kwc-share-cover`

Renders an appropriate cover for any share.

@demo demo/index-cover.html
*/

import '@polymer/iron-image/iron-image.js';
import '@kano/kwc-lightboard-preview/kwc-lightboard-preview.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class KwcShareCover extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                overflow: hidden;
            }
            .share-card-cover {
                width: 100%;
                height: 100%;
            }
            .share-cover-spritesheet,
            .share-cover-image {
                display: block;
                width: 100%;
            }
            .share-cover-image {
                @apply --kwc-share-cover-image;
                flex: 1;
                width: 100%;
                height: 100%;
                --iron-image-placeholder: {
                    background: var(--kwc-share-cover-placeholder, lightgrey);
                };
            }
            .share-cover-spritesheet {
                @apply --kwc-share-cover-spritesheet;
            }
        </style>
        <div class="share-card-cover" slot="cover">
            <template is="dom-if" if="[[spritesheetUrl]]">
                <kwc-lightboard-preview class="share-cover-spritesheet" src="[[spritesheetUrl]]">
                </kwc-lightboard-preview>
            </template>
            <template is="dom-if" if="[[!spritesheetUrl]]">
                <iron-image preload="" fade="" class="share-cover-image" src="[[_imageUrl]]" sizing="[[sizing]]" on-error-changed="imageError">
                </iron-image>
            </template>
        </div>
`;
    }
    static get properties() {
        return {
            /**
             * URL of a static cover image.
             *
             * @type {String}
             */
            imageUrl: {
                type: String,
                value: null,
                observer: '_imageUrlChanged'
            },
            /**
             * URL of a lightboard spritesheet.
             * Takes precedence over `imageUrl`.
             *
             * @type {String}
             */
            spritesheetUrl: {
                type: String,
                value: null,
            },
            sizing: {
                type: String,
                value: 'contain',
            },
            fallbackUrl: {
                type: String,
                value: null,
            }
        };
    }
    _imageUrlChanged(image) {
        this.set('_imageUrl', image)
    }
    imageError(_, par) {
        const imageError = par.value;
        const fallback = this.fallback;

        if (imageError && fallback !== null) {
            this.set('_imageUrl', this.fallbackUrl);
        }
    }
}

customElements.define('kwc-share-cover', KwcShareCover);
