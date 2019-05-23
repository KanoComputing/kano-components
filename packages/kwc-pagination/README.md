# \<kwc-pagination\>

A configurable page navigation bar.

<img width="673" src="https://user-images.githubusercontent.com/169328/58256498-04f85d80-7d67-11e9-84ee-b81c29fcece3.png">


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
 - `lastPage`: Turn on or off showing the last page at the end

This element dispatches one event: `go-to-page`. This event signals that the user chose a page to go to. Use this data to update the selected page
