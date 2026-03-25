import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import prettierConfig from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { configs as tseslintConfigs } from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist', 'node_modules', 'src/lib/**/*.js']),
    stylistic.configs['disable-legacy'],
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslintConfigs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefreshPlugin.configs.vite,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.app.json',
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@stylistic/no-multiple-empty-lines': [
                'error',
                {
                    max: 1,
                    maxEOF: 1,
                    maxBOF: 0,
                },
            ],
            '@stylistic/spaced-comment': [
                'error',
                'always',
                {
                    line: {
                        markers: ['/'],
                        exceptions: ['-', '+'],
                    },
                    block: {
                        markers: ['!'],
                        exceptions: ['*'],
                        balanced: true,
                    },
                },
            ],
            '@stylistic/function-paren-newline': ['error', 'consistent'],
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'no-unused-vars': 'off',
            'react/prop-types': 'off',
        },
    },
    prettierConfig,
]);
