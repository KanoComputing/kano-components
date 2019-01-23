import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';

/**
`kwc-player`
Default share player.
Custom property | Description | Default
----------------|-------------|----------
`--kwc-player-height` | Height for the element | `300px`

@group Kano Web Components
@demo demo/index-share.html
*/
class KwcPlayer extends PolymerElement {
    static get properties() {
        return {
            share: Object,
        };
    }
    static get template() {
        return html`
        <style>
            :host {
                height: var(--kwc-player-height, 300px);
                width: var(--kwc-player-height, 300px);
            }
            iron-image {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
                width: 100%;
            }
        </style>
        <iron-image src="[[share.cover_url]]" sizing="contain" preload fade></iron-image>
        `;
    }
}

customElements.define('kwc-player', KwcPlayer);
