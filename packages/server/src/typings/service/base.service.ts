import type { IterateObject } from '@akaiito/typings/src'

export type FindPageResponse<T> = Promise<{
  pageSize: number
  pageIndex: number
  total: number
  list: T[]
}>

export type WhereOptions<T> = {
  id?: number | IterateObject
  AND?: Partial<T> | Partial<T>[]
  OR?: Partial<T>[]
  NOT?: Partial<T> | Partial<T>[]
}

export type PrismaFindOptions<T = IterateObject> = {
  orderBy?: string
  pageSize?: number
  pageIndex?: number
  excludes?: string[]
  fuzzy?: { field: string; pos: string }[] | string[]
  where?: WhereOptions<T>
} & IterateObject
