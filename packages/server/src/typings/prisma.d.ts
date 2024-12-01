import { BasicOrderDto, BasicPageDto } from '@/basic/dto/basic.dto'

export type PrismaInstanceModel = {
  id?: number
  order?: number
  createdAt?: any
  updatedAt?: any
  deletedAt?: any
} & IterateObject

type ExtendProperty<T> = {
  [P in keyof T]: T[P] | { in: T[P][] } | { gte: T[P] } | { lte: T[P] }
}

export type WhereOptions<T> = Partial<ExtendProperty<T>> & {
  AND?: Partial<ExtendProperty<T>> | Partial<ExtendProperty<T>>[]
  OR?: Partial<ExtendProperty<T>>[]
  NOT?: Partial<ExtendProperty<T>> | Partial<ExtendProperty<T>>[]
}

export type PrismaGetCountOptions<T> = {
  where: WhereOptions<T>
}

export type PrismaIsExistsOptions<T> = {
  where: WhereOptions<Partial<T>>
}

export type PrismaCreateOptions<T> = {
  data: Partial<T> & IterateObject
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaUpdateOptions<T> = {
  where: WhereOptions<T>
  data: Partial<T>
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaUpsertOptions<T> = {
  where: WhereOptions<T>
  create: Partial<T>
  update: Partial<T>
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaUpsertBatchOptions<T> = {
  where: WhereOptions<T>
  data: Partial<T>
}

export type PrismaUpdateOrderOptions = BasicOrderDto

export type PrismaDeleteOptions<T> = {
  where: WhereOptions<T>
  select?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaFindUniqueOptions<T> = {
  where: WhereOptions<T> & IterateObject
  select?: {
    [P in keyof T]?: boolean
  }
  include?: {
    [P in keyof T]?: boolean
  } & IterateObject
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaFindPageOptions<T> = {
  where: WhereOptions<T> & BasicPageDto & IterateObject
  like?: {
    [P in keyof T]?: 'contains' | 'startsWith' | 'endsWith'
  }
  take?: number
  skip?: number
  orderBy?: {
    [P in keyof T]?: 'asc' | 'desc'
  }
  select?: {
    [P in keyof T]?: boolean
  } & IterateObject
  omit?: {
    [P in keyof T]?: boolean
  }
}
