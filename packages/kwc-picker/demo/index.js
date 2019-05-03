import { demo, html } from '@kano/demo-helpers/index.js';
import '../kwc-picker.js';

const simple = html`
    <kwc-picker selected-index="4"></kwc-picker>
`;

const noIcons = html`
    <kwc-picker selected-index="4"></kwc-picker>
`;

const filter = html`
    <kwc-picker selected-index="4" name="Kano" icon="https://goo.gl/1bdvq5" filter filterOn="label"></kwc-picker>
`;

const items = [
    {
        label: 'Random',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'All assets',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'Thingy',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'Random',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'Feather',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'My Pumpkin',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'My Wand',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'Harry!',
        img: 'https://goo.gl/7SWbab',
    },
    {
        label: 'Thingy 9',
        img: 'https://goo.gl/7SWbab',
    },
];

demo('kwc-picker simple example', simple, (element) => {
    element.items = items;
    element.addEventListener('selected-changed', (e) => {
        console.log(e.detail);
    });
});

demo('kwc-picker no icons', noIcons, (element) => {
    const itemsWithoutIcons = [
        {
            label: 'Random',
        },
        {
            label: 'All assets',
        },
        {
            label: 'Thingy',
        },
        {
            label: 'Random',
        },
        {
            label: 'Feather',
        },
        {
            label: 'My Pumpkin',
        },
        {
            label: 'My Wand',
        },
        {
            label: 'Harry!',
        },
        {
            label: 'Thingy 9',
        },
    ];

    element.items = itemsWithoutIcons;
    element.addEventListener('selected-changed', (e) => {
        console.log(e.detail);
    });
});

demo('kwc-picker with filter', filter, (element) => {
    element.items = items;
    element.addEventListener('selected-changed', (e) => {
        console.log(e.detail);
    });
});
