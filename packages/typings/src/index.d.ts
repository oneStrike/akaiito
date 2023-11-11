// 定义泛型类型，用于迭代对象
export type IterateObject<T = any> = Record<string | symbol, T>

// 定义报告结果接口
export interface ReportResult<T = any> {
  data: T // 数据
  code: number // 状态码
  status: 'success' | 'error' // 状态
  desc: string // 描述
}

// 定义记录分页选项接口
export interface RecordPaginationOptions {
  pageIndex?: number // 当前页码
  pageSize?: number // 每页大小
  orderBy?: string // 排序配置
}
