import vueParser from 'vue-eslint-parser';
import pluginVue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
