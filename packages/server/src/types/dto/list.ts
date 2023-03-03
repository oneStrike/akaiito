/**
 * 响应的数据类型
 */
export interface IResponseData {
  code: 0 | 1 | 400 | 404 | 401 | 403 | 500
  status: 'success' | 'error'
  data?: any
  desc?: string
}

/**
 * dot 校验失败的错误信息
 */
export interface IDtoErrorDetails {
  message: string
  path: string[]
  type: string
  context: {
    name: string | undefined
    label: string
    key: string
    regex?: string
    value?: any
    invalids?: any[]
  }
}

/**
 * 列表通用查询数据
 */
export interface ListQueryOptions {
  pageIndex?: number
  pageSize?: number
  sort?: 'asc' | 'desc' | ''
  sortField?: string
}

/**
 * 通过列表返回数据
 */
export interface ListResponseRes<T> extends ListQueryOptions {
  list: T[]
  count: number
  total: number
}
