# @kano/styles

Shared styles for web projects

## Installation

```
yarn add @kano/styles
```

## Usage

Exported symbols are HTML templates, clone and inject in your page to use the classes.

```js
// Import needed styles
import { mega } from '@kano/kwc-styles/index.js';

// Clone the node
const instance = mega.content.cloneNode(true);

// Add to the head, or shadow root
document.head.appendChild(instance);

// Alternatively, if you use a literal template engine supporting HTML templates
const render = html`
    ${mega}
    <div>
        <button class="btn mega">CLICK</button>
    </div>
`;
```