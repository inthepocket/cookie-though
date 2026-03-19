const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const lintFiles = ['src/**/*.{js,jsx,ts,tsx}'];
const scopedTsRecommended = tsPlugin.configs['flat/recommended'].map(config => ({
  ...config,
  files: lintFiles,
}));
const scopedTsTypeChecked = tsPlugin.configs['flat/recommended-type-checked'].map(config => ({
  ...config,
  files: lintFiles,
}));

module.exports = [
  {
    ignores: ['dist/*', 'coverage/**', '.eslintrc.js', 'astro.config.mjs'],
  },
  js.configs.recommended,
  ...scopedTsRecommended,
  ...scopedTsTypeChecked,
  {
    files: ['*.config.js', 'eslint.config.js', 'jest.config.js', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  {
    files: lintFiles,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        CustomEvent: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
  },
  prettierRecommended,
];
