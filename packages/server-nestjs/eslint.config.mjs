import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
    lessOpinionated: false,
  },
  {
    rules: {
      'no-console': 'off',
      'antfu/no-top-level-await': 'off',
      'antfu/if-newline': 'off',
      'style/brace-style': 'off',
      'style/arrow-parens': 'off',
      'style/indent': 'off',
      'unused-imports/no-unused-vars': 'off',
      'antfu/top-level-function': 'off',
      'style/member-delimiter-style': 'off',
      'style/operator-linebreak': 'off',
      'ts/consistent-type-imports': 'off',
      'format/prettier': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)
