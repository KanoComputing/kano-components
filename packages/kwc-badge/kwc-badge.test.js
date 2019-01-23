import './kwc-badge.js';

const basic = fixture`
    <kwc-badge></kwc-badge>
`;

suite('kwc-badge', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-badge'));
    });
});
