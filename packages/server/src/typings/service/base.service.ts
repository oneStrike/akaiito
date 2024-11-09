export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  list: T[]
}>
