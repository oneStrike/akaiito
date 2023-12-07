export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  data: T[]
}>

export type WhereOptions<T> = Partial<T> & {
  AND?: Partial<T> | Partial<T>[]
  OR?: Partial<T>[]
  NOT?: Partial<T> | Partial<T>[]
}
