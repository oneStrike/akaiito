/**
 * 瀑布流组件的属性接口
 */
export interface EsWaterfallProps {
  /**
   * 列表数据
   */
  data: any[]

  /**
   * 列间距，单位为rpx
   * @default 24
   */
  columnGap?: number

  /**
   * 行间距，单位为rpx
   * @default 24
   */
  rowGap?: number

  /**
   * 容器左右内边距，单位为rpx
   * @default 24
   */
  padding?: number

  /**
   * 图片字段名，用于获取图片URL
   * @default 'thumbnail'
   */
  imageField?: string

  /**
   * 图片默认高度，用于高度估算，单位为rpx
   * @default 240
   */
  defaultImageHeight?: number

  /**
   * 防抖延迟时间，单位为毫秒
   * @default 100
   */
  debounceDelay?: number

  /**
   * 唯一标识字段名
   * @default 'id'
   */
  idField?: string

  /**
   * 展示模式
   * @default 'image'
   */
  mode?: 'card' | 'image'
}

/**
 * 瀑布流组件实例的方法与状态接口
 */
export interface EsWaterfallInstance {
  /**
   * 重新计算瀑布流布局
   */
  recalculate: () => Promise<void>

  /**
   * 瀑布流数据状态
   */
  waterfallData: WaterfallData
}

/**
 * 瀑布流数据接口
 */
export interface WaterfallData {
  /**
   * 左列数据
   */
  leftColumn: any[]

  /**
   * 右列数据
   */
  rightColumn: any[]
}

/**
 * 图片尺寸接口
 */
export interface ImageSize {
  /**
   * 图片宽度
   */
  width: number

  /**
   * 图片高度
   */
  height: number
}

/**
 * 列高度缓存接口
 */
export interface ColumnHeights {
  /**
   * 左列高度
   */
  left: number

  /**
   * 右列高度
   */
  right: number
}
