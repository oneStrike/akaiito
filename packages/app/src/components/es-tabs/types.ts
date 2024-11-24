import type { EsTextProps } from '@/components/es-text/types'

interface EsTabsItem {
  // 标题
  text: string | number
  // 值
  value?: string | number
  badge?: {
    // 角标数字
    value?: number | string
    // 角标点
    dot?: boolean
  }
}

export interface EsTabsProps {
  // tabs列表
  tabs: EsTabsItem[]
  // 激活文字是否加粗
  bold?: EsTextProps['bold']
  // 文字大小
  fontSize?: EsTextProps['size']
  // 激活文字颜色
  activeColor?: EsTextProps['color']
  // 失活文字颜色
  inactiveColor?: EsTextProps['color']
  // 是否开启粘性定位
  sticky?: boolean
  // 粘性定位距离顶部高度
  positionTop?: number | string
  // 开启滚动所需要的tab数量
  scrollable?: number
  // 背景颜色
  backgroundColor?: string
  // 底部线条高度
  lineHeight?: number
  // 开启下拉所需要的tab数量
  mapNum?: number
}
