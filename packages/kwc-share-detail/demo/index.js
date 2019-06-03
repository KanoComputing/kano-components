import { demo, html } from '@kano/demo-helpers/index.js';
import * as data from './data.js';
import '../kwc-social-comments.js';
import '../kwc-share-detail.js';

const comments = html`
<kwc-social-comments></kwc-social-comments>
`;
const shareDetail = html`
<kwc-share-detail></kwc-share-detail>
`;

demo('kwc-social-comments', comments, (element) => {
    element.comments = data.comments.entries;
    element.user = data.user;
    element.featured = data.share.featured;
});
demo('kwc-social-comments as admin', comments, (element) => {
    element.comments = data.comments.entries;
    element.likes = [];
    element.user = data.admin;
    element.featured = data.share.featured;
});

demo('kwc-share-detail', shareDetail, (element) => {
    element.shareData = data.share;
    element.comments = data.comments;
    element.likes = data.share.likes;
    element.currentUser = data.user;
    element.featured = data.share.featured;
    element.addEventListener('view-user', (e) => {
        alert(`View user ${e.detail.id}`);
    });
    element.addEventListener('action-click', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
    element.addEventListener('social-share', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
});

demo('kwc-share-detail with remix', shareDetail, (element) => {
    element.shareData = data.share;
    element.canRemix = true;
    element.comments = data.comments;
    element.likes = [];
    element.currentUser = data.admin;
    element.featured = data.share.featured;
    element.addEventListener('view-user', (e) => {
        alert(`View user ${e.detail.id}`);
    });
    element.addEventListener('action-click', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
    element.addEventListener('social-share', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
});

demo('kwc-share-detail as author', shareDetail, (element) => {
    element.shareData = data.share;
    element.canRemix = true;
    element.comments = data.comments;
    element.likes = data.share.likes;
    element.currentUser = data.author;
    element.featured = data.share.featured;
    element.related = data.relatedShares;
    element.addEventListener('view-user', (e) => {
        alert(`View user ${e.detail.id}`);
    });
    element.addEventListener('action-click', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
    element.addEventListener('social-share', (e) => {
        alert(`Someone clicked on ${e.detail.action}`);
    });
});


demo('kwc-share-detail i18n', shareDetail, (element) => {
    element.shareData = data.share;
    element.canRemix = true;
    element.comments = data.comments;
    element.likes = data.share.likes;
    element.currentUser = data.author;
    element.featured = data.share.featured;
    element.related = data.relatedShares;

    element.byLabel = 'par';
    element.remixLabel = 'Remixer';
    element.viewCodeLabel = 'Voir code';
    element.deleteLabel = 'Supprimer';
    element.likeCountLabel = 'aiment';
    element.commentCountLabel = 'commentaires';
    element.viewsCountLabel = 'vues';
    element.moreFromLabel = 'Voir plus de creations par';
    element.wandSpellLabel = 'Appuyez sur le bouton de votre baguette pour voir les charmes de cette creation';
    element.partsUsedLabel = 'Objets utilises';
    element.shareLabel = 'Partager';
    element.flagLabel = 'Reporter';
    element.unflagLabel = 'Ne plus reporter';

    const coms = element.commentsElement;
    coms.loadMoreLabel = 'voir plus';
    coms.retryLabel = 're-essayer';
    coms.agoSuffix = '';
    coms.agoPrefix = 'il y a';
    coms.submitLabel = 'Commenter';
    coms.cancelLabel = 'Annuler';
    coms.timeAgoLocales = {
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
});
