export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  data: T[]
}>
