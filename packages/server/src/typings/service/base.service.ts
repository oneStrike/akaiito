export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  list: T[]
}>

export type WhereOptions<T> = {
  id?: any
  excludes?: string[]
  orderBy?: string
  AND?: Partial<T> | Partial<T>[]
  OR?: Partial<T>[]
  NOT?: Partial<T> | Partial<T>[]
}
