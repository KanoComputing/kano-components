module.exports = {
    extends: "@kano",
    rules: {
        'no-underscore-dangle': ['off'],
        'import/no-extraneous-dependencies': ['off'],
        'import/prefer-default-export': ['off'],
        'no-param-reassign': ['off'],
        'lines-between-class-members': ["error", "never"],
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    globals: {
        import: true,
    },
    overrides: [
        {
            files: ['*.test.js', 'packages/icons-tool/test/**/*.js'],
            globals: {
                fixture: true,
                suite: true,
                test: true,
                assert: true,
                setup: true,
                teardown: true,
            }
        },
        {
            files: ['packages/*/demo/*.js'],
            rules: {
                'no-console': ['off'],
                'no-alert': ['off'],
            },
        },
    ],
};
