import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/iron-image/iron-image.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { timeSince } from './timeago.js';

/**
`kwc-share-card`
Display a creation made with Kano Code.

@demo demo/index-card.html
*/
class KwcShareCard extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
            }
            :host *[hidden] {
                display: none !important;
            }
            :host *[disabled] {
                cursor: auto;
                pointer-events: none;
            }
            .wrapper {
                display: block;
                width: 100%;
                font-family: var(--font-body);
            }
            .cover {
                position: relative;
                margin-bottom: 14px;
                width: 100%;
            }
            .cover .avatar {
                position: absolute;
                bottom: -10px;
                left: 16px;
                height: 40px;
                width: 40px;
                border: 4px solid white;
                cursor: pointer;
                background: #5A6675;
                border-radius: 50%;
                transition: transform 350ms ease-in-out;
                will-change: transform;
            }
            .spinner {
                position: absolute;
                bottom: -10px;
                left: 16px;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                border: 4px solid white;
                cursor: pointer;
                background: white;
            }
            .title,
            .username {
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100%;
            }
            .username .username-text,
            .title .title-text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .title {
                font-size: 24px;
                line-height: 26px;
                margin-bottom: 8px;
                font-weight: bold;
                display: flex;
                flex-direction: row;
            }
            .title .title-text {
                margin-right: auto;
            }
            .title .title-icon {
                display: flex;
                align-items: flex-end;
            }
            .username {
                font-size: 16px;
                line-height: 18px;
                margin-bottom: 14px;
                color: var(--color-grey);
            }
            .username-text {
                color: var(--color-grey);
                font-weight: bold;
                padding-right: 5px;
            }
            .username-text:hover {
                color: var(--color-kano-orange);
            }
            iron-image {
                width: 100%;
                height: 100%;
            }
            #actions {
                display: flex;
                flex-direction: row;
            }
            #actions ::slotted(kwc-share-action) {
                margin-right: 8px;
            }
            #moderation {
                height: 100px;
            }
            a {
                text-decoration: none;
                color: black;
            }
        </style>

        <div class="wrapper">
            <div class="cover">
                <slot name="cover"></slot>
                <paper-spinner class="spinner" active hidden$="[[!uploadingAvatar]]"></paper-spinner>
                <a class="avatar" on-click="_onTapAvatar" href$="[[avatarHref]]">
                    <iron-image src$="[[_avatar]]" sizing="contain" hidden$="[[uploadingAvatar]]" disabled$="[[avatarDisabled]]"></iron-image>
                </a>
            </div>
            <template is="dom-if" if="[[!moderationPending]]">
                <a class="title" on-click="_onTapTitle" href$="[[titleHref]]">
                    <div class="title-text">[[title]]</div>
                    <!-- If you want to mark this post with an icon (for example animation)
                    you can slot it into this \`title-icon\` slot -->
                    <div class="title-icon"><slot name="title-icon"></slot></div>
                </a>
                <a class="username" on-click="_onTapUsername" href$="[[usernameHref]]">
                    [[_(byLabel, 'by')]] <span class="username-text"> [[username]]</span>[[_(prefixAgo, '')]] [[_timeSince(date, timeAgoLocales)]] [[_(suffixAgo, 'ago')]]
                </a>
                <div id="actions">
                    <slot name="actions"></slot>
                </div>
                <template is="dom-if" if="[[!moderationFailed]]">
                    <div id="details">
                        <slot name="details"></slot>
                    </div>
                </template>
            </template>
            <template is="dom-if" if="[[moderationPending]]">
                <div id="moderation">
                    <slot name="moderation"></slot>
                </div>
            </template>
        </div>
`;
    }
    static get properties() {
        return {
            user: {
                type: Object,
            },
            username: {
                type: String,
            },
            title: {
                type: String,
            },
            date: {
                type: String,
            },
            avatar: {
                type: Object,
            },
            uploadingAvatar: {
                type: Boolean,
            },
            /**
             * Image to fallback in case user doesn't have an avatar.
             * @type {String}
             */
            defaultAvatar: {
                type: String,
            },
            /**
             * Computed source (`src`) data for the avatar to be displayed.
             * @type {String}
             */
            _avatar: {
                type: String,
                computed: '_computeAvatar(avatar.urls.world, avatar.urls.circle, user.*)',
            },
            avatarDisabled: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true,
            },
            moderationPending: {
                type: Boolean,
                value: false,
            },
            titleHref: String,
            usernameHref: String,
            avatarHref: String,
            byLabel: String,
            prefixAgo: String,
            suffixAgo: String,
            timeAgoLocales: Object,
        };
    }
    _(v, fallback) {
        return typeof v === 'undefined' ? fallback : v;
    }
    /**
     * Computes which avatar source (`src`) to be used. If user has
     * an avatar use it, otherwise fallback to the `defaultAvatar`.
     * @param {String} avatar Share's creator avatar.
     * @return {String}
     */
    _computeAvatar(worldAvatar, circleAvatar, user) {
        if (worldAvatar) {
            return worldAvatar;
        } if (user.base && this.username === user.base.username) {
            return user.base.avatar;
        } if (circleAvatar) {
            return circleAvatar;
        }
        return this.defaultAvatar;
    }
    /**
     * Fired when avatar is tapped
     *
     * @event avatar-tapped
     * @param {Object} user User who created the tapped avatar.
     */
    /**
     * Handles tap event on the avatar and fires `avatar-tapped`
     */
    _onTapAvatar() {
        this.dispatchEvent(new CustomEvent('avatar-tapped', { bubbles: true, composed: true }));
    }
    /**
     * Handles tap event on the avatar and fires `avatar-tapped`
     */
    _onTapUsername() {
        this.dispatchEvent(new CustomEvent('username-tapped', { bubbles: true, composed: true }));
    }
    /**
     * Fired when share title is tapped
     *
     * @event title-tapped
     */
    /**
     * Handles tap event on the title and fires `title-tapped`
     */
    _onTapTitle() {
        this.dispatchEvent(new CustomEvent('title-tapped', { bubbles: true, composed: true }));
    }
    /**
    * Computes the day/time a share was created
    */
    _timeSince(date, locales) {
        return timeSince(date, locales);
    }
}

customElements.define('kwc-share-card', KwcShareCard);
