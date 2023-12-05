/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    uni: true,
    wx: true,
    plus: true,
    ROUTES: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 2022
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
}
