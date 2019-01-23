import { html, demo } from '@kano/demo-helpers/index.js';
import '../kwc-badge-listing.js';
import { badges } from './data.js';

const simple = html`
<kwc-badge-listing></kwc-badge-listing>
`;

const user = html`
<kwc-badge-listing current-user></kwc-badge-listing>
`;

demo('kwc-badge-listing', simple);
demo('kwc-badge-listing from another user', simple, (element) => {
    element.badges = badges;
});
demo('kwc-badge-listing from surrent user', user, (element) => {
    element.badges = badges;
});
