#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
const svgTool = require('../index');
const rendererFormatter = require('../lib/formatters/renderer.js');

const { argv } = yargs.command('generate <sources>', 'generates the icon sheet', (y) => {
    y.positional('sources', {
        describe: 'location of the SVG sources',
        type: 'string',
    }).option('o', {
        alias: 'output',
        type: 'string',
    });
});

const { sources, output } = argv;

svgTool.generate({
    sources,
    formatter: rendererFormatter,
    header: 'import { svg } from \'@kano/icons-rendering/index.js\';\n',
})
    .then((result) => {
        if (!output) {
            /* eslint no-console: "off" */
            console.log(result);
            process.exit();
        }
        const absPathToOutput = path.isAbsolute(output) ? output : path.join(process.cwd(), output);
        fs.writeFileSync(absPathToOutput, result, 'utf-8');
    });
