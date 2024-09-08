import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['packages/server/**'],
    vue: true,
    typescript: true,
  },
  {
    rules: {
      'style/brace-style': 'off',
      'vue/html-indent': 'off',
      'style/arrow-parens': 'off',
      'style/operator-linebreak': 'off',
      'style/indent': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['packages/server/**'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
)
