# <kwc-pagination>

A configurable page navigation bar.

## Installation

Grab it from the NPM repository and add it as a dependency of your project with

```
yarn add @kano/kwc-pagination
```

## Usage

```js
import '@kano/kwc-pagination/kwc-pagination.js';

html`
    <kwc-pagination jump-controls pagination-controls total-pages="360" current-page="7"></kwc-pagination>
`;
```

## API

The following properties are available:

 - `startsOn`: A number defining the start page for the navigation bar
 - `totalPages`: A number defining the total number of pages available
 - `currentPage`: A number defining the selected page
 - `range`: A number defining the number of pages to display between the bar controls
 - `paginationControls`: Turn on or off the next and previous buttons
 - `jumpControls`: Turn on or off the got to last and got to first buttons

This element dispatches one event: `go-to-page`. This event signals that the user chose a page to go to. Use this data to update the selected page
