/* globals fixture, suite, test, assert */

import './kwc-share-detail.js';

const basic = fixture`
    <kwc-share-detail></kwc-share-detail>
`;

suite('kwc-share-detail', () => {
    test('instantiating the element works', () => {
        const element = basic();
        assert(element instanceof customElements.get('kwc-share-detail'));
    });
});
