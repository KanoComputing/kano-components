const iconsTool = require('../index');
const mockFS = require('mock-fs');
const { assert } = require('chai');

suite('icons-tool', () => {
    test('default formatter', () => {
        const contents = '<svg>test</svg>';
        mockFS({
            '/icons/test.svg': contents,
        });
        return iconsTool.generate({ sources: '/icons' })
            .then((result) => {
                assert.equal(result, `export const test = \`${contents}\`;`);
            });
    });
    test('file name', () => {
        const contents = '<svg>test</svg>';
        mockFS({
            '/icons/test-dashed.svg': contents,
        });
        return iconsTool.generate({ sources: '/icons' })
            .then((result) => {
                assert.equal(result, `export const testDashed = \`${contents}\`;`);
            });
    });
    test('duplicate name', () => {
        const contents = '<svg>test</svg>';
        mockFS({
            '/icons/test-duplicate.svg': contents,
            '/icons/testDuplicate.svg': contents,
        });
        return iconsTool.generate({ sources: '/icons' })
            .then(() => {
                throw new Error('Should not generate file with duplicate names');
            }, (e) => {
                assert.equal(e.message, 'Could not create icons file: \'test-duplicate\' and \'testDuplicate\' will create the duplicate name \'testDuplicate\'');
            });
    });
    teardown(() => {
        mockFS.restore();
    });
});
