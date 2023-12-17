module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', 'jsx-a11y'],
    rules: {
        'react/prop-types': 0,
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.jsx', '.js'],
                    },
                },
            },
            node: {
                extensions: ['.js', '.jsx'],
                moduleDirectory: ['node_modules'],
            },
        },
        react: {
            version: 'detect',
        },
    },
    globals: {
        debounce: true,
        animateValue: true,
        times: true,
        getCssVar: true,
        scrollama: true,
        L: true,
        pequeno: true,
        mobileMediaQuery: true,
        IS_IOS: true,
        autoComplete: true,
        uniqBy: true,
        tippy: true,
        Chart: true,
        workbox: true,
        importScripts: true,
        quicklink: true,
        Hammer: true,
        dataLayer: true,
        React: true,
        JSZip: true,
    },
};
