import { BasicOrderDto, BasicPageDto } from '@/basic/dto/basic.dto'

export type PrismaInstanceModel = {
  id?: number
  order?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type WhereOptions<T extends PrismaInstanceModel> = {
  id?: number | IterateObject
  AND?: Partial<T> | Partial<T>[]
  OR?: Partial<T>[]
  NOT?: Partial<T> | Partial<T>[]
}

export type PrismaGetCountOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
}

export type PrismaIsExistsOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
}

export type PrismaCreateOptions<T extends PrismaInstanceModel> = {
  data: Partial<T>
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaUpdateOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
  data: Partial<T>
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaUpsertOptions<T extends PrismaInstanceModel> = {
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

export type PrismaUpsertBatchOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
  data: Partial<T>
}

export type PrismaUpdateOrderOptions = BasicOrderDto

export type PrismaDeleteOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
  select?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaFindUniqueOptions<T extends PrismaInstanceModel> = {
  where: WhereOptions<T>
  select?: {
    [P in keyof T]?: boolean
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}

export type PrismaFindPageOptions<T extends PrismaInstanceModel> = {
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
  }
  omit?: {
    [P in keyof T]?: boolean
  }
}
