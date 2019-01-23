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
