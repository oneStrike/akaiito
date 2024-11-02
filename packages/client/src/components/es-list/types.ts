import type { AsyncFn, IterateObject } from '@/types/global'

/**
 * 定义了EsList组件的属性接口。
 */
export interface EsListProps {
  /**
   * 必需的异步函数，通常用于发起数据请求
   */
  api: AsyncFn

  /**
   * 可选的自动加载标志，决定组件是否在初始化时自动加载数据，默认为true
   */
  autoLoad?: boolean
}

/**
 * 定义了EsList组件实例的方法与状态接口。
 */
export interface EsListInstance {
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
    data: IterateObject[]

    /**
     * 数据总条数
     */
    total: number

    /**
     * 当前页码
     */
    pageIndex: number

    /**
     * 每页显示的条目数量
     */
    pageSize: number
  }
}
