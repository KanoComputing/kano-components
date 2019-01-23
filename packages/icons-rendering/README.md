# Icons rendering

A small set of functions to help organizing the rendering of SVG icons with HTML templates.

## Create the template

Keeping your SVG icons in memory as HTML template is efficient as the browser can copy the DOM tree really fast.
You can create the template using the `svg` string litteral tag.
This can be used to create a SVG icon sheet with a whole set of icons.

```js
import { svg } from '@kano/icons-rendering/index.js';

const svgTemplate = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"></svg>`;

```

## Render the icon

Rendering an icon by embedding its svg is the most efficient way to do it, you can clone the template to append its contents for a quick icon injection:

```js

const { content } = svgTemplate.cloneNode(true);

el.appendChild(content);

```

If you do not control where the icon will be rendered and a src is required, you can use the `dataURI` method:

```js
import { svg, dataURI } from '@kano/icons-rendering/index.js';

const svgTemplate = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"></svg>`;

const imageSrc = dataURI(svgTemplate);

```
