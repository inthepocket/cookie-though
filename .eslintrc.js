module.exports = {
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['class'] }],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      pragma: 'h',
      version: '18.0.0',
    },
  },
  ignorePatterns: ['jest.config.js', '.eslintrc.js', 'astro.config.mjs'],
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx', '*.d.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      parserOptions: {
        project: './tsconfig.test.json',
      },
    },
  ],
};
