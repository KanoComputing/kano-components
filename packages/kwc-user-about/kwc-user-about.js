import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { button } from '@kano/styles/button.js';
import { medal, staffPick, followers } from '@kano/icons/ui.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/marked-element/marked-element.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { world } from './icons.js';
/**
 * `kwc-user-about`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class KwcUserAbout extends PolymerElement {
    static get template() {
        return html`
        ${button}
        <style>
            :host {
                display: block;
                margin: 0 auto;
                max-width: var(--content-width);
                font-family: var(--font-body);
            }
            .btn {
                font-size: 16.5px;
                letter-spacing: 0.037em;
            }
            :host * {
                box-sizing: border-box;
            }
            .content {
                @apply(--layout-horizontal);
                @apply(--layout-wrap);
                @apply(--layout-center);
                @apply(--layout-justified);
            }

            /*TODO: Use breakpoint variable*/
            @media all and (max-width: 680px) {
                .content {
                    @apply(--layout-around-justified);
                }
            }
            .loading {
                width: 100%;
                min-height: 30vh;
                text-align: center;
            }
            .spinner {
                margin-top: 150px;
            }
            .about-page {
                @apply(--layout-vertical);
                width: 100%;
                font-family: 'bariol', sans-serif;
                color: var(--color-chateau, #414a51);
            }
            .about-page .section {
                width: 100%;

                @apply(--layout-vertical);
                @apply(--layout-center);

                margin-bottom: 20px;
            }
            .about-page .bio-text {
                font-size: 18px;
                text-align: center;
                width: 100%;
            }
            .about-page .bio-text pre {
                text-align: left;
            }
            .edit-button {
                margin-bottom: 32px;
                background-color: #9FA4A8;
                transition: background-color 0.1s ease;
            }
            .edit-button:hover {
                background-color: #414A51;
            }
            .save-button {
                margin-top: 20px;
                background-color: var(--color-kano-orange, #ff6900);
            }
            .save-button:hover {
                background-color: #c95924;
            }
            .about-page h2 {
                margin-top: 0;
                margin-left: auto;
                margin-right: auto;
            }
            .about-page .backdrop {
                @apply(--layout-self-stretch);
            }
            .stats {
                padding: 0 25px;
                justify-content: space-around;
            }
            .stats-tile {
                background: #fff;
                border-radius: 6px;
                @apply(--layout-self-stretch);
                @apply(--layout-vertical);
                padding: 25px 0 15px 0;
            }
            .stats-content {
                @apply(--layout-horizontal);
                @apply(--layout-center-justified);
                @apply(--layout-center);
                margin-bottom: 10px;
            }
            .stats-content .icon {
                margin-right: 5px;
                width: 24px;
                height: 24px;
            }
            .stats-content .value {
                line-height: 30px;
                font-size: 30px;
                font-weight: bold;
            }
            .stats-label {
                text-align: center;
                font-weight: bold;
                color: var(--color-grey, #9fa4a8);
                text-transform: uppercase;
                font-size: 14px;
            }
            .progress {
                padding: 0 25px;
                margin-bottom: 50px;
                display: flex;
                flex-wrap: wrap;
            }
            .progress-tile {
                background: #fff;
                border-radius: 9px;
                display: inline-flex;
                align-items: center;
                flex: 0 calc(50% - 26px);
                padding: 10px 15px 10px 10px;
                margin: 11px 13px;
            }
            .progress-tile .icon {
                width: 44px;
                height: 44px;
            }
            .progress-content {
                flex: 1;
                margin-left: 14px;
            }
            .progress-title {
                font-weight: bold;
                font-size: 18px;
            }
            .progress-bar {
                @apply(--layout-self-stretch);
                background: var(--color-porcelain, #e9ebec);
                height: 8px;
                border-radius: 9px;
                margin-top: 5px;
                overflow: hidden;
            }
            .progress-bar-gauge {
                background-color: red;
                width: 50%;
                height: 100%;
            }
            paper-textarea {
                width: calc(100% - 80px);
                border: 1px solid #a2a6aa;
                padding: 10px 20px;
                min-height: 100px;
                background: #FFF;
                border-radius: 6px;

                --paper-input-container-input: {
                    font-family: 'bariol', sans-serif;
                    color: var(--color-chateau, #414a51);
                    font-size: 18px;
                    line-height: 1.5;
                }

                outline: none;

                --paper-input-container-underline: {
                    display: none;
                };
                --paper-input-container-underline-focus: {
                    display: none;
                };
                --paper-input-container-underline-disabled: {
                    display: none;
                };
            }
            paper-textarea.focused {
                border: 1px solid var(--color-orange, #ff6a00);
            }
            h2.margin {
                margin-bottom: 9px;
            }
            .edit-bio-container {
                width: calc(100% - 80px);
                text-align: center;
                background: #FFF;
                border-radius: 6px;
            }
            [hidden] {
                display: none !important;
            }
            @media all and (max-width: 680px) {
                .stats {
                    @apply(--layout-vertical);
                }
                .stats-tile {
                    @apply(--layout-self-stretch);
                    margin: 10px 15px;
                }
                .progress-tile {
                    width: 100%;
                }
            }
            @media all and (min-width: 681px) {
                .stats {
                    @apply(--layout-horizontal);
                }
                .stats-tile {
                    width: 172px;
                }
            }
        </style>

        <div class="content">
            <template is="dom-if" if="[[loading]]">
                <div class="loading">
                    <paper-spinner-lite class="spinner" active=""></paper-spinner-lite>
                </div>
            </template>
            <template is="dom-if" if="[[!loading]]">
                <div class="about-page">
                    <div class="section" hidden$="[[_computeBioVisibility(allowEditBio, bio)]]">
                        <h2 class="margin">Bio</h2>
                        <template is="dom-if" if="[[!editing]]">
                            <div class="edit-bio-container">
                                <marked-element class="bio-text" markdown="[[_getBioText(bio)]]">
                                    <div slot="markdown-html"></div>
                                </marked-element>
                                <button class="btn tertiary edit-button" on-click="_editTapped" hidden\$="[[!allowEditBio]]">Edit</button>
                            </div>
                        </template>
                        <template is="dom-if" if="[[editing]]">
                            <paper-textarea id="bio-input" value="[[bio]]" placeholder="Write up your bio..." no-label-float="" focused="{{inputFocused}}" class\$="[[_getInputClass(inputFocused)]]"></paper-textarea>
                            <button class="btn save-button" on-click="_saveTapped">Save</button>
                        </template>
                    </div>

                    <div class="section">
                        <h2>Stats</h2>
                        <div class="backdrop stats">
                            <template is="dom-repeat" items="[[_stats]]">
                                <div class="stats-tile">
                                    <div class="stats-content">
                                        <div class="icon" inner-h-t-m-l="[[item.icon]]" style$="fill: [[item.color]];"></div>
                                        <div class="value">[[_getStatValue(item.id, stats.*)]]</div>
                                    </div>
                                    <div class="stats-label">[[item.label]]</div>
                                </div>
                            </template>
                        </div>
                    </div>

                    <div class="section">
                        <h2 class="margin">Progress</h2>
                        <div class="backdrop progress">
                            <template is="dom-repeat" items="[[_progress]]">
                                <div class="progress-tile">
                                    <iron-icon src="[[item.icon]]"></iron-icon>
                                    <div class="progress-content">
                                        <div class="progress-title">[[item.label]]</div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-gauge" style\$="background-color: [[item.color]]; width: [[_getProgressValue(item.id, progress)]]%;"></div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </template>
        </div>
`;
    }
    static get is() { return 'kwc-user-about'; }
    static get properties() {
        return {
            /**
             * Flags if there is an ongoing request for shares data.
             * @type {Boolean}
             */
            loading: {
                type: Boolean,
                observer: 'observeFetching',
                value: false,
            },
            bio: {
                type: String,
                value: null,
            },
            _stats: {
                type: Array,
                value: KwcUserAbout._computeStats(),
            },
            stats: {
                type: Object,
                value: () => ({}),
            },
            _progress: {
                type: Array,
                computed: '_computeProgressItems(assetsPath)',
            },
            progress: {
                type: Object,
                value: () => ({}),
            },
            allowEditBio: {
                type: Boolean,
                value: false,
            },
            editing: {
                type: Boolean,
                value: false,
            },
            assetsPath: {
                type: String,
            },
        };
    }
    static get observers() {
        return [
            '_autoEditBio(bio, allowEditBio)',
        ];
    }
    connectedCallback() {
        super.connectedCallback();

        /** Resize loading container when the window resizes */
        this.resizeLoading = this.resizeLoading.bind(this);
        window.addEventListener('resize', this.resizeLoading);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.resizeLoading);
    }
    observeFetching() {
        this.resizeLoading();
    }
    /**
     * Recalculates the loading container to be the same size as the
     * wrapper content so when changing pages there is as little
     * jumping as possible. Also recalculates the position for
     * loading spinner
     */
    resizeLoading() {
        const content = dom(this.root).querySelector('.content');
        const loading = dom(this.root).querySelector('.loading');
        const spinner = dom(this.root).querySelector('.spinner');

        if (content && loading) {
            const currentHeight = content.offsetHeight;
            loading.style.height = `${currentHeight}px`;

            /**
             * Make sure the spinner will be always at least 150
             * pixels from the top
             */
            let spinnerOffset = Math.max(window.pageYOffset, 150);
            /**
             * Make sure the spinner will always be at least 150
             * pixels away from the bottom
             */
            spinnerOffset = Math.min(spinnerOffset, currentHeight - 150);
            spinner.style.marginTop = `${spinnerOffset}px`;
        }
    }
    _getAsset(path) {
        return `${this.assetsPath}${path}`;
    }
    static _computeStats() {
        const medals = {
            id: 'medals',
            icon: medal.innerHTML,
            color: '#ff6a00',
            label: 'medals',
        };
        const followersStat = {
            id: 'followers',
            icon: followers.innerHTML,
            color: '#87c53f',
            label: 'followers',
        };
        const picks = {
            id: 'picks',
            icon: staffPick.innerHTML,
            color: '#ffc100',
            label: 'staff picks',
        };
        const shares = {
            id: 'shares',
            icon: world.innerHTML,
            color: '#1093f5',
            label: 'shares',
        };

        return [medals, followersStat, picks, shares];
    }
    _getStatValue(id) {
        return this.stats[id] || '-';
    }
    _editTapped() {
        this.editing = true;
    }
    _saveTapped() {
        this.editing = false;
        const bio = this.shadowRoot.querySelector('#bio-input').value;
        this.bio = bio;
        this.dispatchEvent(new CustomEvent('bio-changed', { detail: { value: bio }, bubbles: true }));
    }
    _computeProgressItems() {
        return [
            {
                id: 'kanoCode',
                icon: this._getAsset('kano-code.svg'),
                color: '#ffc100',
                label: 'Kano Code',
            },
            {
                id: 'pixelKit',
                icon: this._getAsset('pixel-kit.svg'),
                color: '#fe8412',
                label: 'Pixel Kit',
            },
            {
                id: 'motionSensor',
                icon: this._getAsset('motion-sensor.svg'),
                color: '#eb4734',
                label: 'Motion Sensor',
            },
            {
                id: 'makeArt',
                icon: this._getAsset('make-art.svg'),
                color: '#fe8412',
                label: 'Make Art',
            },
            {
                id: 'makeSnake',
                icon: this._getAsset('make-snake.svg'),
                color: '#e85c5a',
                label: 'Make Snake',
            },
            {
                id: 'makeMinecraft',
                icon: this._getAsset('hack-minecraft.svg'),
                color: '#89cb41',
                label: 'Hack Minecraft',
            },
            {
                id: 'terminalQuest',
                icon: this._getAsset('terminal-quest.svg'),
                color: '#bc1450',
                label: 'Terminal Quest',
            },
            {
                id: 'makePong',
                icon: this._getAsset('make-pong.svg'),
                color: '#878787',
                label: 'Make Pong',
            },
        ];
    }
    _getProgressValue(id) {
        return this.progress[id] || 0;
    }
    _getInputClass(focused) {
        return focused ? 'focused' : '';
    }
    _getBioText(bio) {
        if (!bio || bio === '') {
            return 'User has no bio.';
        }

        return bio;
    }
    _autoEditBio(bio, allowEditBio) {
        /* If the user's bio is empty, open the editor by default. */
        if (bio === '' && allowEditBio) {
            this.editing = true;
        }
    }
    _computeBioVisibility(allowEditBio, bio) {
        if (!allowEditBio && !bio) {
            return true;
        }
        return false;
    }
}

window.customElements.define(KwcUserAbout.is, KwcUserAbout);
