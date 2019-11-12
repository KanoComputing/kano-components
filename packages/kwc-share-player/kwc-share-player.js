import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

const appMapping = {
    'make-music': 'music',
    'make-light': 'art',
    'kano-draw': 'art',
    'make-apps': 'app',
    lightboard: 'app',
};
const loadedImports = {};

class KwcSharePlayer extends PolymerElement {
    static get template() {
        return html`
        <style>
            kwc-app-player,
            kwc-art-player {
                animation: fade-in 200ms linear;
            }
        </style>
        <template is="dom-if" if="[[_usePlayer('app', _player)]]" restamp>
            <kwc-app-player share="[[share]]" display-code="[[displayCode]]" on-hide-code="_hideCode">
                <slot slot="hardware" name="hardware-list"></slot>
            </kwc-app-player>
        </template>
        <template is="dom-if" if="[[_usePlayer('art', _player)]]" restamp>
            <kwc-art-player share="[[share]]" display-code="[[displayCode]]"></kwc-art-player>
        </template>
        <template is="dom-if" if="[[_usePlayer('music', _player)]]" restamp>
            <kwc-music-player share="[[share]]"></kwc-music-player>
        </template>
        <template is="dom-if" if="[[_usePlayer('default', _player)]]" restamp>
            <kwc-player share="[[share]]"></kwc-player>
        </template>
    `;
    }
    static get properties() {
        return {
            /**
             * Flag to indicate to the player whether the show code display element
             * or not.
             * @type {Boolean}
             */
            displayCode: {
                type: Boolean,
                value: false,
                notify: true,
            },
            /**
             * The current share to be played.
             * @type {Object}
             */
            share: {
                type: Object,
                value: () => ({}),
            },
            /**
             * String to select which player to use for a given share.
             * @type {String}
             */
            _player: {
                type: String,
                value: '',
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
     * The share data is used to set the _player property which selects
     * which player to use. It will import the player if not imported
     * previously and then trigger a change in the iron pages.
     * @param {Object} share Current share data
     */
    _shareChanged(shareChange) {
        const share = shareChange.base;

        if (!share || !Object.keys(share).length) {
            return;
        }
        const player = appMapping[share.app] || 'default';

        if (loadedImports[player]) {
            this.set('_player', player);
        } else {
            this.lazyImport(player).then(() => {
                loadedImports[player] = true;
                this.set('_player', player);
            });
        }
    }
    lazyImport(id) {
        // Switch to make sure bundler resolve the import
        switch (id) {
        case 'app': {
            return import('./kwc-app-player.js');
        }
        case 'art': {
            return import('./kwc-art-player.js');
        }
        case 'music': {
            return import('./kwc-music-player.js');
        }
        default: {
            return import('./kwc-player.js');
        }
        }
    }
    /**
     * Boolean to indicate iron pages which page to display.
     * @param {String} key from iton page
     * @param {String} player selected for current page
     * @return {Boolean} do the key and player match?
     */
    _usePlayer(key, player) {
        return key === player;
    }
    /** EVENT HANDLERS* */
    /**
    * Set the property responsible for displaying and hiding the
    * display code element.
    *
    * @event hide-code
    */
    _hideCode(e) {
        this.displayCode = false;
        this.dispatchEvent(new CustomEvent('hide-code', { detail: e.detail }));
    }
}


customElements.define('kwc-share-player', KwcSharePlayer);
