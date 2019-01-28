import { html, demo } from '@kano/demo-helpers/index.js';
import '../kwc-follow-item.js';

const simple = html`
<kwc-follow-item username="FancyPants" level="7" avatar="./avatar.png"></kwc-follow-item>
`;
const followed = html`
<kwc-follow-item username="FancyPants" level="7" avatar="./avatar.png" followed></kwc-follow-item>
`;

demo('kwc-follow-item', simple);
demo('kwc-follow-item followed', followed);
