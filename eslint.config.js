import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

const customGlobals = {
  TomSelect: 'readable',
};

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      globals: {
        ...customGlobals,
        ...globals.browser,
        ...globals.jquery,
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
    settings: {
      'prettier/prettier': prettierConfig,
    },
  },
];
