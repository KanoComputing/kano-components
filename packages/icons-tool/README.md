## Generation

Generates svg icon sheet from a collection of svg files. Icons are optinized using https://github.com/svg/svgo.
The default formatter exports a SVG icon sheet ready to be used with `@kano/icons-rendering`

Example:

```js
import { svg } from '@kano/icons-rendering/index.js';

export const logout = svg`...`;
export const login = svg`...`;
export const exit = svg`...`;
export const caret = svg`...`;
// ...

```

## Installation

`yarn global add @kano/icons-tool`

## Usage

Print to console:
`icons-tool generate ./icons`

Generate a file:
`icons-tool generate ./icons -o icons.js`

## Programmatic usage

Use this module to bundle SVG icons with a custom formatter

```js
const iconsTool = require('@kano/icons-tool');

iconsTool.generate({
    sources: './icons',
    formatter: (svgIcon) => `const ${svgIcon.name} = '${svgIcon.content}';`, // Optional
    header: '// Optional header append at the top of the generated file', // Optional
}).then((result) => {
    console.log(result);
});

```