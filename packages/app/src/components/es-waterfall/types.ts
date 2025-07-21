import type { AsyncFn } from '@/types/global'

/**
 * 瀑布流组件的属性接口
 */
export interface EsWaterfallProps {
  /**
   * 必需的异步函数，用于获取数据
   */
  api: AsyncFn

  /**
   * 可选的自动加载标志，决定组件是否在初始化时自动加载数据
   * @default true
   */
  autoLoad?: boolean

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
   * 图片默认高度，用于高度估算，单位为rpx
   * @default 240
   */
  defaultImageHeight?: number

  /**
   * 标题每行字符数，用于高度计算
   * @default 12
   */
  titleCharsPerLine?: number

  /**
   * 标题最大行数
   * @default 2
   */
  titleMaxLines?: number

  /**
   * 标题行高，单位为rpx
   * @default 40
   */
  titleLineHeight?: number

  /**
   * 卡片基础高度（不包括图片和标题），单位为rpx
   * @default 160
   */
  cardBaseHeight?: number

  /**
   * 防抖延迟时间，单位为毫秒
   * @default 100
   */
  debounceDelay?: number
}

/**
 * 瀑布流组件实例的方法与状态接口
 */
export interface EsWaterfallInstance {
  /**
   * 刷新数据的方法
   */
  refresh: AsyncFn

  /**
   * 发送请求的方法
   */
  sendRequest: AsyncFn

  /**
   * 当前列表的数据状态
   */
  listData: {
    /**
     * 列表中的数据项数组
     */
    data: any[]

    /**
     * 数据总条数
     */
    total: number

    /**
     * 当前页码
     */
    offset: number

    /**
     * 每页显示的条目数量
     */
    limit: number
  }

  /**
   * 瀑布流数据状态
   */
  waterfallData: {
    /**
     * 左列数据
     */
    leftColumn: any[]

    /**
     * 右列数据
     */
    rightColumn: any[]
  }
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