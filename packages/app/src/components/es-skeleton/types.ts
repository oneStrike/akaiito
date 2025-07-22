/**
 * 骨架屏组件类型定义
 */

/**
 * 头像尺寸类型
 */
export type AvatarSize = 'small' | 'default' | 'large'

/**
 * 形状类型
 */
export type Shape = 'circle' | 'square' | 'rounded'

/**
 * 骨架屏组件属性接口
 */
export interface SkeletonProps {
  /**
   * 是否显示动画效果
   * @default true
   */
  animated?: boolean

  /**
   * 是否显示头像骨架
   * @default false
   */
  avatar?: boolean

  /**
   * 头像尺寸
   * @default 'default'
   */
  avatarSize?: AvatarSize

  /**
   * 头像形状
   * @default 'circle'
   */
  avatarShape?: Shape

  /**
   * 是否显示标题骨架
   * @default false
   */
  title?: boolean

  /**
   * 标题宽度
   * @default '40%'
   */
  titleWidth?: string

  /**
   * 是否显示段落骨架
   * @default false
   */
  paragraph?: boolean

  /**
   * 段落行数
   * @default 3
   */
  paragraphRows?: number

  /**
   * 段落每行宽度数组
   * @default ['100%', '80%', '60%']
   */
  paragraphWidths?: string[]

  /**
   * 是否显示图片骨架
   * @default false
   */
  image?: boolean

  /**
   * 图片宽度
   * @default '100%'
   */
  imageWidth?: string

  /**
   * 图片高度
   * @default '200rpx'
   */
  imageHeight?: string

  /**
   * 图片形状
   * @default 'square'
   */
  imageShape?: Shape

  /**
   * 是否显示按钮骨架
   * @default false
   */
  button?: boolean

  /**
   * 按钮数量
   * @default 1
   */
  buttonCount?: number

  /**
   * 按钮宽度
   * @default '120rpx'
   */
  buttonWidth?: string

  /**
   * 是否显示列表项骨架
   * @default false
   */
  listItem?: boolean

  /**
   * 是否显示卡片骨架
   * @default false
   */
  card?: boolean
}

/**
 * 骨架屏组件实例接口
 */
export interface SkeletonInstance {
  // 预留扩展方法
}
