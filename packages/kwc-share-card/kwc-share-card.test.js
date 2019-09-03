import { flush } from '@polymer/polymer/lib/utils/flush.js';
import { assert, fixture } from '@kano/web-tester/helpers.js';
import { click } from '@polymer/iron-test-helpers/mock-interactions.js';
import './kwc-share-card.js';

const basic = fixture`
    <kwc-share-card></kwc-share-card>
`;

suite('kwc-share-card', () => {
    test('instantiate', () => {
        const el = basic();
        assert(el instanceof customElements.get('kwc-share-card'));
    });
    test('avatar-tapped', (done) => {
        const el = basic();
        flush();
        el.addEventListener('avatar-tapped', () => {
            done();
        });
        const avatar = el.shadowRoot.querySelector('.cover .avatar');
        click(avatar);
    });
    test('username-tapped', (done) => {
        const el = basic();
        flush();
        el.addEventListener('username-tapped', () => {
            done();
        });
        const username = el.shadowRoot.querySelector('.username');
        click(username);
    });
    test('title-tapped', (done) => {
        const el = basic();
        flush();
        el.addEventListener('title-tapped', () => {
            done();
        });
        const title = el.shadowRoot.querySelector('.title');
        click(title);
    });
});
