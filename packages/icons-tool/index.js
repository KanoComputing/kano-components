const glob = require('glob');
const path = require('path');
const fs = require('fs');
const SVGO = require('svgo');
const defaultFormatter = require('./lib/formatters/default');

const svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true,
    }, {
        removeDoctype: true,
    }, {
        removeXMLProcInst: true,
    }, {
        removeComments: true,
    }, {
        removeMetadata: true,
    }, {
        removeTitle: true,
    }, {
        removeDesc: true,
    }, {
        removeUselessDefs: true,
    }, {
        removeEditorsNSData: true,
    }, {
        removeEmptyAttrs: true,
    }, {
        removeHiddenElems: true,
    }, {
        removeEmptyText: true,
    }, {
        removeEmptyContainers: true,
    }, {
        removeViewBox: false,
    }, {
        cleanupEnableBackground: true,
    }, {
        convertStyleToAttrs: true,
    }, {
        convertColors: true,
    }, {
        convertPathData: true,
    }, {
        convertTransform: true,
    }, {
        removeUnknownsAndDefaults: true,
    }, {
        removeNonInheritableGroupAttrs: true,
    }, {
        removeUselessStrokeAndFill: true,
    }, {
        removeUnusedNS: true,
    }, {
        cleanupIDs: true,
    }, {
        cleanupNumericValues: true,
    }, {
        moveElemsAttrsToGroup: true,
    }, {
        moveGroupAttrsToElems: true,
    }, {
        collapseGroups: true,
    }, {
        removeRasterImages: false,
    }, {
        mergePaths: true,
    }, {
        convertShapeToPath: true,
    }, {
        sortAttrs: true,
    }, {
        removeDimensions: true,
    }, {
        removeAttrs: { attrs: '(stroke|fill)' },
    }],
});

function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (m, w) => w.toUpperCase());
}

function checkDuplicates(list) {
    const seen = new Map();
    let it;
    for (let i = 0; i < list.length; i += 1) {
        it = list[i];
        if (seen.has(it.safeName)) {
            return [it, seen.get(it.safeName)];
        }
        seen.set(it.safeName, it);
    }
    return false;
}

function generate({ sources, header = '', formatter = defaultFormatter }) {
    const absPathToSources = path.isAbsolute(sources) ? sources : path.join(process.cwd(), sources);

    const svgFilesList = glob.sync(`${absPathToSources}/**/*.svg`);

    const filesContents = svgFilesList
        .map((svgFile) => {
            const content = fs.readFileSync(svgFile, 'utf-8');
            const { name } = path.parse(svgFile);
            const safeName = kebabToCamel(name);
            return {
                content,
                name,
                safeName,
            };
        });
    const dups = checkDuplicates(filesContents);
    if (dups) {
        return Promise.reject(new Error(`Could not create icons file: '${dups[1].name}' and '${dups[0].name}' will create the duplicate name '${dups[0].safeName}'`));
    }
    const tasks = filesContents
        .map(svgIcon => svgo.optimize(svgIcon.content)
            .then(result => formatter({ name: svgIcon.safeName, content: result.data })));

    return Promise.all(tasks)
        .then(results => `${header}${results.join('\n')}`);
}

module.exports = { generate };
