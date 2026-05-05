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
    files: ['tests/**/*.js'], // ou **/*.test.js si tu préfères
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  pluginReact.configs.flat.recommended,
]);
