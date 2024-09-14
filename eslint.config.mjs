import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['**/.hbuilderx/**'],
    vue: true,
    lessOpinionated: false,
  },
  {
    rules: {
      'style/brace-style': 'off',
      'vue/html-indent': 'off',
      'style/arrow-parens': 'off',
      'style/operator-linebreak': 'off',
      'style/indent': 'off',
      'no-console': 'off',
      'style/quotes': 'off',
      'antfu/top-level-function': 'off',
    },
  },
  {
    files: ['packages/server/**'],
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
)
