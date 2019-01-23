export const comments = {
    entries: [{
        id: '597705341ad1b7228593511c',
        author: {
            id: '59402bb7c511000a713e2d45',
            username: 'jonas12345',
            joined: '2017-06-13T18:15:19.035Z',
        },
        text: 'This is a another really long comment, This is a another really long comment, This is a another really long comment, This is a another really long comment, This is a another really long comment, ',
        date_created: '2017-07-25T08:45:40.812Z',
        flags: [],
    }, {
        id: '597703d71ad1b72285935108',
        author: {
            id: '59402bb7c511000a713e2d45',
            username: 'jonas12345',
            admin_level: 0,
            joined: '2017-06-13T18:15:19.035Z',
        },
        text: 'fun with comments',
        date_created: '2017-07-25T08:39:51.349Z',
        flags: [],
        error: 'Could not post comment',
    }, {
        id: '597703a994e3ff22866cd79c',
        author: {
            id: '59402bb7c511000a713e2d45',
            username: 'jonas12345',
            admin_level: 0,
            joined: '2017-06-13T18:15:19.035Z',
        },
        text: 'testing comments',
        date_created: '2017-07-25T08:39:05.119Z',
        flags: [],
    }],
    page: null,
    limit: 3,
    count: 3,
};
export const share = {
    id: '595cf747bf1189649f1bdd57',
    username: 'jonas12345',
    userId: '5970adcc1ad1b72285933e25',
    app: 'kano-draw',
    title: 'x*x',
    slug: 'xx_10',
    likes: [{ user: '5970adcc1ad1b72285933ef5' }],
    description: 'This share is like very very coolio, init. I like it because it is what it is a nothing more or less.',
    date_created: '2017-07-05T14:27:19.257Z',
    attachments: {
        cover_url: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/595cf747bf1189649f1bdd57.png',
        attachment_url: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/attachments/595cf747bf1189649f1bdd57.draw',
    },
    featured: true,
    views_count: 123,
    cover_url: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/595cf747bf1189649f1bdd57.png',
    hardware: [
        {
            product: 'motion-sensor',
        },
        {
            product: 'lightboard',
        },
        {
            product: 'speaker',
        },
    ],
};

export const user = {
    username: 'nectarsoft',
    id: '5970adcc1ad1b72285933ef5',
    avatar: 'https://s3.amazonaws.com/kano-avatars/default-avatar.svg',
};

export const admin = {
    username: 'admin',
    id: '5970adcc1ad1b72285933ef7',
    avatar: 'https://s3.amazonaws.com/kano-avatars/default-avatar.svg',
    admin_level: 99,
};
export const author = {
    username: 'jonas12345',
    id: '5970adcc1ad1b72285933e25',
    avatar: 'https://s3.amazonaws.com/kano-avatars/default-avatar.svg',
};
export const relatedShares = [
    {
        targetUrl: 'https://world.kano.me/creations/sunny-day',
        imageUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/595cf747bf1189649f1bdd57.png',
    },
    {
        targetUrl: 'https://world.kano.me/creations/sunny-day',
        imageUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/5ac60900163a5764d4d252e1.gif',
    },
    {
        targetUrl: 'https://world.kano.me/creations/sunny-day',
        imageUrl: 'https://s3-us-west-1.amazonaws.com/assets.kano.me/community/make_music.jpg',
    },
    {
        targetUrl: 'https://world.kano.me/creations/sunny-day',
        imageUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/595cf747bf1189649f1bdd57.png',
        spritesheetUrl: 'https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/lightboard-spritesheets/592413756152f967284f1b23.png',
    },
];
