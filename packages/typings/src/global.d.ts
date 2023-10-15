/**
 * 可迭代对象
 */
export type IterateObject<T = any> = Record<string | symbol, T>

/**
 * 接口返回格式
 */
export interface ReportResult<T = any> {
  data: T
  code: number
  status: 'success' | 'error'
  desc: string
}
