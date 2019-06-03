/**
`<kwc-social-comments>`

Comment feed for use in social media flavoured components.
Add this component somewhere in your html body, or more likely embed it into another component.

```html
    <body>
      <kwc-social-comments></kwc-social-comments>
```
The component does not make any assumptions on how you are handling comment loading,
or how they are stored by the api. Control of `loading` and `posting` states
are done through attributes that can be set by any wrapper component.

This component expects a list of comment objects of the following form:
```json
{
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "author": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                },
                "avatar": {
                    "type": "string"
                },
            }
        },
        "text": {
            "type": "string"
        },
        "createdOn": {
            "type": "string"
        },
        "flags": {
            "type": "array",
            "items": {}
        },
    },
    "required" : ["id", "text", "createdOn"]
}
```

## State attributes
### Loading
This commponent can be put into a `loading` state by setting the `loaderState` property
or `loader-state` attribute to `"disabled"`.
This will disable the "load more" button until the state is reset to `"on"`.

If there are no more comments to load,
the "load more" button can be hidden by setting the loader state to `"off"`.

### Posting
The comment input can be disabled by setting the `posting` attribute or property on the element
to `true`. This can be used to prevent a user from posting a second comment whilst the first
is still being sent, if this is a desired behaviour.

@demo demo/index.html
*/

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js';
import '@polymer/iron-image/iron-image.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';
import button from '@kano/styles/button.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { rubbishBin } from '@kano/icons/ui.js';
import { flag } from '@kano/icons/social.js';
import { timeSince } from '@kano/kwc-share-card/timeago.js';

class KwcSocialComments extends PolymerElement {
    static get template() {
        return html`
        ${button}
        <style>
            :host {
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-justified;
                width: 100%;
                --separator-color: #e3e5e6;
                --input-border-color: #e3e5e6;
            }
            :host([tombstone]) * {
                visibility: hidden;
            }
            :host([hidden]) {
                display: none !important;
            }
            .input-comment {
                @apply --layout-horizontal;
                border-bottom: 1px solid var(--separator-color);
                padding: 24px 0;
                margin: 0;
                width: 100%;
            }
            .comment-avatar {
                border-radius: 50%;
                flex: none;
                height: 40px;
                margin: 0 24px;
                overflow: hidden;
                position: relative;
                width: 40px;
            }
            .avatar {
                height: 40px;
                width: 40px;
                cursor: pointer;
            }
            .comment .avatar {
                cursor: pointer;
            }
            iron-image {
                height: 32px;
                width: 32px;
                border-radius: 50%;
            }
            .comment-form {
                @apply --layout-flex-2;
            }
            .comment-box {
                border: 1px solid var(--input-border-color);
                border-radius: 3px;
                box-sizing: border-box;
                font-family: var(--font-body);
                font-size: 16px;
                line-height: 20px;
                padding: 8px 16px 8px 16px;
                width: 100%;
            }
            .comment-box:focus {
                border-color: var(--color-azure);
                outline: 0;
            }
            .comment-form-actions {
                padding: 16px 0 0 0;
            }
            .comment {
                @apply --layout-horizontal;
                @apply --layout-start;
                border-bottom: 1px solid var(--separator-color);
                padding: 24px 0;
                width: 100%;
            }
            .comment.posting {
                opacity: 0.6;
            }
            .content {
                @apply --layout-flex-2;
                font-size: 16px;
                font-family: var(--font-body);
                color: var(--color-abbey);
                max-width: 450px;
            }
            .comment-header {
                margin: 0;
            }
            .content p {
                margin: 0;
                width: 100%;
            }
            .content .date {
                font-size: 14px;
                font-family: var(--font-body);
                color: var(--color-grey);
            }
            p {
                font-family: var(--font-body);
                color: var(--color-chateau);
                font-size: 16px;
                line-height: 20px;
                word-wrap: break-word;
            }
            .comment-body {
                color: var(--color-black);
                min-height: 20px;
            }
            .comment-error {
                color: var(--color-cinnabar);
                padding-top: 8px;
            }
            .comment:hover .action.delete,
            .comment:hover .action.flag {
                visibility: visible;
            }
            .author {
                color: var(--color-kano-orange);
                cursor: pointer;
                font-weight: bold;
                margin-right: 5px;
            }
            .actions {
                @apply --layout-end;
                @apply --layout-vertical;
                flex: none;
                width: calc(15% - 40px);
            }
            .control-actions {
                @apply --layout-horizontal;
                @apply --layout-center;
                @apply --layout-end-justified;
            }
            .action:focus {
                outline: 0;
            }
            .action.delete,
            .action.flag {
                -webkit-appearance: none;
                background: transparent;
                border: 0;
                border-radius: 3px;
                fill: var(--color-stone);
                cursor: pointer;
            }
            .action.delete:hover,
            .action.flag:hover {
                fill: var(--color-carnation);
            }
            .action.flag.flagged {
                fill: var(--color-carnation);
                visibility: visible;
            }
            .action .icon {
                height: 16px;
                width: 16px;
            }
            #retry {
                margin-top: 10px;
            }
            iron-list {
                width: 100%;
                height: 100%
            }
            .loader {
                margin-top: 20px;
            }
            .loader[hidden] {
                display: block;
            }
            :host([loader-status="off"]) #loader {
                display: none;
            }
            :host([loader-status="disabled"]) #loader {
                background-color: var(--color-porcelain);
                color: rgba(41, 47, 53, 1);
            }
            :host([retry-button="hide"]) #retry {
                display: none;
            }
            @media all and (max-width: 360px) {
                .comment-form-actions {
                    @apply --layout-vertical;
                    @apply --layout-start;
                    @apply --layout-start-justified;
                }
            }
            @media all and (min-width: 361px) {
                .comment-form-actions {
                    @apply --layout-horizontal;
                    @apply --layout-center;
                    @apply --layout-start-justified;
                }
            }
            :host *[hidden] {
                display: none;
            }
            .submit {
                margin-right: 8px;
            }
        </style>

        <div class="input-comment">
            <div class="comment-avatar">
                <iron-image class="avatar" src$="[[_avatar]]" sizing="cover" preload fade></iron-image>
            </div>
            <form class="comment-form" on-submit="_submitComment">
                <input id="comment-input" class="comment-box" type="text" placeholder$="[[_placeholderText]]" value="{{_comment::input}}" disabled$="[[posting]]" on-focus="_toggleFormControls" on-keydown="_dialogKeydown">
                <div class="comment-form-actions">
                    <button class="btn submit" type="submit" on-tap="_submitComment" disabled="[[!_commentValid]]">
                        [[_(submitLabel, 'Submit')]]
                    </button>
                    <button class="btn secondary" on-tap="_cancelComment">
                        [[_(cancelLabel, 'Cancel')]]
                    </button>
                </div>
            </form>
        </div>
        <template is="dom-repeat" items="[[comments]]" as="comment">
            <div id$="[[comment.id]]" class$="comment [[_computePostingClass(comment)]]">
                <div class="comment-avatar">
                    <iron-image class="avatar" src$="[[_computeAvatar(comment.author)]]" sizing="cover" preload fade on-tap="_userTapped"></iron-image>
                </div>
                <div class="content">
                    <p class="comment-header">
                        <span class="author" on-tap="_userTapped">
                            [[comment.author.username]]
                        </span>
                        <span class="date">
                            [[_(agoPrefix, '')]] [[_timeSince(comment.date_created, comments.*, timeAgoLocales)]] [[_(agoSuffix, 'ago')]]
                        </span>
                    </p>
                    <p class="comment-body">
                        <span inner-h-t-m-l="[[_lb(comment.text)]]"></span>
                    </p>
                    <p class="comment-error" hidden$="[[!comment.error]]">
                        [[comment.error]]
                    </p>
                </div>
                <div class="actions">
                    <div class="control-actions">
                        <template is="dom-if" if="[[_commentIsDeletable(comment.author.id, user.id, user.admin_level)]]">
                            <button type="button" class="action delete" on-tap="_deleteButtonTapped">
                                <div class="icon">${rubbishBin}</div>
                            </button>
                        </template>
                        <button type="button" class$="[[_computeFlagClass(comment.*)]]" on-tap="_flagButtonTapped">
                            <div class="icon">${flag}</div>
                        </button>
                    </div>
                    <button id="retry" class="btn secondary s" on-tap="_retryButtonTapped" hidden$="[[!comment.error]]" type="warning">
                        [[_(retryLabel, 'retry')]]
                    </button>
                </div>
            </div>
        </template>
        <button class="btn secondary loader" id="loader" type="secondary" on-tap="_loadMoreData">
            [[_loadMoreLabel, 'Load more')]]
        </button>
    `;
    }
    static get properties() {
        return {
            /**
               * Computer value for avatar
               * @type {String}
               */
            _avatar: {
                type: String,
                computed: '_computeAvatar(user)',
            },
            /**
               * Current value for comment input
               * @type {String}
               */
            _comment: {
                type: String,
                value: '',
            },
            /**
               * Whethe the `_comment` is valid
               * @type {Boolean}
               */
            _commentValid: {
                type: Boolean,
                computed: '_commentIsValid(_comment)',
            },
            /**
               * Array of comment objects to render
               * @type {Array}
               */
            comments: {
                type: Array,
                value: () => [],
                notify: true,
            },
            /**
               * Array of comment ids where user has flagged the specific comments
               * @type {Array}
               */
            commentFlags: {
                type: Array,
                value: () => [],
                notify: true,
            },
            /**
               * Default Avatar to use when not provided by comment or user data
               * @type {String}
               */
            defaultAvatar: {
                type: String,
                value: 'https://s3.amazonaws.com/kano-avatars/default-avatar.svg',
            },
            /**
               * Boolean toggle to show or hide the Submit and Cancel buttons
               * on the comment input
               * @type {Boolean}
               */
            _displayFormActions: {
                type: Boolean,
                value: false,
            },
            /**
               * An identifier to this comment thread, to be used in the `post-comment` event.
               * @type {String}
               */
            itemId: {
                type: String,
            },
            /**
               * Value of next page of comments if using pagination.
               * @type {Number}
               */
            nextPage: {
                type: Number,
                value: 0,
                observer: '_onDataLoad',
            },
            /**
               * Text to use as placeholder. Computed on whether we have comments or not.
               * @type {String}
               */
            _placeholderText: {
                type: String,
                computed: '_computePlaceholderText(comments)',
            },
            /**
               * Atribute to indicate a comment is being posted. Will disable input.
               * @type {Boolean}
               */
            posting: {
                type: Boolean,
                value: false,
            },
            /**
               * Atribute to loader status of the component.
               * Can be one of `on|off|disabled`. Will disable (disabled) or hide (off) load button.
               * @type {String}
               */
            loaderStatus: {
                type: String,
                value: 'off',
                reflectToAttribute: true,
            },
            /**
               * Atribute used to hide the retry button once clicked.
               * @type {Boolean}
               */
            retryButton: {
                type: String,
                reflectToAttribute: true,
            },
            /**
               * Current authenticated user.
               * @type {String}
               */
            user: {
                type: Object,
                value: () => ({}),
            },
            loadMoreLabel: String,
            retryLabel: String,
            agoSuffix: String,
            agoPrefix: String,
            submitLabel: String,
            cancelLabel: String,
            timeAgoLocales: Object,
        };
    }
    constructor() {
        super();
        this.loadMoreLabel = null;
        this.retryLabel = null;
        this.agoSuffix = null;
        this.agoPrefix = null;
        this.submitLabel = null;
        this.cancelLabel = null;
    }
    _(v, fallback) {
        return typeof v === 'undefined' || v === null ? fallback : v;
    }
    _dialogKeydown(e) {
        if (e.keyCode === 8) {
            e.stopPropagation();
        }
    }
    _cancelComment() {
        this._comment = '';
        this._displayFormActions = false;
    }
    _toggleFormControls() {
        this._displayFormActions = true;
    }
    _commentIsValid() {
        /**
           * Prevent users trying to submit either blank comments, or,
           * equally annoying, lots of spaces.
           */
        if (!this._comment || /^ *$/.test(this._comment)) {
            return false;
        }
        return true;
    }
    _computeAvatar(user) {
        if (user) {
            return user.avatar || this.defaultAvatar;
        }
        return this.defaultAvatar;
    }
    _onDataLoad() {
        this.$.loader.disabled = false;
    }
    _loadMoreData() {
        if (!this.itemId || this.$.loader.disabled) {
            return;
        }
        this.$.loader.disabled = true;
        this.dispatchEvent(new CustomEvent('load-comment', {
            detail: {
                id: this.itemId,
            },
        }));
    }
    _createDate(formatted) {
        return new Date(formatted);
    }
    _commentIsDeletable(commentAuthorId, userId, userAdminLevel) {
        return commentAuthorId === userId || userAdminLevel > 0;
    }
    _computeFlag(flags) {
        if (!flags || !this.user) {
            return false;
        }
        return flags.some(f => f.author === this.user.id);
    }
    _computeCommentFlag(comment) {
        if (this.commentFlags.length === 0) {
            return false;
        }
        return this.commentFlags.some(f => f === comment.id);
    }
    _computeFlagClass(splice) {
        const baseClass = 'action flag';
        let activeClass;
        if (splice.base.flags) {
            activeClass = this._computeFlag(splice.base.flags) ? 'flagged' : 'unflagged';
        } else {
            activeClass = this._computeCommentFlag(splice.base) ? 'flagged' : 'unflagged';
        }
        return `${baseClass} ${activeClass}`;
    }
    _computePlaceholderText(comments) {
        if (!comments || !comments.length) {
            return 'Be the first to comment';
        }
        return 'Leave a comment';
    }
    _computePostingClass(comment) {
        return `${comment.posting ? 'posting' : ''}${comment.error ? 'error' : ''}`;
    }
    _computeErrorClass(error) {
        return error ? 'error' : '';
    }
    _computeErrorState(error) {
        return error ? true : '';
    }
    _deleteButtonTapped(e) {
        const commentId = e.model.comment.id;
        if (!commentId) {
            return;
        }
        this.dispatchEvent(new CustomEvent('delete-comment', {
            detail: {
                index: e.model.index,
                id: commentId,
                user: e.model.comment.author.id || 0,
            },
        }));
    }
    _isHintHidden() {
        return true;
    }
    _lb(value) {
        const safeDiv = document.createElement('div');
        safeDiv.textContent = value;
        return safeDiv.innerHTML.replace(/\n/g, '<br>');
    }
    _flagButtonTapped(e) {
        const { index } = e.model;
        const { id } = this.comments[index];
        let flagged;
        if (this.comments[index].flags) {
            flagged = this._computeFlag(this.comments[index].flags);
            if (flagged) {
                return;
            }
        } else {
            flagged = this._computeCommentFlag(this.comments[index]);
        }
        if (flagged) {
            e.path[1].setAttribute('class', 'action flag unflagged');
            this.dispatchEvent(new CustomEvent('unflag-comment', {
                detail: {
                    index,
                    id,
                },
            }));
            return;
        }
        e.path[1].setAttribute('class', 'action flag flagged');
        this.dispatchEvent(new CustomEvent('flag-comment', {
            detail: {
                index,
                id,
            },
        }));
    }
    _retryButtonTapped() {
        this.set('retryButton', 'hide');
        this.dispatchEvent(new CustomEvent('post-comment', {
            detail: {
                value: this.comments[0].text,
                retry: true,
            },
        }));
    }
    _submitComment(e) {
        e.preventDefault();
        const input = this.$['comment-input'];
        if (this._commentValid) {
            this.retryButton = null;
            /**
                 * Hide the Submit and Cancel buttons and blur the input
                 * so that the user has to reselect (and therfore show the
                 * controls) if they want to submit another comment.
                 */
            this._displayFormActions = false;
            if (input) {
                input.blur();
            }
            this.dispatchEvent(new CustomEvent('post-comment', {
                detail: {
                    value: this._comment,
                },
            }));
            this._comment = '';
        }
    }
    _timeSince(date, _, locales) {
        return timeSince(date, locales);
    }
    _userTapped(e) {
        const { index } = e.model;
        const { author } = this.comments[index];
        if (author) {
            this.dispatchEvent(new CustomEvent('view-user', {
                detail: {
                    id: author.id,
                    username: author.username,
                },
            }));
        }
    }
}

customElements.define('kwc-social-comments', KwcSocialComments);
