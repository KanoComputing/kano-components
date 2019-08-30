import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-icon/iron-icon.js';
import '@kano/kwc-icons/kwc-ui-icons.js';
import '@kano/styles/typography.js';
import '@kano/styles/color.js';


class KWCPagination extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                justify-content: center;
                flex-direction: row;
                align-items: center;
                margin-bottom: 40px;
            }
            *[hidden] {
                display: none;
            }
            .item,
            .item[disabled]:hover {
                margin: 0px 5px;
                width: 32px;
                line-height: 32px;
                border-radius: 32px;
                max-width: 100px;
                padding: 0;
                display: block;

                background: transparent;
                border: none;
                outline: none;
                color: var(--button-secondary-color);

                font-size: 16px;
                font-family: var(--font-body);
                font-weight: bold;
                cursor: default;
            }
            .item.active {
                background: var(--button-secondary-color);
                color: white;
            }
            .item:hover {
                color: var(--button-secondary-hover-color);
                cursor: pointer;
            }
            .item.active:hover {
                color: white;
                background: var(--button-secondary-hover-color);
            }
            .item.hidden {
                visibility: hidden;
            }
            .rewind.first, .step.previous {
                justify-self: flex-start;
            }
            .rewind.first {
                margin-left: 20px;
            }
            .step.previous {
                margin-right: auto;
            }
            .step.next {
                margin-left: auto;
            }
            .rewind.last {
                margin-right: 20px;
            }
            .rewind.last, .step.next {
                justify-self: flex-end;
            }
            .pagination-icon {
                width: 10px;
                height: 10px;
                display: block;
            }
            .pagination-icon.first {
                transform: rotate(90deg);
            }
            .pagination-icon.last {
                transform: rotate(-90deg);
            }
            .rewind {
                background: transparent;
                border: none;
                outline: none;
                color: var(--button-secondary-color);
                display: flex;
                flex-direction: row;
            }
            .rewind[disabled],
            .rewind[disabled]:hover {
                color: var(--color-grey) !important;
                opacity: 0.5;
                cursor: default;
            }
            .rewind:hover,
            .rewind:focus {
                color: var(--button-secondary-hover-color);
                cursor: pointer;
            }
            .step,
            .step:focus {
                background: transparent;
                outline: none;
                border: none;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
            .step .arrow,
            .step:focus .arrow {
                width: 24px;
                height: 24px;
                border-radius: 24px;
                background: var(--button-secondary-color);
                color: white;
                display: flex;
            }
            .step .arrow .pagination-icon {
                margin: auto;
            }
            .step .label,
            .step:focus .label {
                font-size: 16px;
                font-family: var(--font-body);
                font-weight: bold;
                color: var(--button-secondary-color);
            }
            .step.previous .label {
                margin-left: 10px;
            }
            .step.next .label {
                margin-right: 10px;
            }
            .step[disabled],
            .step[disabled]:hover {
                cursor: default;
            }
            .step[disabled] .arrow,
            .step[disabled]:hover .arrow {
                background: var(--color-grey) !important;
                opacity: 0.5;
            }
            .step[disabled] .label,
            .step[disabled]:hover .label {
                color: var(--color-grey) !important;
                opacity: 0.5;
            }
            .step:hover {
                cursor: pointer;
            }
            .step:hover .arrow {
                background: var(--button-primary-color);
            }
            .step:hover .label {
                color: var(--button-secondary-hover-color);
            }
            .item,
            .rewind,
            .step .label,
            .step .arrow {
                transition-property: background, border-color, color;
                transition-duration: 0.2s;
                transition-timing-function: ease;
            }
            @media all and (max-width: 680px) {
                .item {
                    display: none;
                }
            }
        </style>

        <template is="dom-if" if="[[jumpControls]]">
            <button class="rewind first" on-click="_goToFirstPage" disabled$="[[_isFirstPage(currentPage, totalPages)]]">
                <slot name="firstPage">
                    <iron-icon class="pagination-icon first" icon="kwc-ui-icons:arrow" slot="firstPage"></iron-icon>
                    <iron-icon class="pagination-icon first" icon="kwc-ui-icons:arrow" slot="firstPage"></iron-icon>
                </slot>
            </button>
        </template>

        <template is="dom-if" if="[[paginationControls]]">
            <button class="step previous" on-click="_previousPage" disabled$="[[_isFirstPage(currentPage, totalPages)]]">
                <slot name="previousPage">
                    <div class="arrow">
                        <iron-icon class="pagination-icon first" icon="kwc-ui-icons:arrow"></iron-icon>
                    </div>
                    <div class="label">[[_(prevLabel, 'Prev')]]</div>
                </slot>
            </button>
        </template>

        <template is="dom-repeat" items="[[_pages]]">
            <button class$="[[_computeActiveClass(item, currentPage)]] item" on-click="_goToPage">
                [[item]]
            </button>
        </template>

        <template is="dom-if" if="[[lastPage]]">
            <button class$="[[_computeHiddenClass(_pages, totalPages)]] item" disabled>
                ...
            </button>
            <button class$="[[_computeHiddenClass(_pages, totalPages)]] item" on-click="_goToLastPage">
                [[totalPages]]
            </button>
        </template>

        <template is="dom-if" if="[[paginationControls]]">
            <button class="step next" on-click="_nextPage" disabled$="[[_isLastPage(currentPage, totalPages)]]">
                <slot name="nextPage">
                    <div class="label">[[_(nextLabel, 'Next')]]</div>
                    <div class="arrow">
                        <iron-icon class="pagination-icon last" icon="kwc-ui-icons:arrow"></iron-icon>
                    </div>
                </slot>
            </button>
        </template>

        <template is="dom-if" if="[[jumpControls]]">
            <button class="rewind last" on-click="_goToLastPage" disabled$="[[_isLastPage(currentPage, totalPages)]]">
                <slot name="lastPage">
                    <iron-icon class="pagination-icon last" icon="kwc-ui-icons:arrow" slot="lastPage"></iron-icon>
                    <iron-icon class="pagination-icon last" icon="kwc-ui-icons:arrow" slot="lastPage"></iron-icon>
                </slot>
            </button>
        </template>
`;
    }
    static get is() { return 'kwc-pagination'; }
    static get properties() {
        return {
            /**
             * Set what is the number to start counting from for page
             * labels.
             */
            startsOn: {
                type: Number,
                value: 1,
            },
            /**
             * Total amount of pages to paginate.
             * @type {Number}
             */
            totalPages: {
                type: Number,
                value: 1,
            },
            /**
             * Which page is currently selected.
             * @type {Number}
             */
            currentPage: {
                type: Number,
                value: 1,
            },
            /**
             * How many pages to display between the control buttons.
             * @type {Number}
             */
            range: {
                type: Number,
                value: 3,
            },
            /**
             * Flags if pagination should display controls for "next"
             * and "previous" pages.
             * @type {Boolean}
             */
            paginationControls: {
                type: Boolean,
                default: false,
            },
            /**
             * Flags if pagination should display controls for "jump to
             * first" and "jump to last" pages.
             * @type {Boolean}
             */
            jumpControls: {
                type: Boolean,
                default: false,
            },
            /**
             * Flags if pagination should display the last page number.
             * @type {Boolean}
             */
            lastPage: {
                type: Boolean,
                default: false,
            },
            /**
             * Array of page indexes to be displayed, calculated based
             * on the `totalPages`, `range` and the `currentPage`.
             * @type {Array}
             */
            _pages: {
                type: Array,
                computed: '_computePages(currentPage, totalPages, range)',
            },
            nextLabel: String,
            prevLabel: String,
        };
    }
    constructor() {
        super();
        this.nextLabel = null;
        this.prevLabel = null;
    }
    _(v, fallback) {
        return typeof v === 'undefined' || v === null ? fallback : v;
    }
    _computePages(currentPage, totalPages = 1, range) {
        const pages = [];


        const { startsOn } = this;

        if (totalPages <= range) {
            /**
             * The number of pages is smaller than the range:
             * add as many pages as there are
             */
            for (let i = startsOn; i < totalPages + startsOn; i += 1) {
                pages.push(i);
            }
        /**
         * The number of pages is bigger than the range:
         * only show a number of pages equal to the range
         *
         * If current page is not on the last pages
         */
        } else if (currentPage < (startsOn + totalPages - range)) {
            /**
             * Current page is in the middle of pagination
             */
            let initCount = currentPage - parseInt(range / 2, 10);
            if (initCount < startsOn) {
                initCount = startsOn;
            }
            for (let i = initCount; i < initCount + range; i += 1) {
                pages.push(i);
            }
        } else {
            /**
             * Current page is on the final pages
             */
            const initCount = startsOn + totalPages - range;
            for (let i = initCount; i < totalPages + startsOn; i += 1) {
                pages.push(i);
            }
        }
        return pages;
    }
    _computeHiddenClass(pages, totalPages) {
        const lastPageInRange = pages[pages.length - 1];
        return totalPages <= lastPageInRange ? 'hidden' : '';
    }
    _goToPage(e) {
        const page = parseInt(e.model.item, 10);
        this.dispatchEvent(new CustomEvent('go-to-page', { bubbles: false, detail: page }));
    }
    _nextPage() {
        const page = parseInt(this.currentPage, 10);
        this.dispatchEvent(new CustomEvent('go-to-page', { bubbles: false, detail: page + 1 }));
    }
    _previousPage() {
        const page = parseInt(this.currentPage, 10);
        this.dispatchEvent(new CustomEvent('go-to-page', { bubbles: false, detail: page - 1 }));
    }
    _goToLastPage() {
        this.dispatchEvent(new CustomEvent('go-to-page', { bubbles: false, detail: this.totalPages + this.startsOn - 1 }));
    }
    _goToFirstPage() {
        this.dispatchEvent(new CustomEvent('go-to-page', { bubbles: false, detail: this.startsOn }));
    }
    _computeActiveClass(item, selected) {
        return this._isActive(item, selected) ? 'active' : '';
    }
    _isActive(page, current) {
        return page === current;
    }
    _isFirstPage() {
        // If there are pages, check if it's the first
        if (this.totalPages > 1) {
            return parseInt(this.currentPage, 10) === this.startsOn;
        }
        // Return true to disable the "previous" and "first page"
        // buttons on the navigation
        return true;
    }
    _isLastPage() {
        if (this.totalPages > 1) {
            return parseInt(this.currentPage, 10) === this.totalPages + this.startsOn - 1;
        }
        return true;
    }
}
window.customElements.define(KWCPagination.is, KWCPagination);
