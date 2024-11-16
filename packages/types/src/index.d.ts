// 定义报告结果接口
export interface HttpResponseResult<T = any> {
  data: T // 数据
  code: number // 状态码
  status: 'success' | 'error' // 状态
  message: string // 描述
}

// 定义记录分页选项接口
export interface RecordPaginationOptions {
  pageIndex?: number // 当前页码
  pageSize?: number // 每页大小
  orderBy?: string // 排序配置
}

// 获取函数的参数
type ResolveParameters<T> = T extends (arg: infer P) => void ? P : string

// 获取函数的返回值
export type InferReturnType<T> = T extends (...args: any[]) => any ? ReturnType<T> : T

// 拼接loading
export type JoinLoading<T> = T & { loading: boolean }

// 去除loading
export type OmitLoading<T> = Omit<T, 'loading'>

// 通用选项
export interface AuyOptions {
  label: string
  value: string | number
  disabled?: boolean
}

declare global {
  type IterateObject<T = any> = Record<string, T>
  // 异步函数
  type AsyncFn<T = any> = (p?: T) => Promise<T>
  // 获取列表数据的item
  type ResolveListItem<T> = T extends { list: infer L } ? JoinLoading<L extends any[] ? L[number] : L> : never

  // 获取异步函数的解析值
  type ResolvedReturnType<T> = InferReturnType<T> extends Promise<infer R> ? R : InferReturnType<T>
}
