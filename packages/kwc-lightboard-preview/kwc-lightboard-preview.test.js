import './kwc-lightboard-preview.js';

const basic = fixture`
    <kwc-lightboard-preview></kwc-lightboard-preview>
`;

suite('kwc-lightboard-preview', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-lightboard-preview'));
    });
});
