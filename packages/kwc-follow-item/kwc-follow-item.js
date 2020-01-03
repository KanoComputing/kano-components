import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@kano/styles/color.js';
import '@kano/styles/typography.js';
import '@polymer/iron-image/iron-image.js';
import { follow, followed } from './icons.js';

class KwcFollowItem extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: inline-flex;
                background-color: #ffffff;
                padding: 1px 17px;
                border-radius: 8px;
                width: calc(100% - 34px);
                margin: 8.5px 0;
                font-family: var(--font-body);
            }
            .user {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;
                width: 100%;
                margin: 16px 0;
            }
            .avatar-wrapper {
                align-self: flex-start;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: var(--avatar-image-display, block);
            }
            .avatar {
                width: 100%;
                height: 100%;
            }
            .user-info {
                flex-grow: 3;
                font-weight: bold;
                padding-left: 16px;
                cursor: pointer;
            }
            .user-info .username {
                color: var(--color-black);
                font-size: 18px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .user-info .level {
                color: var(--color-grey);
                font-size: 16px;
                line-height: 18px;
            }
            .follow-button {
                cursor: pointer;
            }
            .follow-button .follow-icon-wrapper {
                width: 32px;
                height: 25px;
            }
            .follow-button .follow-icon-wrapper .followed-icon,
            .follow-button .follow-icon-wrapper .follow-icon {
                width: 100%;
                height: 100%;
            }
            .follow-button .follow-icon-wrapper .follow-icon {
                fill: var(--color-grey);
            }
            .follow-button .follow-icon-wrapper .follow-icon:hover {
                fill: var(--color-grassland);
            }
            .follow-button .follow-icon-wrapper .followed-icon:hover {
                opacity: 0.8;
            }
        </style>
        <div class="user">
            <div class="avatar-wrapper" on-click="_onTapUser">
                <iron-image sizing="contain" class="avatar" src="[[avatar]]"></iron-image>
            </div>
            <div class="user-info" on-tap="_onTapUser">
                <div class="username">
                    [[username]]
                </div>
                <div class="level">
                    [[_(levelLabel, 'Level')]] [[level]]
                </div>
            </div>
            <template is="dom-if" if="[[showIcon]]">
                <div class="follow-button">
                    <div class="follow-icon-wrapper">
                        <template is="dom-if" if="[[followed]]">
                            <div class="followed-icon" on-click="_onTapFollow">
                                ${followed}
                            </div>
                        </template>
                        <template is="dom-if" if="[[!followed]]">
                            <div class="follow-icon" on-click="_onTapFollow">
                                ${follow}
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>  
`;
    }
    static get is() { return 'kwc-follow-item'; }
    static get properties() {
        return {
            username: String,
            level: Number,
            avatar: String,
            followed: {
                type: Boolean,
                value: false,
            },
            levelLabel: String,
            showIcon: Boolean,
        };
    }
    constructor() {
        super();
        this.levelLabel = null;
    }
    _onTapFollow() {
        let eventName = 'follow';
        const eventData = { bubbles: false, detail: this.username };
        if (this.followed) {
            eventName = 'unfollow';
        }
        this.dispatchEvent(new CustomEvent(eventName, eventData));
    }
    _onTapUser() {
        this.dispatchEvent(new CustomEvent('tap-user', {
            bubbles: false,
            detail: this.username,
        }));
    }
    _(v, fallback) {
        return typeof v === 'undefined' || v === null ? fallback : v;
    }
}

customElements.define(KwcFollowItem.is, KwcFollowItem);

