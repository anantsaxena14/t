import js from '@eslint/js';
import nextPlugin from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  js.configs.recommended,
  nextPlugin,
  ...tseslint.configs.recommended,
  prettierConfig, // Disables conflicting rules
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          printWidth: 100,
          trailingComma: 'es5',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
    },
  },

  // Global ignores
  {
    ignores: ['node_modules/', '.next/', 'out/', 'public/', 'dist/'],
  }
);
