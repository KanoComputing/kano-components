import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import button from '@kano/styles/button.js';

class KWCPagination extends PolymerElement {
    static get template() {
        return html`
        ${button}
        <style>
            :host {
                display: block;
            }
            .btn.item {
                width: 32px;
                max-width: 100px;
                padding: 0;
            }
            *[hidden] {
                display: none;
            }
            @media all and (max-width: 680px) {
                :host {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                }
                .item {
                    display: none;
                }
                .btn.secondary ~ .btn.secondary {
                    margin-left: 8px;
                }
            }
        </style>

        <template is="dom-if" if="[[jumpControls]]">
            <button class="btn secondary first" on-click="_goToFirstPage" disabled$="[[_isFirstPage(currentPage, totalPages)]]">
                <slot name="firstPage">&lt;&lt;</slot>
            </button>
        </template>

        <template is="dom-if" if="[[paginationControls]]">
            <button class="btn secondary previous" on-click="_previousPage" disabled$="[[_isFirstPage(currentPage, totalPages)]]">
                <slot name="previousPage">PREV</slot>
            </button>
        </template>

        <template is="dom-repeat" items="[[_pages]]">
            <button class$="btn [[_computeActiveClass(item, currentPage)]] item" on-click="_goToPage">
                [[item]]
            </button>
        </template>

        <template is="dom-if" if="[[paginationControls]]">
            <button class="btn secondary next" on-click="_nextPage" disabled$="[[_isLastPage(currentPage, totalPages)]]">
                <slot name="nextPage">NEXT</slot>
            </button>
        </template>

        <template is="dom-if" if="[[jumpControls]]">
            <button class="btn secondary last" on-click="_goToLastPage" disabled$="[[_isLastPage(currentPage, totalPages)]]">
                <slot name="lastPage">&gt;&gt;</slot>
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
             * Array of page indexes to be displayed, calculated based
             * on the `totalPages`, `range` and the `currentPage`.
             * @type {Array}
             */
            _pages: {
                type: Array,
                computed: '_computePages(currentPage, totalPages, range)',
            },

        };
    }
    _computePages(currentPage, totalPages = 1, range) {
        const pages = [];


        const { startsOn } = this;

        if (totalPages <= range) {
            /**
             * The amount of pages is smaller than the range:
             * add as many pages as there are
             */
            for (let i = startsOn; i < totalPages + startsOn; i += 1) {
                pages.push(i);
            }
        /**
         * The amount of pages is bigger than the range:
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
        return this._isActive(item, selected) ? '' : 'secondary';
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
