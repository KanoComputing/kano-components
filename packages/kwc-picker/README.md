# kwc-picker

## Basic:

This is the basic one, with only the content to display the items.

<br/>

```html
<kwc-picker items="[[items]]"></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        label: "label 1",
    },
    {
        img: "https://kano.me/img2.png",
        label: "label 2",
    },
];
```

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`

<br/>

## Name:

This is the basic one, with the content and a custom string on top.

<br/>

```html
<kwc-picker items="[[items]]" name="My picker name"></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        label: "label 1",
    },
    {
        img: "https://kano.me/img2.png",
        label: "label 2",
    },
];
```

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`
    - `name`
        - *optional*
        - default is `Assets`

<br/>

## Icon:

This is the basic one, with the content and a custom icon on top.

<br/>

```html
<kwc-picker items="[[items]]" icon="https://goo.gl/1bdvq5"></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        label: "label 1",
    },
    {
        img: "https://kano.me/img2.png",
        label: "label 2",
    },
];
```

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`
    - `icon`
        - *optional*
        - default is the `plus` icon

<br/>

## Selected Index:

This is the basic one, with the content and the value is already been setted by the `selected-index` property.

<br/>

```html
<kwc-picker items="[[items]]" selected-index="1"></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        label: "label 1",
    },
    {
        img: "https://kano.me/img2.png",
        label: "label 2",
    },
];
```

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`
    - `selected-index`
        - *optional*
        - default is `null`

<br/>

## Filter:

With this one, you have a search input on the top to filter on `label`.

<br/>

```html
<kwc-picker items="[[items]]" filter></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        label: "label 1",
    },
    {
        img: "https://kano.me/img2.png",
        label: "label 2",
    },
];
```

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`
    - `filter`
        - *optional*
        - default is `false`

<br/>

## Filter On:

With this one, you have a search input on the top to filter on the `filter-on` value you give it.

<br/>

```html
<kwc-picker items="[[items]]" filter filter-on="text"></kwc-picker>
```

```js
const items = [
    {
        img: "https://kano.me/img1.png",
        text: "text 1",
    },
    {
        img: "https://kano.me/img2.png",
        text: "text 2",
    },
];
```

<br/>

### Properties:

- HTML attributes:
    - `items`
        - *required*
        - default is `[]`
    - `filter`
        - *optional*
        - default is `false`
    - `filter-on`
        - *optional*
        - default is `label`