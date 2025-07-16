import type { EsTextProps } from '@/components/es-text/types'

/**
 * 标签项配置接口
 */
export interface EsTabsItem {
  /** 标签显示文本 */
  label: string | number
  /** 标签值，用于标识和回调 */
  value?: string | number
  /** 徽章配置 */
  badge?: {
    /** 徽章数字或文本 */
    value?: number | string
    /** 是否显示红点徽章 */
    dot?: boolean
  }
}

/**
 * EsTabs 组件属性接口
 */
export interface EsTabsProps {
  /** 标签列表数据 */
  tabs: EsTabsItem[]

  /** 激活文字是否加粗 */
  bold?: EsTextProps['bold']

  /** 文字大小 */
  fontSize?: EsTextProps['size']

  /** 激活状态文字颜色 */
  activeColor?: EsTextProps['color']

  /** 非激活状态文字颜色 */
  inactiveColor?: EsTextProps['color']

  /** 是否开启粘性定位 */
  sticky?: boolean

  /** 粘性定位距离顶部高度 */
  positionTop?: number | string

  /** 开启横向滚动所需的最小标签数量 */
  scrollable?: number

  /** 背景颜色 */
  backgroundColor?: string

  /** 底部指示线高度 */
  lineHeight?: number

  /** 开启下拉展开所需的最小标签数量 */
  mapNum?: number
}

/**
 * 标签切换事件数据
 */
export interface EsTabsChangeEvent {
  /** 当前激活标签索引 */
  idx: number
  /** 当前激活标签的值 */
  value?: string | number
}
