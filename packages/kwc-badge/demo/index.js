import { html, demo } from '@kano/demo-helpers/index.js';
import '../kwc-badge.js';

const simple = html`
<kwc-badge title="Welcome Cupcake"
            criteria="Sign up to Kano"
            description="Welcome, maker! Here’s a cupcake"
            image-url="https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/welcome-cupcake.svg"
            unlocked></kwc-badge>
<kwc-badge title="Welcome Cupcake"
            criteria="Sign up to Kano"
            current-user
            description="Welcome, maker! Here’s a cupcake"
            image-url="https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/welcome-cupcake.svg"
            unlocked></kwc-badge>
`;
const cactus = html`
<kwc-badge title="Clingy Cactus" criteria="Follow 5 users" description="You’re following 5 Kanoers!" image-url="https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/clingy-cactus.svg"></kwc-badge>
<kwc-badge title="Clingy Cactus" criteria="Follow 5 users" description="You’re following 5 Kanoers!" image-url="https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/static/gamification/badges/clingy-cactus.svg"></kwc-badge>
`;

demo('kwc-badge unlocked', simple);
demo('kwc-badge locked', cactus);
