import { demo, html } from '@kano/demo-helpers/index.js';
import '../kwc-lightboard-preview.js';

const s30 = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" width="30"></kwc-lightboard-preview>
`;
const s60 = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" width="60"></kwc-lightboard-preview>
`;
const s90 = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" width="90"></kwc-lightboard-preview>
`;
const s150 = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" width="150"></kwc-lightboard-preview>
`;
const s300 = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" width="300"></kwc-lightboard-preview>
`;
const noWidth = html`
<kwc-lightboard-preview src="../demo-assets/595a6c169f797577bd72bd70.png" fps="24"></kwc-lightboard-preview>
`;

demo('30px', s30);
demo('60px', s60);
demo('90px', s90);
demo('150px', s150);
demo('300px', s300);
demo('No Width (default 100%), 24 FPS', noWidth);
