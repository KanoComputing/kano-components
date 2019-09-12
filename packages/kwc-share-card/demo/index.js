import { demo, html } from '@kano/demo-helpers/index.js';
import button from '@kano/styles/button.js';
import { like, comment, remix } from '@kano/icons/ui.js';
import '../kwc-share-card.js';
import '../kwc-share-cover.js';
import { covers } from './data.js';

const cover = html`
<kwc-share-cover></kwc-share-cover>
`;

const styled = html`
<style>
    .styled {
        width: 300px;
        height: 300px;
    }
</style>
<kwc-share-cover class="styled"></kwc-share-cover>
`;

const fallback = html`
<style is="custom-style">
    .custom {
        width: 300px;
        height: 300px;
        --kwc-share-cover-placeholder: red;
    }
</style>
<kwc-share-cover class="custom" sizing="cover" fallback-url="https://goo.gl/GA2cEF">
</kwc-share-cover>
`;

const sound = html`
<style is="custom-style">
    .sound {
        width: 300px;
        height: 150px;
    }
</style>
<kwc-share-cover class="sound"></kwc-share-cover>
`;

const art = html`<style is="custom-style">
.art {
    width: 300px;
    height: 300px;
}
</style>
<kwc-share-cover class="art"></kwc-share-cover>
`;

const sizing = html`
<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    kwc-share-cover.small {
        width: 172px;
        height: 86px;
        max-height: 86px;
        overflow: hidden;
        margin: 2px;
    }
</style>
<div class="wrapper">
    <kwc-share-cover class="small" id="cover-5" fallback-url="https://goo.gl/GA2cEF">
    </kwc-share-cover>
    <kwc-share-cover class="small" id="cover-6" fallback-url="https://goo.gl/GA2cEF">
    </kwc-share-cover>
    <kwc-share-cover class="small" id="cover-7" fallback-url="https://goo.gl/GA2cEF">
    </kwc-share-cover>
    <kwc-share-cover class="small" id="cover-8" fallback-url="https://goo.gl/GA2cEF">
    </kwc-share-cover>
</div>
</div>
`;

demo('kwc-share-cover', cover, (element) => {
    element.imageUrl = covers[0].imageUrl;
    element.spritesheetUrl = covers[0].spritesheetUrl;
});
demo('kwc-share-cover styled', styled, (element) => {
    element.imageUrl = covers[0].imageUrl;
    element.spritesheetUrl = covers[0].spritesheetUrl;
});
demo('kwc-share-cover fallback url', fallback, (element) => {
    element.imageUrl = '//kano.me/broken-url.png';
});
demo('kwc-share-cover sound', sound, (element) => {
    element.imageUrl = covers[2].imageUrl;
});
demo('kwc-share-cover art', art, (element) => {
    element.imageUrl = covers[3].imageUrl;
});
demo('kwc-share-cover sizing', sizing, (element) => {
    const coverEls = element.parentNode.querySelectorAll('kwc-share-cover');
    coverEls[0].imageUrl = covers[0].imageUrl;
    coverEls[0].spritesheetUrl = covers[0].spritesheetUrl;
    coverEls[1].imageUrl = covers[1].imageUrl;
    coverEls[2].imageUrl = covers[2].imageUrl;
    coverEls[3].imageUrl = covers[3].imageUrl;
});

document.head.appendChild(button.content.cloneNode(true));

const card = html`
<style>
    kwc-share-card {
        max-width: 400px;
    }
    #like {
        --button-action-highlight: var(--color-carnation);
    }
    #comment {
        --button-action-highlight: var(--color-azure);
    }
    #custom {
        --button-action-highlight: var(--color-kano-orange);
    }
    .actions {
        display: flex;
        flex-direction: row;
    }
    .btn.action:first-of-type {
        margin-left: 0px;
    }
    .btn.action {
        margin-left: 14px;
    }
</style>

<kwc-share-card id="share-card" title="Kevin86's Goes to the MOON" username="Kevin86" date="2019-05-23T10:48:21.053Z" title-href="https://world.kano.me" username-href="https://world.kano.me">
    <iron-image slot="cover" style="width: 100%; height: 192px;" src="https://hoc-staging.kano.me/assets/images/build_challenges/orbit_moon.svg"
        sizing="cover" preload fade>
    </iron-image>
    <div slot="title-icon" class="icon title-icon"></div>
    <button class="btn action active" id="like" slot="actions">${like}<div>Like</div></button>
    <button class="btn action" id="comment" slot="actions">${comment}<div>Comment</div></button>
    <button class="btn action" id="custom" slot="actions">${remix}<div>Remix</div></button>
</kwc-share-card>
`;

demo('kwc-share-card', card, (element) => {
    const shareCard = element.parentNode.querySelector('kwc-share-card');
    const avatar = {
        urls: {
            circle: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-circle.png',
            landscape: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-landscape.png',
            character: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-character.png',
        },
    };
    const likeAction = shareCard.querySelector('#like');
    const commentAction = shareCard.querySelector('#comment');
    const customAction = shareCard.querySelector('#custom');

    shareCard.set('avatar', avatar);
    likeAction.addEventListener('click', () => {
        console.log('demo', 'liked');
    });
    commentAction.addEventListener('click', () => {
        console.log('demo', 'comment');
    });
    customAction.addEventListener('click', () => {
        console.log('demo', 'custom');
    });
    shareCard.addEventListener('avatar-tapped', () => {
        console.log('demo', 'avatar tapped');
    });
    shareCard.addEventListener('title-tapped', () => {
        console.log('demo', 'title tapped');
    });
    shareCard.addEventListener('username-tapped', () => {
        console.log('demo', 'username tapped');
    });
});

demo('kwc-share-card i18n', card, (element) => {
    const shareCard = element.parentNode.querySelector('kwc-share-card');
    const avatar = {
        urls: {
            circle: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-circle.png',
            landscape: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-landscape.png',
            character: 'https://s3-eu-west-1.amazonaws.com/world.kano.me/users/avatars/568ba6fb26c95db40e5af0e6/avatar-character.png',
        },
    };

    shareCard.byLabel = 'par';
    shareCard.prefixAgo = 'il y a';
    shareCard.suffixAgo = '';
    shareCard.timeAgoLocales = {
        seconds: "moins d'une minute",
        minute: 'environ une minute',
        minutes: 'environ %d minutes',
        hour: 'environ une heure',
        hours: 'environ %d heures',
        day: 'environ un jour',
        days: 'environ %d jours',
        month: 'environ un mois',
        months: 'environ %d mois',
        year: 'un an',
        years: '%d ans',
    };

    shareCard.set('avatar', avatar);
});
