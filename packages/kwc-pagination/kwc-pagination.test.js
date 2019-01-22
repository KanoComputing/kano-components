/* globals fixture, suite, test, assert */

import './kwc-pagination.js';

const basic = fixture`
    <kwc-pagination></kwc-pagination>
`;

suite('kwc-pagination', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-pagination'));
    });
    test('instantiating the element with default properties works', () => {
        const element = basic();
        assert.equal(element.totalPages, 1);
        assert.equal(element.currentPage, 1);
        assert.equal(element.range, 3);
        assert.equal(!element.paginationControls, true);
        assert.equal(!element.jumpControls, true);
    });
    test('amount of pages to display for default values', () => {
        const element = basic();
        assert.equal(element._pages.length, 1);
    });
    test('amount of pages to display when total pages is smaller than range', () => {
        const element = basic();
        const totalPages = 3;
        const range = 5;
        const currentPage = 1;
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages.length, totalPages);
    });
    test('amount of pages to display when total pages is the same as range', () => {
        const element = basic();
        const totalPages = 5;
        const range = 5;
        const currentPage = 1;
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages.length, totalPages);
    });
    test('amount of pages to display when total pages bigger than range', () => {
        const element = basic();
        const totalPages = 20;
        const range = 5;
        const currentPage = 1;

        // Current page is smaller than range
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages.length, range);

        // Current page is bigger than range but not on "final" pages
        element.set('currentPage', currentPage + range + 1);
        assert.equal(element._pages.length, range);

        // Current page is within the last pages that can be displayed
        element.set('currentPage', totalPages - 1);
        assert.equal(element._pages.length, range);
    });
    test('first and last page label are correct when total pages is smaller than range', () => {
        const element = basic();
        const totalPages = 3;
        const range = 5;
        const currentPage = 1;
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages[0], 1);
        assert.equal(element._pages[2], 3);
    });
    test('first and last page label are correct when total pages is the same as range', () => {
        const element = basic();
        const totalPages = 5;
        const range = 5;
        const currentPage = 1;
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages[0], 1);
        assert.equal(element._pages[4], 5);
    });
    test('first and last page label are correct when total pages is bigger than range', () => {
        const element = basic();
        const totalPages = 20;
        const range = 5;
        const currentPage = 16; // on the last pages
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages[0], 16);
        assert.equal(element._pages[4], 20);
    });
    test('first and last page label are correct when starting counting on different numbers', () => {
        const element = basic();
        const startsOn = 10;
        const totalPages = 20;
        const range = 5;
        const currentPage = 10;
        element.set('startsOn', startsOn);
        element.set('totalPages', totalPages);
        element.set('range', range);
        element.set('currentPage', currentPage);
        assert.equal(element._pages[0], 10);
        assert.equal(element._pages[4], 14);
    });
    test('navigation control goes to next page', (done) => {
        const element = basic();
        element.set('totalPages', 3);
        element.set('currentPage', 1);
        const currentPage = element.get('currentPage');
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, currentPage + 1);
            done();
        });
        element._nextPage();
    });
    test('navigation control goes to previous page', (done) => {
        const element = basic();
        element.set('totalPages', 3);
        element.set('currentPage', 2);
        const currentPage = element.get('currentPage');
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, currentPage - 1);
            done();
        });
        element._previousPage();
    });
    test('page is the first and last page when having only one page', () => {
        const element = basic();
        const totalPages = 1;
        element.set('totalPages', totalPages);
        element.set('currentPage', 1);
        assert.equal(element._isLastPage(), true);
        assert.equal(element._isFirstPage(), true);
    });
    test('calculate if `currentPage` is first and last pages', () => {
        const element = basic();
        const totalPages = 10;
        element.set('totalPages', totalPages);
        element.set('currentPage', 1);
        assert.equal(element._isFirstPage(), true);
        element.set('currentPage', totalPages);
        assert.equal(element._isLastPage(), true);
    });
    test('jump control goes to last page', (done) => {
        const element = basic();
        const totalPages = 10;
        element.set('totalPages', totalPages);
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, totalPages);
            done();
        });
        element._goToLastPage();
    });
    test('jump control goes to last page when start counting on different numbers', (done) => {
        const element = basic();
        const startsOn = 3;
        const totalPages = 10;
        element.set('startsOn', startsOn);
        element.set('totalPages', totalPages);
        element.set('currentPage', 5);
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, totalPages + startsOn - 1);
            done();
        });
        element._goToLastPage();
    });
    test('jump control goes to first page', (done) => {
        const element = basic();
        element.set('totalPages', 10);
        element.set('currentPage', 3);
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, element.startsOn);
            done();
        });
        element._goToFirstPage();
    });
    test('jump control goes to first page when start counting on different numbers', (done) => {
        const element = basic();
        const startsOn = 3;
        const totalPages = 10;
        element.set('startsOn', startsOn);
        element.set('totalPages', totalPages);
        element.set('currentPage', 5);
        element.addEventListener('go-to-page', (e) => {
            assert.equal(e.detail, startsOn);
            done();
        });
        element._goToFirstPage();
    });
});
