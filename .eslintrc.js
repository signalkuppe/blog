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
        },
    },
    globals: {
        debounce: 'readonly',
        IS_SAFARI: 'readonly',
        scrollama: 'readonly',
        GLightbox: 'readonly',
        L: 'readonly',
    },
};
