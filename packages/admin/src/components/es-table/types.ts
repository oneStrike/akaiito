import type { TableColumnCtx } from 'element-plus'
import type { Ref } from 'vue'
import type { EsToolbarProps } from '@/components/es-toolbar/types'

export type EsTableColumn = (Partial<TableColumnCtx<any>> & {
  defaultValue?: string
  columnType?: 'image' | 'link' | 'date' | 'index'
  index?: number
})[]
/**
 * 分页响应数据的通用接口
 * @template T 列表项的数据类型
 */
export interface PageResponse<T = any> {
  /* 当前页码 */
  pageIndex: number
  /* 每页条数 */
  pageSize: number
  /* 总条数 */
  total: number
  /* 数据列表 */
  list: T[]
}

/**
 * 异步请求函数类型定义
 * @template T 列表项的数据类型
 * @param params 请求参数
 * @returns Promise<PageResponse<T>> 返回分页响应数据
 */
export type RequestApiFunction<T = any> = (
  params: any,
) => Promise<PageResponse<T>>

/**
 * 拖拽接口参数类型定义
 */
export interface DragApiParams {
  /** 拖拽的目标id */
  targetId: number
  /** 当前拖拽数据的id */
  dragId: number
}

/**
 * 拖拽接口函数类型定义
 * @param params 拖拽参数
 * @returns Promise<any> 返回拖拽结果
 */
export type DragApiFunction = (params: DragApiParams) => Promise<any>

export interface EsTableProps<T = IterateObject> {
  /* 表格列配置 */
  columns: EsTableColumn
  /* 异步请求函数，用于获取表格数据（与 tableData 二选一） */
  requestApi?: RequestApiFunction<T>
  /* 静态表格数据（与 requestApi 二选一） */
  tableData?: T[]
  /* 是否显示序号列 */
  tableIndex?: boolean
  /* 是否启用拖拽排序 */
  drag?: boolean
  /* 拖拽接口函数，用于处理拖拽排序 */
  dragApi?: DragApiFunction
  /* 是否显示多选框 */
  selection?: boolean
  /* 是否显示加载状态 */
  loading?: boolean
  /* 默认显示值（当单元格数据为空时） */
  defaultValue?: string
  /* 工具栏配置 */
  toolbar?: EsToolbarProps['toolbar']
  /* 筛选器配置 */
  filter?: EsToolbarProps['filter']
}

export interface dragEndEvent {
  targetId: number
  targetOrder: number
  originId: number
  originOrder: number
}

/**
 * 分页参数接口
 */
export interface PaginationParams {
  /** 当前页码（1基索引） */
  pageIndex: number
  /** 每页条数 */
  pageSize: number
}

/**
 * EsTable 组件实例类型定义
 * 定义了组件对外暴露的属性和方法
 */
export interface EsTableInstance {
  /** 计算表格高度的方法 */
  computedTableHeight: () => void
  /** 获取表格数据的方法 */
  fetchTableData: () => Promise<void>
  /** 表格数据（只读） */
  tableData: Readonly<Ref<any[]>>
  /** 数据总数（只读） */
  total: Readonly<Ref<number>>
  /** 重置表格数据和分页（回到第一页并刷新数据） */
  reset: () => void
  /** 刷新表格数据（保持当前分页） */
  refresh: (subParams?: IterateObject) => void
  /** 当前分页参数（只读） */
  paginationParams: Readonly<Ref<PaginationParams>>
}
