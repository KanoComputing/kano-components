import * as ui from '../ui.js';
import * as parts from '../parts.js';
import * as social from '../social.js';


function getGroup(g, name) {
    const all = Object.keys(g).map((k) => {
        return `<div class="item"><div class="icon">${g[k].innerHTML}</div><div>${k}</div></div>`;
    }).join('');

    return `<h3>${name}</h3><div class="group">${all}</div>`;
}

document.body.innerHTML = `
    ${getGroup(ui, 'UI')}
    ${getGroup(parts, 'Parts')}
    ${getGroup(social, 'Social')}
`;
