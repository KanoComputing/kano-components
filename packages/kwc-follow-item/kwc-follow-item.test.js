import './kwc-follow-item.js';

const basic = fixture`
    <kwc-follow-item></kwc-follow-item>
`;

suite('kwc-follow-item', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-follow-item'));
    });
});
