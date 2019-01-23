import { html, demo } from '@kano/demo-helpers/index.js';
import { button } from '../button.js';

document.head.appendChild(button.content.cloneNode(true));

const basic = html`
<button class="btn l">Large</button>
<button class="btn">Medium</button>
<button class="btn s">Small</button>
`;
demo('Default', basic);

const secondary = html`
<button class="btn secondary l">Large</button>
<button class="btn secondary">Medium</button>
<button class="btn secondary s">Small</button>
`;
demo('Secondary', secondary);

const disabled = html`
<button disabled class="btn l">Large</button>
<button disabled class="btn">Medium</button>
<button disabled class="btn s">Small</button>
`;
demo('Disabled', disabled);

const action = html`
<style>
    button.btn.action {
        --button-action-highlight: red;
    }
</style>
<button class="btn action">
    <svg viewBox="0 0 64 64">
        <rect x="0" y="0" width="64" height="64"></rect>
    </svg>
    <div>Action</div>
</button>
<button class="btn action active">
    <svg viewBox="0 0 64 64">
        <rect x="0" y="0" width="64" height="64"></rect>
    </svg>
    <div>Action</div>
</button>
`;

demo('Action', action);
