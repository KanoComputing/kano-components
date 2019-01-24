import { flush } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import './kwc-badge-listing.js';

const basic = fixture`
<kwc-badge-listing></kwc-badge-listing>
`;

function setBadges(element) {
    element.badges = [{
        title: 'Welcome cupcake!',
        description: 'Welcome, maker! Here’s a cupcake.',
        criteria: 'Sign-up to Kano',
        imageUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/welcome-cupcake.svg',
        id: 'welcome-cupcake',
        unlocked: true,
        date: '2017-05-08T14:17:44.553Z',
    }, {
        title: 'Challenger',
        description: 'High-Five🖐 You’ve completed your first challenge!',
        criteria: 'Complete 1 challenge',
        imageUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/challenger.svg',
        id: 'challenger',
        unlocked: true,
        date: '2017-06-13T10:06:32.819Z',
    }];
}

suite('kwc-badge-listing', () => {
    let element;

    setup(() => {
        element = basic();
    });

    test('instantiating the element works', () => {
        assert(element instanceof customElements.get('kwc-badge-listing'));
    });

    test('should have currentUser set false by default', () => {
        assert.equal(element.currentUser, false);
    });

    test('should have badges set to an empty array by default', () => {
        assert.isArray(element.badges);
    });

    test('should allow the badges to be set', () => {
        setBadges(element);
        assert.isArray(element.badges);
        assert.lengthOf(element.badges, 2);
    });

    test('should populate the badges when badges are set', () => {
        setBadges(element);
        flush();
        const children = element.root.querySelectorAll('kwc-badge');
        assert.lengthOf(children, 2);
    });
});
