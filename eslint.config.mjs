import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'node_modules',
      '**/node_modules/**',
      'public/',
      'public/**/',
      'dist',
      '**/dist/**',
      '.vscode',
      '**/.vscode/**',
      '.history',
      '**/.history/**',
      '.idea',
      '**/.idea/**',
      'src/types',
      'src/types/**',
      'postcss.config.js',
      'postcss.config.js/**',
    ],
    vue: true,
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
)
