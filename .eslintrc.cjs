module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/prop-types': 0,
        'no-unused-vars': 'warn',
        'no-console': 'warn',
        quotes: ['error', 'single'],
        'jsx-quotes': ['error', 'prefer-double'],
        'prefer-const': 'error',
        indent: ['warn', 4],
        'max-len': ['off', { code: 120 }],
        semi: ['warn', 'always'],
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'always-and-inside-groups'
            }
        ]
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
            @use "@/styles/mixins.scss" as *;
            `
            }
        }
    }
};
