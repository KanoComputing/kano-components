# Kano icons

Set of icons to use and re-use across UIs

## Installation

```
yarn add @kano/icons
```

## Usage

```js
// Import the needed icon
import { close } from '@kano/icons/ui.js';

// Create a new instance by cloning the template's content
const instance = close.content.cloneNode(true);

// Add it anywhere, it's just a DOM node
document.body.appendChild(instance);

// If using a string template engine that supports templates, just do
const template = html`
    <div>${close}</div>
`;
```