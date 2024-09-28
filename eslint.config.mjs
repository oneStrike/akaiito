import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    vue: true,
    typescript: true,
    lessOpinionated: false,
    ignores: ['**/.hbuilderx/**', '**/apis/**', './packages/server'],
  },
  {
    rules: {
      'no-console': 'off',
      'antfu/no-top-level-await': 'off',
      'antfu/if-newline': 'off',
      'style/brace-style': 'off',
      'style/arrow-parens': 'off',
    },
  },
)
