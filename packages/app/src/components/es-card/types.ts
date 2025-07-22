/**
 * 卡片组件类型定义
 */

/**
 * 卡片尺寸类型
 */
export type CardSize = 'small' | 'medium' | 'large'

/**
 * 卡片阴影类型
 */
export type CardShadow =
  | 'none'
  | 'small'
  | 'medium'
  | 'large'
  | 'always'
  | 'hover'

/**
 * EsCard 组件属性接口
 */
export interface EsCardProps {
  /** 阴影 */
  shadow?: 'none' | 'small' | 'medium' | 'large'
  /** 圆角 */
  radius?: 'none' | 'small' | 'medium' | 'large'
  /** 内边距 */
  padding?: 'none' | 'small' | 'medium' | 'large'
  /** 是否可点击 */
  clickable?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义样式 */
  customStyle?: string
  /** 自定义类名 */
  customClass?: string
}

/**
 * EsCard 组件实例接口
 */
export interface EsCardInstance {
  // 预留扩展方法
}
