import type { Config } from 'prettier'

/**
 * Prettier代码格式化配置
 * 用于统一生成代码的格式风格
 */
export default <Config>{
  /** 使用空格而非制表符 */
  useTabs: false,
  /** 缩进宽度为2个空格 */
  tabWidth: 2,
  /** 每行最大字符数 */
  printWidth: 120,
  /** 使用单引号 */
  singleQuote: true,
  /** 不使用分号 */
  semi: false,
  /** 尾随逗号：所有可能的地方 */
  trailingComma: 'all',
  /** 箭头函数参数总是使用括号 */
  arrowParens: 'always',
  /** 文档换行方式：总是换行 */
  proseWrap: 'always',
  /** 保留对象属性的引号 */
  quoteProps: 'preserve',
}
