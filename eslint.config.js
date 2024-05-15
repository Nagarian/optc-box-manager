import eslint from '@eslint/js'
import jsxAlly from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'eslint.config.js',
      'vite.config.ts',
      'dist/',
      'src/optcdb/',
      'src/scripts/',
      'public/',
      // 'src/services/image-cv-worker.ts'
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      reactRecommended,
      reactJsxRuntime,
    ],
    plugins: {
      'react-hooks': reactHooks,
      'simple-import-sort': simpleImportSort,
      'jsx-a11y': jsxAlly,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
      ...reactHooks.configs.recommended.rules,
      ...jsxAlly.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-misused-promises': ['off'],
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': ['off'],
      '@typescript-eslint/restrict-template-expressions': ['off'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      "@typescript-eslint/no-unsafe-call": ["warn"],
      "@typescript-eslint/no-unsafe-member-access": ["warn"],
      '@typescript-eslint/no-non-null-assertion': ['warn']
    },
  })
