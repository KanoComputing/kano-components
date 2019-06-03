/* Import svg definition as data:uri */
/**
`kwc-share-detail`
To display details specific to a kano code share.

@demo demo/index.html
*/

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@kano/kwc-share-player/kwc-share-player.js';
import '@kano/kwc-share-card/kwc-share-cover.js';
import '@kano/kwc-drop-down/kwc-drop-down.js';
import '@kano/kwc-drop-down/kwc-drop-down-item.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ellipsis, like, remix } from '@kano/icons/ui.js';
import {
    facebook,
    twitter,
    share,
    code,
} from '@kano/icons/social.js';
import * as partIcons from '@kano/icons/parts.js';
import button from '@kano/styles/button.js';
import { assets } from './assets.js';

import './kwc-social-comments.js';

class KwcShareDetail extends PolymerElement {
    static get template() {
        return html`
        ${button}
        <style>
            @keyframes fade-in {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            :host {
                background-color: white;
                border-radius: 0 0 3px 3px;
                display: block;
                overflow: auto;
                font-family: var(--font-body);
                @apply --kw-share-detail;
            }
            :host * {
                box-sizing: border-box;
            }
            :host *[hidden] {
                display: none !important;
            }
            .share {
                @apply --layout-vertical;
                @apply --layout-center;
                display: flex;
                width: 100%;
            }
            .content-prefix {
                background: var(--kw-share-detail-share-background, var(--color-chateau));
                width: 100%;
            }
            .share-content {
                background: var(--kw-share-detail-share-background, var(--color-chateau));
                width: 100%;
                box-sizing: border-box;
                position: relative;
            }
            .share-content .loading {
                color: white;
                transition: opacity 200ms linear;
            }
            :host(.loaded) .share-content .loading {
                opacity: 0;
            }
            #share-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                animation: fade-in 200ms linear;
                z-index: 10;
            }
            .share-content .content {
                min-height: var(--kw-share-detail-player-height, 480px);
                height: var(--kw-share-detail-player-height, 480px);
                position: relative;
            }
            #share-container,
            .share-content .loading,
            .share-content .content .featured,
            .share-content .loading .overlay {
                @apply --layout-fit;
            }
            .share-content .loading .overlay {
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            .share-content .content,
            kwc-share-player {
                background-color: transparent;
                height: 100%;
                margin: 0 auto;
                max-width: 800px;
                width: 100%;
            }
            .share-content .content .featured {
                padding: 0 8px;
                z-index: 20;
            }
            .featured {
                background-color: transparent;
                margin: 0;
            }
            kwc-share-player {
                --kwc-share-player-height: 480px;
                position: relative;
            }
            @media all and (max-width: 680px) {
                .share-content .content .featured,
                #share-container>* {
                    max-height: calc(100% - 60px);
                    padding: 0 20px;
                }
            }
            @media all and (min-width: 681px) {
                .share-content .content .featured,
                #share-container>* {
                    max-height: calc(100% - 50px);
                }
            }
            .share-detail {
                max-width: var(--content-width);
                position: relative;
                width: 100%;
                z-index: 0;
            }
            .header {
                @apply --layout-horizontal;
            }
            .avatar-wrapper {
                flex: none;
                overflow: hidden;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                position: relative;
                margin: 0 20px;
            }
            .avatar {
                border-radius: 50%;
                cursor: pointer;
                height: 48px;
                overflow: hidden;
                width: 48px;
            }
            .detail {
                width: 100%;
            }
            .title {
                font-size: 24px;
                line-height: 28px;
                margin: 0;
                display: block;
                @apply --layout-horizontal;
            }
            .title .text {
                @apply --layout-flex-auto;
                color: #333;
            }
            .title .featured-icon {
                @apply --layout-end;
                height: 28px;
                width: 28px;
                margin-left: 6px;
            }
            .title ::slotted(.icon) {
                height: 28px;
                margin-top: -10px;
                width: 28px;
            }
            .attribution {
                font-weight: normal;
                margin: 0;
                color: #9FA4A8;
            }
            .author {
                cursor: pointer;
                font-weight: bold;
            }
            .description {
                color: var(--color-chateau);
                line-height: 20px;
                margin: 0;
            }
            .description:not(:empty) {
                font-size: 16px;
                margin: 8px 0 0 0;
            }
            .social-section {
                border-top: 1px solid var(--color-porcelain);
            }
            kw-social-comment {
                width: 100%;
            }
            .actions {
                position: relative;
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout-wrap;
                margin-top: 5px;
            }
            .actions .btn.action {
                margin: 5px 0px;
                margin-right: 10px;
                position: relative;
            }
            .actions .btn.action:last-child {
                margin-right: 0px;
            }
            .actions .btn.action paper-spinner-lite {
                height: 18px;
                width: 18px;
                position: absolute;
                top: 9px;
                display: block;
                margin: auto;
            }
            .btn.action.like {
                --button-action-highlight: var(--color-carnation);
            }
            .btn.action.remix {
                --button-action-highlight: var(--color-kano-orange);
            }
            .btn.action.view-code {
                --button-action-highlight: var(--color-dodger-blue);
            }
            #more-actions-button {
                margin-left: auto;
            }
            #more-actions-button .ellipsis {
                width: 21px;
                height: 21px;
                overflow: hidden;
            }
            #more-actions-button .ellipsis svg {
                width: 30px;
                height: 30px;
                margin-top: -4px;
                margin-left: -4px;
                fill: var(--color-chateau);
            }
            #more-actions-menu {
                right: 0;
                transform: translate(-109px, 34px);
                margin-top:5px;
            }
            #more-actions-menu kwc-drop-down-item {
                min-width: 150px;
            }
            kwc-drop-down-item.feature {
                --kwc-drop-down-item-icon-hover-color: var(--color-kano-orange);
            }
            kwc-drop-down-item.delete {
                --kwc-drop-down-item-icon-hover-color: var(--color-dodger-blue);
            }
            kwc-drop-down-item.flag {
                --kwc-drop-down-item-icon-hover-color: var(--color-carnation);
            }
            kwc-drop-down-item.flagged {
                --kwc-drop-down-item-icon-color: var(--color-carnation);
            }
            .social-actions {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .social-action {
                box-sizing: border-box;
                margin-right: 16px;
            }
            .social-button {
                border: 0;
                border-radius: 3px;
                fill: white;
                cursor: pointer;
                padding: 8px;
                text-transform: uppercase;
                transition: 0.3s ease;
            }
            .social-button:focus {
                outline: 0;
            }
            .social-button.facebook {
                background-color: var(--color-facebook);
            }
            .social-button.twitter {
                background-color: var(--color-twitter);
            }
            .social-button.email {
                background-color: var(--color-kano-orange);
            }
            .social-button .action-icon {
                height: 16px;
                width: 16px;
            }
            .sidebar-section-header {
                font-weight: bold;
                margin-bottom: 10px
            }
            .parts-used-list {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout-wrap;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .parts-used-list a {
                margin-right: 6px;
                margin-bottom: 6px;
                padding: 5px 10px 5px 8px;
                border-radius: 5px;
                color: var(--color-chateau);
                background-color: #f6f7f9;
                text-decoration: none;
                @apply --layout-flex-none;
                @apply --layout-horizontal;
                @apply --layout-center-justified;
            }
            .parts-used-list a:hover {
                background-color: #e5e8eC;
            }
            .parts-used-list a.inactive:hover {
                background-color: #f6f7f9;
                cursor: not-allowed;
            }
            .parts-used-list .icon {
                fill: var(--color-grey);
                width: 24px;
                height: 24px;
                margin-right: 3px;
            }
            .parts-used-list .label {
                line-height: 24px;
            }
            .social,
            .related-shares,
            .parts-used-list {
                margin-bottom: 30px;
            }
            .stats {
                margin: 8px 0px 21px 0px;
                color: var(--color-grey);
                font-size: 13px;
            }
            .stats span {
                margin-right: 15px;
            }
            .related-shares-list {
                @apply --layout-horizontal;
                @apply --layout-wrap;
                margin-top: -5px;
                margin-left: -5px;
                margin-bottom: -5px;
                min-width: 250px;
            }
            .related-shares-cover {
                border: 1px solid var(--color-porcelain);
                width: 114px;
                height: 82px;
                margin: 5px;
                --kwc-share-cover-spritesheet: {
                    width: 160px;
                    transform: translateX(-40px);
                }
            }
            :host([tombstone]) .avatar,
            :host([tombstone]) .avatar-wrapper {
                background: var(--color-grey-lightest);
                color: transparent;
            }
            :host([tombstone]) .title {
                width: 200px;
                height: 22px;
                background: var(--color-grey-lightest);
                color: transparent;
            }
            :host([tombstone]) .attribution {
                position: relative;
                width: 100px;
                height: 16px;
                background: var(--color-grey-lightest);
                color: transparent;
                margin-top: 6px;
            }
            :host([tombstone]) .description {
                width: 100%;
                height: 36px;
                background: var(--color-grey-lightest);
                color: transparent;
                margin-top: 6px;
                margin-bottom: 12px;
            }
            :host([tombstone]) .supplementary-details,
            :host([tombstone]) #share-container,
            :host([tombstone]) .social {
                opacity: 0.3;
            }
            .no-margin {
                margin: 0;
            }
            @media all and (max-width: 780px) {
                .share-detail {
                    @apply --layout-vertical;
                    padding: 16px 16px;
                }
                .supplementary-details {
                    @apply --layout-vertical;
                    padding: 36px 0 0 0;
                }
                .supplementary-details .actions {
                    margin: 0 0 36px 0;
                }
            }
            @media all and (min-width: 581px) and (max-width: 780px) {
                .supplementary-details {
                    padding: 0 0 0 36px;
                }
                .actions,
                .social {
                    @apply --layout-flex-auto;
                }
                .supplementary-details > * {
                    margin-right: 18px;
                }
            }
            @media all and (min-width: 781px) {
                #share-container {
                    padding: 0 60px;
                }
                .share-detail {
                    @apply --layout-horizontal;
                    max-width: 888px;
                }
                .main-details {
                    @apply --layout-flex-8;
                    padding: 32px 44px 32px 8px;
                }
                .supplementary-details {
                    @apply --layout-flex-4;
                    color: var(--color-grey);
                    padding: 32px 40px 32px 44px;
                }
            }
        </style>
        <div id="share" class="share">
            <div class="content-prefix">
                <slot name="content::before"></slot>
            </div>
            <div class="share-content">
                <div class="loading">
                    <div class="overlay">
                        <paper-spinner-lite class="spinner" active></paper-spinner-lite>
                    </div>
                </div>
                <div class="content">
                    <div id="share-container">
                        <slot name="player::before"></slot>
                        <kwc-share-player share="[[shareData]]" display-code="[[displayCode]]">
                        </kwc-share-player>
                        <slot name="player::after"></slot>
                    </div>
                </div>
                <slot name="share-hardware"></slot>
            </div>
            <div class="content-suffix">
                <slot name="content::after"></slot>
            </div>
            <div class="share-detail">
                <div class="main-details">
                    <div class="header">
                        <div class="avatar-wrapper">
                            <iron-image class="avatar" src="[[_avatarUrl]]" sizing="cover" on-click="_onUserTapped" preload fade></iron-image>
                        </div>
                        <div class="detail">
                            <h3 class="title">
                                <slot name="title-icon"></slot>
                                <div class="text">[[shareData.title]]</div>
                                <iron-image class="featured-icon" src="[[_featuredIconUrl]]" sizing="contain" hidden$="[[!featured]]" alt="Staff pick" title="Staff pick" preload fade>
                                </iron-image>
                            </h3>
                            <h4 class="attribution">[[_(byLabel, 'by')]]
                                <a class="author" on-click="_onUserTapped">[[shareData.username]]</a>
                            </h4>
                            <p class="description">[[shareData.description]]</p>
                            <div class="actions">
                            <template is="dom-if" if="[[!_sharedByUser]]">
                                <button class$="btn action like [[_computeClass(liked, 'active')]]" on-click="_onLikeTapped">
                                    ${like}
                                    <div>[[_computedLikeButtonText(liked)]]</div>
                                    <paper-spinner-lite active="[[submitingLike]]"></paper-spinner-lite>
                                </button>
                            </template>
                            <template is="dom-if" if="[[_showRemixButton(shareData, canRemix)]]">
                                <button class="btn action remix" on-click="_onRemixTapped">${remix}<div>[[_(remixLabel, 'Remix')]]</div></button>
                            </template>
                            <template is="dom-if" if="[[_showCodeButton(shareData)]]">
                                <button class="btn action view-code" on-click="_toggleCodeView">${code}<div>[[_(viewCodeLabel, 'View&nbsp;code')]]</div></button>
                            </template>
                            <button class$="btn action [[_computeClass(dropDownOpened, 'active')]]" id="more-actions-button" on-click="_onMoreActionsTapped">
                                <div class="ellipsis">
                                    <div class="icon">${ellipsis}</div>
                                </div>
                            </button>
                            <kwc-drop-down id="more-actions-menu" caret-position="center" opened="{{dropDownOpened}}">
                                <template is="dom-if" if="[[_showFeaturedButton(shareData, currentUser.admin_level)]]">
                                    <kwc-drop-down-item class="feature" icon="kwc-ui-icons:rosette" on-click="_onFeatureTapped">[[_computeFeatureButtonText(featured)]]</kwc-drop-down-item>
                                </template>
                                <template is="dom-if" if="[[_displayMetaActions]]">
                                    <kwc-drop-down-item class="delete" icon="kwc-ui-icons:rubbish-bin" on-click="_onDeleteTapped">[[_(deleteLabel, 'Delete')]]</kwc-drop-down-item>
                                </template>
                                <kwc-drop-down-item id="drop-down-flag" class$="flag no-margin [[_computeFlagStatus(flags.*)]]" icon="kwc-social-icons:flag" on-click="_onFlagTapped"></kwc-drop-down-item>
                            </kwc-drop-down>
                        </div>
                        <div class="stats">
                            <span hidden$="[[!likes.length]]">[[likes.length]] [[_(likeCountLabel, 'Likes')]]</span>
                            <span hidden$="[[!comments.count]]">[[comments.count]] [[_(commentCountLabel, 'Comments')]]</span>
                            <span hidden$="[[!shareData.views_count]]">[[shareData.views_count]] [[_(viewsCountLabel, 'Views')]]</span>
                        </div>
                    </div>
                </div>
                <div class="social">
                    <!-- Set up with support for showing lists of
                                likes and remixes in future, when the API support
                                is available -->
                    <iron-pages id="social-sections" selected="[[_section]]" attr-for-selected="section-name" fallback-selection="comments">
                        <div section-name="comments" class="social-section">
                            <kwc-social-comments id="comments" comments="[[comments.entries]]" default-avatar="[[_defaultCommentAvatarUrl]]" next-page="[[comments.page]]" item-id="[[shareData.id]]" tombstone$="[[!shareData]]" user="[[currentUser]]" loader-status="[[commentLoaderStatus]]" comment-flags="[[commentFlags]]" on-delete-comment="_handleDeleteComment" on-load-comment="_handleLoadComment" on-post-comment="_handlePostComment" on-flag-comment="_handleFlagComment" on-unflag-comment="_handleUnflagComment" on-view-user="_handleViewUser">
                                                    </kwc-social-comments>
                        </div>
                    </iron-pages>
                </div>
            </div>
            <div class="supplementary-details">
                <template is="dom-if" if="[[_showRelatedShares(related)]]">
                    <div class="related-shares">
                        <div class="sidebar-section-header">[[_(moreFromLabel, 'More from')]] [[shareData.username]]</div>
                        <div class="related-shares-list">
                            <template is="dom-repeat" items="[[related]]">
                                <a href="[[item.targetUrl]]">
                                    <kwc-share-cover class="related-shares-cover" image-url="[[item.imageUrl]]" spritesheet-url="[[item.spritesheetUrl]]">
                                    </kwc-share-cover>
                                </a>
                            </template>
                        </div>
                    </div>
                </template>
                <template is="dom-if" if="[[_wandHardwareUsed(shareData.hardware)]]">
                    <div class="parts-used">
                        <div class="sidebar-section-header">[[_(wandSpellLabel, 'Hold down the button on your wand to see the spell motions in this creation')]]</div>
                    </div>
                </template>
                <template is="dom-if" if="[[_anyHardwareUsed(shareData.hardware)]]">
                    <div class="parts-used">
                        <div class="sidebar-section-header">[[_(partsUsedLabel, 'Parts Used')]]</div>
                        <ul class="parts-used-list">
                            <template is="dom-repeat" items="[[shareData.hardware]]">
                                <li>
                                    <a href$="[[_getLinkForPartId(item.product)]]" class$="[[_computePartsLinkClass(item.product)]]">
                                        <div class="icon" id="part" inner-h-t-m-l="[[_getPartIcon(item.product)]]"></div>
                                        <div class="label">[[_getLabelForPartId(item.product)]]</div>
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </template>
                <div class="social" hidden$="[[hideSocial]]">
                    <div class="sidebar-section-header">[[_(shareLabel, 'Share')]]</div>
                    <ul class="social-actions">
                        <li class="social-action">
                            <button class="social-button facebook" on-click="_onFacebookTapped">
                                <div class="icon action-icon">${facebook}</div>
                            </button>
                        </li>
                        <li class="social-action">
                            <button class="social-button twitter" on-click="_onTwitterTapped">
                                <div class="icon action-icon">${twitter}</div>
                            </button>
                        </li>
                        <li class="social-action">
                            <button class="social-button email" on-click="_onEmailTapped">
                                <div class="icon action-icon">${share}</div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
`;
    }
    static get properties() {
        return {
            /**
               * The current share data to display.
               * @type {Object}
               */
            shareData: {
                type: Object,
            },
            /**
               * Flag to indicate whether the code display div should be shown.
               * @type {Boolean}
               */
            displayCode: {
                type: Boolean,
                value: false,
            },
            /**
               * Flag to indicate whether the code can be remixed.
               * Used to decide whether to displat the REMIX button
               * @type {Boolean}
               */
            canRemix: {
                type: Boolean,
                value: false,
            },
            /**
               * Flag to indicate that the current share attachment is loaded.
               * @type {Boolean}
               */
            loaded: {
                type: Boolean,
                value: false,
                notify: true,
            },
            /**
               * Computed property that gives a url for the avatar to show for the
               * share author.
               * @type {String}
               */
            _avatarUrl: {
                type: String,
                computed: '_computeAvatarUrl(shareData)',
            },
            /**
               * A comments object. Expects a property called `entries` that is to
               * be passed to the `kwc-social-comments` component and a count property of the
               * number of comments ojects in the `entries` array.
               * ```js
               * {
               *     "type": "object",
               *     "properties": {
               *         "entries": {
               *             "type": "object",
               *             "properties": // See https://components.kano.me/#/elements/kwc-social-comments
               *         },
               *         "count": {
               *             "type": "number"
               *         },
               *         "page": {
               *             "type": "number"
               *         }
               *     },
               *     "required" : ["entries", "count"]
               * }
               * ```
               * @type {Object}
               */
            comments: {
                type: Object,
                value: () => ({}),
            },
            /**
               * A computed flag (based on the comments.page property) to indicate
               * the social comments component whether there are more comments to load.
               * @type {Boolean}
               */
            commentLoaderStatus: {
                type: String,
                computed: '_computeLoaderStatus(comments.*)',
            },
            /**
               * Login in users flags on comments and shares.
               * {
               *    shares: [],
               *    comments: [],
               * }
               * @type {Object}
               */
            flags: {
                type: Object,
                value: () => ({}),
            },
            /**
               * From flags, but checks if flags exist
               * @type {Array}
               */
            commentFlags: {
                type: Array,
                computed: '_computeCommentFlags(flags.*)',
            },
            /**
               * A url to use as the default avatar for the comments component to use
               * when a comment author does not have one set.
               * @type {String}
               */
            _defaultCommentAvatarUrl: {
                type: String,
                value: () => assets.avatar,
            },
            /**
               * Convenience flag to indicate whether the controls for the
               * share – delete button etc - should be displayed
               * @type {Boolean}
               */
            _displayMetaActions: {
                type: Boolean,
                computed: '_computeMetaActionDisplay(_sharedByUser, _userIsAdmin)',
            },
            /**
               * Flag whether the share is featured on not.
               * @type {Boolean}
               */
            featured: {
                type: Boolean,
                value: false,
            },
            /**
               * Allow the icon to display for a featured share to be set from
               * outside the component
               * @type {String}
               */
            featuredIconUrl: {
                type: String,
                value: null,
            },
            /**
               * Use the `featuredIconUrl` or a default icon url.
               * @type {String}
               */
            _featuredIconUrl: {
                type: String,
                computed: '_computeFeaturedIconUrl(featuredIconUrl)',
            },
            /**
               * Currently authenticated user. An object with the user data
               * @type {Object}
               */
            currentUser: {
                type: Object,
                value: () => ({}),
            },
            /**
               * A selector for the subpage to show in the social nav. Currently only
               * one option, but set up to accept remix tab when implemented.
               * @type {String}
               */
            _section: {
                type: String,
                value: 'comments',
            },
            /**
               * A list of like objects used to calculate the number of likes for the share
               * and whether the current user has liked this particular share.
               * @type {Array}
               */
            likes: {
                type: Array,
                value: () => [],
            },
            /**
               * Computed property that watches the liked list and returns true is
               * it contains a like with the current user id.
               * @type {Boolean}
               */
            liked: {
                type: Boolean,
                computed: '_computeLiked(likes.*, currentUser)',
            },
            /**
               * Property to indicate whether we are currently submiting a like request.
               * @type {Boolean}
               */
            submitingLike: {
                type: Boolean,
                value: false,
            },
            /**
               * Flag to indicate if the current share is authored by the current authenticated
               * user. This can inform the UI what should be hidden or shown accordingly.
               * @type {Boolean}
               */
            _sharedByUser: {
                type: Boolean,
                computed: '_computeSharedByUser(shareData, currentUser)',
            },
            /**
               * Convenience flag to indicate whether the current user
               * is an admin
               * @type {Boolean}
               */
            _userIsAdmin: {
                type: Boolean,
                computed: '_computeUserIsAdmin(currentUser.admin_level)',
            },
            /**
               * A map of part ids to labels and links.
               *
               * @type {Object}
               */
            knownParts: {
                type: Object,
                value: () => ({
                    'motion-sensor': {
                        label: 'Motion sensor',
                        link: 'https://kano.me/store/products/motion-sensor-kit',
                    },
                    lightboard: {
                        label: 'Pixel kit',
                        link: 'https://kano.me/store/products/pixel-kit',
                    },
                    speaker: {
                        label: 'Speaker',
                    },
                    'gyro-accelerometer': {
                        label: 'Tilt sensor',
                    },
                    microphone: {
                        label: 'Microphone',
                    },
                }),
            },
            /** An array of related shares (four is the recommended number).
               *
               *  Expected format of each entry:
               *
               *  {
               *      targetUrl: String,
               *
               *      imageUrl: String,
               *      spritesheetUrl: String
               *  }
               *
               *  For entries with both imageUrl and spritesheetUrl,
               *  the later takes priority.
               *
               * @type {Array}
               */
            related: {
                type: Array,
            },
            hideSocial: {
                type: Boolean,
                value: false,
            },
            byLabel: String,
            remixLabel: String,
            viewCodeLabel: String,
            deleteLabel: String,
            likeCountLabel: String,
            commentCountLabel: String,
            viewsCountLabel: String,
            moreFromLabel: String,
            wandSpellLabel: String,
            partsUsedLabel: String,
            shareLabel: String,
            unflagLabel: String,
            flagLabel: String,
        };
    }
    static get observers() {
        return [
            '_shareDataChanged(shareData.*)',
            'updateFlagButton(flags, unflagLabel, flagLabel)',
        ];
    }
    constructor() {
        super();
        this.byLabel = null;
        this.remixLabel = null;
        this.viewCodeLabel = null;
        this.deleteLabel = null;
        this.likeCountLabel = null;
        this.commentCountLabel = null;
        this.viewsCountLabel = null;
        this.moreFromLabel = null;
        this.wandSpellLabel = null;
        this.partsUsedLabel = null;
        this.shareLabel = null;
        this.unflagLabel = null;
        this.flagLabel = null;
    }
    _(v, fallback) {
        return typeof v === 'undefined' || v === null ? fallback : v;
    }
    get commentsElement() {
        return this.shadowRoot.querySelector('#comments');
    }
    _computeClass(value, className) {
        return value ? className : '';
    }
    _getPartIcon(product) {
        // snake case to camelCase
        const icon = partIcons[product.replace(/(-\w)/g, m => m[1].toUpperCase())];
        if (!icon) {
            return '';
        }
        return icon.innerHTML;
    }
    _computeAvatarUrl(shareData) {
        if (shareData) {
            if (shareData.userAvatar) {
                return shareData.userAvatar;
            }
            return assets.avatar;
        }
        /** No share provided, don't set the avatar */
        return ''; // Valid URI
    }
    _computeLoaderStatus(commentChangeObj) {
        const comments = commentChangeObj.base;
        if (comments) {
            return comments.page ? 'on' : 'off';
        }
        return 'off';
    }
    _computeFlagged(flags) {
        if (!flags || !flags.shares || flags.shares.length === 0) {
            return false;
        }
        return flags.shares.some(flag => flag === this.shareData.id);
    }
    updateFlagButton() {
        const text = this._computeFlagged(this.flags) ? this._(this.unflagLabel, 'Unflag') : this._(this.flagLabel, 'Flag');
        this.$['drop-down-flag'].innerText = text;
    }
    _computeFlagStatus() {
        if (!this.flags || !this.flags.shares || this.flags.shares.length === 0) {
            return 'unflagged';
        }
        return this._computeFlagged(this.flags) ? 'flagged' : 'unflagged';
    }
    _computeCommentFlags() {
        if (!this.flags) {
            return [];
        }
        return this.flags.comments;
    }
    _computeFeaturedIconUrl() {
        if (this.featuredIconUrl) {
            return this.featuredIconUrl;
        }
        return assets.featured || ''; // Valid URI
    }
    _computeFeatureClass(featured) {
        const baseClass = 'action-button feature';
        const activeClass = featured ? 'featured' : 'default';
        return `${baseClass} ${activeClass}`;
    }
    _computeSharedByUser(shareData, currentUser) {
        if (!shareData || !currentUser) {
            return false;
        }
        return shareData.userId === currentUser.id;
    }
    _computeFeatured(featured) {
        return featured;
    }
    _computeLiked(likeChangeObj, currentUser) {
        if (!likeChangeObj || !currentUser) {
            return false;
        }
        if (Array.isArray(likeChangeObj.base)) {
            const likes = likeChangeObj.base;
            if (likes && likes.length && currentUser) {
                const liked = likes.some(l => l.user === currentUser.id);
                return liked;
            }
        } else if (likeChangeObj.base.userLikes.length > 0 && this.shareData && this.shareData.id) {
            const likes = likeChangeObj.base.userLikes;
            return likes.indexOf(this.shareData.id) >= 0;
        }
        return false;
    }
    _computeLikeClass(liked) {
        const baseClass = 'action-button like';
        const activeClass = liked ? 'liked' : 'not-liked';
        return `${baseClass} ${activeClass}`;
    }
    _computedLikeButtonText(liked) {
        return liked ? 'Liked' : 'Like';
    }
    _computeFeatureButtonText(featured) {
        return featured ? 'Un-staff pick' : 'Staff pick';
    }
    _getLabelForPartId(partId) {
        if (this.knownParts && this.knownParts[partId]) {
            return this.knownParts[partId].label;
        }

        return partId;
    }
    _getLinkForPartId(partId) {
        if (this.knownParts
            && this.knownParts[partId]
            && this.knownParts[partId].link) {
            return this.knownParts[partId].link;
        }

        return null;
    }
    _computeNavItemClass(section, id) {
        const baseClass = 'nav-item';
        const activeClass = section === id ? 'active' : 'inactive';
        return `${baseClass} ${activeClass}`;
    }
    _computeMetaActionDisplay(sharedByUser, userIsAdmin) {
        return sharedByUser || userIsAdmin;
    }
    _computeUserIsAdmin(adminLevel) {
        return adminLevel && adminLevel > 0;
    }
    _computePartsLinkClass(product) {
        if (!this._getLinkForPartId(product)) {
            return 'inactive';
        }
        return '';
    }
    _shareDataChanged(shareDataChangeObj) {
        const shareData = shareDataChangeObj.base;
        if (shareData && shareData.id) {
            return this.classList.toggle('loaded', true);
        }
        return null;
    }
    _showComments() {
        this.set('_section', 'comments');
    }
    _showLikes() {
        this.set('_section', 'likes');
    }
    _showCodeButton(shareData) {
        let attachmentExt;
        if (shareData && shareData.attachment_url) {
            attachmentExt = shareData.attachment_url.split('.').pop();
            if (['html', 'draw', 'lightcode'].indexOf(attachmentExt) !== -1) {
                return true;
            }
        }
        return false;
    }
    _showRemixButton(sh, canRemix) {
        if (sh && canRemix) {
            return true;
        }
        return false;
    }
    _showFeaturedButton(sh, isAdmin) {
        return sh && isAdmin;
    }
    _showMoreActions(shareData, userAdminLevel, displayMetaActions) {
        return this._showFeaturedButton(shareData, userAdminLevel) || displayMetaActions;
    }
    _showRelatedShares(related) {
        return related && related.length > 0;
    }
    _anyHardwareUsed(hardware) {
        return hardware && hardware.length > 0 && !hardware.includes('wand');
    }
    _wandHardwareUsed(hardware) {
        return hardware && hardware.includes('wand');
    }
    _onDeleteTapped() {
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'delete',
                id: this.shareData ? this.shareData.id : null,
                slug: this.shareData ? this.shareData.slug : null,
            },
        }));
    }
    _onFeatureTapped() {
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'featured',
                featured: !this.featured,
                id: this.shareData.id,
            },
        }));
    }
    _onLikeTapped() {
        if (this._sharedByUser || this.submitingLike) {
            return;
        }
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'like',
                liked: !this.liked,
                shareId: this.shareData ? this.shareData.id : null,
                shareUserId: this.shareData ? this.shareData.userId : null,
                userId: this.currentUser ? this.currentUser.id : null,
            },
        }));
    }
    _onRemixTapped() {
        const item = this.shareData;
        if (!item) {
            return;
        }

        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'remix',
                shareId: item.id,
                shareSlug: item.slug,
                shareType: item.app,
            },
        }));
    }
    _onFlagTapped() {
        const flagged = this._computeFlagged(this.flags);
        const activeClass = flagged ? 'unflagged' : 'flagged';
        const flagButton = this.$['drop-down-flag'];
        flagButton.setAttribute('class', `flag ${activeClass}`);
        flagButton.innerText = flagged ? this._(this.flagLabel, 'Flag') : this._(this.unflagLabel, 'Unflag');
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'flag',
                id: this.shareData ? this.shareData.id : null,
                flag: flagged,
            },
        }));
    }
    _onMoreActionsTapped(e) {
        /* The drop-down attaches a click event to window which may happen faster than
             his gets propagated and will close the modal immediately. Stopping propagation
             here prevents that. */
        e.preventDefault();
        e.stopPropagation();

        this.$['more-actions-menu'].toggle();
    }
    _toggleCodeView() {
        const newValue = !this.displayCode;
        this.set('displayCode', newValue);
    }
    _onUserTapped() {
        const sh = this.shareData;
        if (!sh) {
            return;
        }
        this.dispatchEvent(new CustomEvent('view-user', {
            detail: {
                id: this.shareData.userId,
                username: this.shareData.username,
            },
        }));
    }
    _onEmailTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'email',
                share: this.shareData,
            },
        }));
    }
    _onFacebookTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'facebook',
                share: this.shareData,
            },
        }));
    }
    _onTwitterTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'twitter',
                share: this.shareData,
            },
        }));
    }
    _handleDeleteComment(e) {
        this.dispatchEvent(new CustomEvent('delete-comment', {
            detail: e.detail,
        }));
    }
    _handlePostComment(e) {
        this.dispatchEvent(new CustomEvent('post-comment', {
            detail: e.detail,
        }));
    }
    _handleLoadComment(e) {
        this.dispatchEvent(new CustomEvent('load-comment', {
            detail: e.detail,
        }));
    }
    _handleFlagComment(e) {
        this.dispatchEvent(new CustomEvent('flag-comment', {
            detail: e.detail,
        }));
    }
    _handleUnflagComment(e) {
        this.dispatchEvent(new CustomEvent('unflag-comment', {
            detail: e.detail,
        }));
    }
    _handleViewUser(e) {
        this.dispatchEvent(new CustomEvent('view-user', {
            detail: e.detail,
        }));
    }
    _handleHardwareClick(e) {
        const linkElement = e.path.find(element => element.href !== undefined);
        const link = linkElement.href;
        this.dispatchEvent(new CustomEvent('hardware-click', {
            detail: { link },
        }));
    }
}

customElements.define('kwc-share-detail', KwcShareDetail);
