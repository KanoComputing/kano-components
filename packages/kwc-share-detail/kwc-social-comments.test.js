/* globals fixture, suite, test, assert */

import './kwc-social-comments.js';

const basic = fixture`
    <kwc-social-comments></kwc-social-comments>
`;

const loadMore = fixture`
    <kwc-social-comments loader-status="disabled"></kwc-social-comments>
`;


function isVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
}

suite('kwc-social-comments', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-social-comments'));
    });
    test('load more hidden by default', () => {
        const element = basic();
        const button = element.root.querySelector('#loader');
        assert(!isVisible(button));
    });
    test('load more visible when not loading', () => {
        const element = loadMore();
        const button = element.root.querySelector('#loader');
        assert(isVisible(button));
    });
});
