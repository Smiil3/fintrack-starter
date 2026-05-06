import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    // fichiers de configuration / scripts node (ex: playwright.config.js)
    files: ['*.config.{js,cjs,mjs}', 'playwright.config.js', '.eslintrc.{js,cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['tests/**/*.js'], // ou **/*.test.js si tu préfères
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginReact.configs.flat.recommended,
]);
