import type { Config } from 'prettier'

/* prettier config */
export default <Config>{
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'avoid',
  proseWrap: 'always',
  quoteProps: 'preserve',
}
