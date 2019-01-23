import './kwc-user-about.js';

const basic = fixture`
    <kwc-user-about></kwc-user-about>
`;

suite('kwc-user-about', () => {
    test('instanciate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-user-about'));
    });
});
