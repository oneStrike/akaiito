export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  list: T[]
}>

export interface WhereOptions<T> {
  id?: number | IterateObject
  AND?: Partial<T> | Partial<T>[]
  OR?: Partial<T>[]
  NOT?: Partial<T> | Partial<T>[]
}

export type PrismaFindOptions<T = IterateObject> = {
  startTime?: string
  endTime?: string
  orderBy?: string
  pageSize?: number
  pageIndex?: number
  fuzzy?: { field: string; pos: string }[] | string[]
  where?: WhereOptions<T>
  omit?: Record<string, boolean>
} & IterateObject
