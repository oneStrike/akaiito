export interface EsTextProps {
  cn?: boolean // 是否转换语言  繁体 -> 简体
  text?: string | number // 文本内容
  size?: string | number // 文字大小
  bold?: boolean // 是否加粗
  color?: string // 文本颜色
  lineClamp?: number // 文本行数
  block?: boolean // 是否块级元素
}
