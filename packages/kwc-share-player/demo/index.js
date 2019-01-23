import { html, demo } from '@kano/demo-helpers/index.js';
import '../kwc-share-player.js';

const player = html`
<kwc-share-player></kwc-share-player>
`;

demo('kwc-share-player kano-code', player, (element) => {
        const shareData = {
            "id": "595a6c169f797577bd72bd70",
            "app": "make-apps",
            "attachments": {
                "cover_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/5b05960a2700270fdce45de2.png",
                "attachment_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/attachments/5b05960a2700270fdce45de2.html",
                "workspace_info_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/workspace-info/5b05960a2700270fdce45de2.json",
            },
            "cover_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/covers/5b05960a2700270fdce45de2.png",
            "attachment_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/attachments/5b05960a2700270fdce45de2.html",
            "workspace_info_url": "https://s3-eu-west-1.amazonaws.com/world.kano.me.staging/share-items/workspace-info/5b05960a2700270fdce45de2.json",
            "slug": "particle-flow"
        };
        element.share = shareData;
});

demo('kwc-share-player art', player, (element) => {
    element.share = {
        id: "59dfbdc78276043dd9510cc9",
        app: "kano-draw",
        cover_url: "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/covers/59dfbdc78276043dd9510cc9.png",
        attachment_url: "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/attachments/59dfbdc78276043dd9510cc9.draw"
    };
});

demo('kwc-share-player music', player, (element) => {
    element.share = {
        title: 'My song from outer space',
        cover_url: 'http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/0/0b/Blush.jpg/revision/latest',
        app: "make-music",
        sample_url: "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/samples/581dfcd62204b21a7e99049e.oga"
    };
});

demo('kwc-share-player unknown app type', player, (element) => {
    element.share = {
        id: "59dfbdc78276043dd9510cc9",
        app: "no-such-app",
        cover_url: "https://s3-eu-west-1.amazonaws.com/world.kano.me/share-items/covers/59dfbdc78276043dd9510cc9.png"
    };
});