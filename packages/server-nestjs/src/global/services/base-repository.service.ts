import type { Prisma } from '@/prisma/client'
import { Global, Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'

// 基础类型定义
export interface PaginationResult<T> {
  list: T[]
  total: number
  pageIndex: number
  pageSize: number
}

export interface BatchResult {
  count: number
}

// 通用分页查询参数接口
export interface CommonPaginationOptions<TModelName extends ModelName> {
  pageSize?: number
  pageIndex?: number
  orderBy?: string
  startDate?: string
  endDate?: string
  where?: InferModelTypes<TModelName>['WhereInput']
  include?: InferModelTypes<TModelName>['Include']
  select?: InferModelTypes<TModelName>['Select']
  omit?: InferModelTypes<TModelName>['Omit']
  // 时间字段名称，用于时间范围查询，默认为 'createdAt'
  dateField?: string
}

// 从 Prisma.ModelName 获取所有模型名称
type ModelName = keyof typeof Prisma.ModelName

// 从模型名称推导相关类型，提供完整的类型安全
interface InferModelTypes<T extends ModelName> {
  // 模型实体类型
  Model: Prisma.TypeMap['model'][T]['operations']['findMany']['result']
  // 查询条件类型
  WhereInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['where']
  // 创建输入类型
  CreateInput: Prisma.TypeMap['model'][T]['operations']['create']['args']['data']
  // 更新输入类型
  UpdateInput: Prisma.TypeMap['model'][T]['operations']['update']['args']['data']
  // 排序类型
  OrderByInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['orderBy']
  // 关联查询类型 - 使用条件类型确保类型安全
  Include: 'include' extends keyof Prisma.TypeMap['model'][T]['operations']['findFirst']['args']
    ? Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['include']
    : never
  // 字段选择类型 - 使用条件类型确保类型安全
  Select: 'select' extends keyof Prisma.TypeMap['model'][T]['operations']['findFirst']['args']
    ? Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['select']
    : never
  // 字段排除类型 - 使用条件类型确保类型安全
  Omit: 'select' extends keyof Prisma.TypeMap['model'][T]['operations']['findFirst']['args']
    ? Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['omit']
    : never
  // 唯一查询条件类型
  WhereUniqueInput: Prisma.TypeMap['model'][T]['operations']['findUnique']['args']['where']
}

// 模型代理接口，提供类型安全的数据库操作
interface ModelDelegate<T extends ModelName> {
  create: (args: {
    data: InferModelTypes<T>['CreateInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
  }) => Promise<InferModelTypes<T>['Model']>
  createMany: (args: {
    data: InferModelTypes<T>['CreateInput'][]
    skipDuplicates?: boolean
  }) => Promise<Prisma.BatchPayload>
  findUnique: (args: {
    where: InferModelTypes<T>['WhereUniqueInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
  }) => Promise<InferModelTypes<T>['Model'] | null>
  findFirst: (args?: {
    where?: InferModelTypes<T>['WhereInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
    orderBy?: InferModelTypes<T>['OrderByInput']
  }) => Promise<InferModelTypes<T>['Model'] | null>
  findMany: (args?: {
    where?: InferModelTypes<T>['WhereInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
    orderBy?: InferModelTypes<T>['OrderByInput']
    skip?: number
    take?: number
  }) => Promise<InferModelTypes<T>['Model'][]>
  update: (args: {
    where: InferModelTypes<T>['WhereUniqueInput']
    data: InferModelTypes<T>['UpdateInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
  }) => Promise<InferModelTypes<T>['Model']>
  updateMany: (args: {
    where?: InferModelTypes<T>['WhereInput']
    data: InferModelTypes<T>['UpdateInput']
  }) => Promise<Prisma.BatchPayload>
  delete: (args: {
    where: InferModelTypes<T>['WhereUniqueInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
  }) => Promise<InferModelTypes<T>['Model']>
  deleteMany: (args?: {
    where?: InferModelTypes<T>['WhereInput']
  }) => Promise<Prisma.BatchPayload>
  count: (args?: {
    where?: InferModelTypes<T>['WhereInput']
  }) => Promise<number>
  upsert: (args: {
    where: InferModelTypes<T>['WhereUniqueInput']
    create: InferModelTypes<T>['CreateInput']
    update: InferModelTypes<T>['UpdateInput']
    include?: InferModelTypes<T>['Include'] extends never
      ? never
      : InferModelTypes<T>['Include']
    select?: InferModelTypes<T>['Select'] extends never
      ? never
      : InferModelTypes<T>['Select']
  }) => Promise<InferModelTypes<T>['Model']>
}

/**
 * 抽象数据库服务层
 * 提供通用的数据库操作方法，支持完全自动化的类型推导
 * 包含软删除功能
 *
 * @template TModelName - Prisma模型名称，用于自动推导所有相关类型
 */
@Injectable()
@Global()
export abstract class BaseRepositoryService<TModelName extends ModelName> {
  protected abstract readonly modelName: TModelName
  protected readonly supportsSoftDelete: boolean = false

  // 自动推导的类型别名，提供更好的IDE支持
  protected type!: InferModelTypes<TModelName>

  constructor(protected readonly prisma: PrismaService) {}

  /**
   * 获取 Prisma 模型代理
   * 使用类型安全的方式返回对应的 Prisma 模型
   */
  protected get model(): ModelDelegate<TModelName> {
    return (this.prisma as any)[this.modelName] as ModelDelegate<TModelName>
  }

  /**
   * 创建单条记录
   */
  async create(options: {
    data: InferModelTypes<TModelName>['CreateInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
    omit?: InferModelTypes<TModelName>['Omit']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { data, include, select, omit } = options
    return this.model.create({
      data,
      ...(include && { include }),
      ...(select && { select }),
      ...(omit && { omit }),
    })
  }

  /**
   * 批量创建记录
   */
  async createMany(options: {
    data: InferModelTypes<TModelName>['CreateInput'][]
    skipDuplicates?: boolean
  }): Promise<Prisma.BatchPayload> {
    const { data, skipDuplicates = false } = options
    return this.model.createMany({
      data,
      skipDuplicates,
    })
  }

  /**
   * 根据ID查找单条记录
   */
  async findById(options: {
    id: number | string
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
    omit?: InferModelTypes<TModelName>['Omit']
  }): Promise<InferModelTypes<TModelName>['Model'] | null> {
    const { id, include, select, omit } = options
    return this.model.findUnique({
      where: { id } as InferModelTypes<TModelName>['WhereUniqueInput'],
      ...(include && { include }),
      ...(select && { select }),
      ...(omit && { omit }),
    })
  }

  /**
   * 根据条件查找单条记录
   */
  async findFirst(options?: {
    where?: InferModelTypes<TModelName>['WhereInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
  }): Promise<InferModelTypes<TModelName>['Model'] | null> {
    const { where, include, select, orderBy } = options || {}
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(where)
      : where

    return this.model.findFirst({
      ...(finalWhere && { where: finalWhere }),
      ...(include && { include }),
      ...(select && { select }),
      ...(orderBy && { orderBy }),
    })
  }

  /**
   * 根据条件查找多条记录
   */
  async findMany(options?: {
    where?: InferModelTypes<TModelName>['WhereInput']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
    skip?: number
    take?: number
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
    omit?: InferModelTypes<TModelName>['Omit']
  }): Promise<InferModelTypes<TModelName>['Model'][]> {
    const { where, orderBy, skip, take, include, select, omit } = options || {}
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(where)
      : where

    return this.model.findMany({
      ...(finalWhere && { where: finalWhere }),
      ...(orderBy && { orderBy }),
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
      ...(include && { include }),
      ...(select && { select }),
      ...(omit && { omit }),
    })
  }

  /**
   * 通用分页查询
   */
  async findManyWithCommonPagination(
    options?: CommonPaginationOptions<TModelName>,
  ): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    const {
      pageSize = 15,
      pageIndex = 0,
      orderBy: orderByString,
      startDate,
      endDate,
      where,
      include,
      select,
      omit,
      dateField = 'createdAt',
    } = options || {}

    let finalWhere: InferModelTypes<TModelName>['WhereInput'] = where || {}

    // 处理时间范围查询
    if (startDate || endDate) {
      const dateCondition: any = {}
      if (startDate) {
        dateCondition.gte = new Date(startDate)
      }
      if (endDate) {
        const endDateTime = new Date(endDate)
        endDateTime.setDate(endDateTime.getDate() + 1)
        dateCondition.lt = endDateTime
      }
      finalWhere = {
        ...finalWhere,
        [dateField]: dateCondition,
      } as InferModelTypes<TModelName>['WhereInput']
    }

    if (this.supportsSoftDelete) {
      finalWhere = this.getWhereWithoutDeleted(finalWhere)
    }

    let orderBy: InferModelTypes<TModelName>['OrderByInput'] = {
      [dateField]: 'desc',
    } as InferModelTypes<TModelName>['OrderByInput']

    if (orderByString) {
      try {
        const customOrderBy = JSON.parse(orderByString)
        orderBy = { ...orderBy, ...customOrderBy }
      } catch {
        // 解析失败时使用默认排序
      }
    }

    const skip = pageIndex * pageSize
    const [data, total] = await Promise.all([
      this.findMany({
        where: finalWhere,
        orderBy,
        skip,
        take: pageSize,
        include,
        select,
        omit,
      }),
      this.count(finalWhere),
    ])

    return {
      list: data,
        total,
        pageIndex,
        pageSize,
    }
  }

  /**
   * 更新单条记录
   */
  async update(options: {
    where: InferModelTypes<TModelName>['WhereUniqueInput']
    data: InferModelTypes<TModelName>['UpdateInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
    omit?: InferModelTypes<TModelName>['Omit']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { where, data, include, select, omit } = options
    return this.model.update({
      where,
      data,
      ...(include && { include }),
      ...(select && { select }),
      ...(omit && { omit }),
    })
  }

  /**
   * 根据ID更新记录
   */
  async updateById(options: {
    id: number | string
    data: InferModelTypes<TModelName>['UpdateInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { id, data, include, select } = options
    return this.update({
      where: { id } as InferModelTypes<TModelName>['WhereUniqueInput'],
      data,
      include,
      select,
    })
  }

  /**
   * 批量更新记录
   */
  async updateMany(options: {
    where: InferModelTypes<TModelName>['WhereInput']
    data: InferModelTypes<TModelName>['UpdateInput']
  }): Promise<Prisma.BatchPayload> {
    const { where, data } = options
    return this.model.updateMany({
      ...(where && { where }),
      data,
    })
  }

  /**
   * 删除单条记录
   */
  async delete(options: {
    where: InferModelTypes<TModelName>['WhereUniqueInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { where, include, select } = options
    return this.model.delete({
      where,
      ...(include && { include }),
      ...(select && { select }),
    })
  }

  /**
   * 根据ID删除记录
   */
  async deleteById(options: {
    id: number | string
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { id, include, select } = options
    return this.delete({
      where: { id } as InferModelTypes<TModelName>['WhereUniqueInput'],
      include,
      select,
    })
  }

  /**
   * 批量删除记录
   */
  async deleteMany(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<Prisma.BatchPayload> {
    return this.model.deleteMany({
      ...(where && { where }),
    })
  }

  /**
   * 统计记录数量
   */
  async count(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(where)
      : where
    return this.model.count(finalWhere ? { where: finalWhere } : undefined)
  }

  /**
   * 检查记录是否存在
   */
  async exists(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<boolean> {
    const count = await this.count(where)
    return count > 0
  }

  /**
   * 创建或更新记录（upsert）
   */
  async upsert(options: {
    where: InferModelTypes<TModelName>['WhereUniqueInput']
    create: InferModelTypes<TModelName>['CreateInput']
    update: InferModelTypes<TModelName>['UpdateInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { where, create, update, include, select } = options
    return this.model.upsert({
      where,
      create,
      update,
      ...(include && { include }),
      ...(select && { select }),
    })
  }

  /**
   * 执行事务
   */
  async transaction<R>(
    callback: (prisma: PrismaService) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(callback)
  }

  /**
   * 执行原始查询
   */
  async queryRaw<R = any>(options: {
    query: string
    params?: any[]
  }): Promise<R> {
    const { query, params = [] } = options
    return this.prisma.$queryRawUnsafe<R>(query, ...params)
  }

  /**
   * 执行原始操作（增删改）
   */
  async executeRaw(options: {
    query: string
    params?: any[]
  }): Promise<number> {
    const { query, params = [] } = options
    return this.prisma.$executeRawUnsafe(query, ...params)
  }

  // ==================== 软删除相关方法 ====================

  /**
   * 获取排除软删除记录的查询条件
   */
  protected getWhereWithoutDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): InferModelTypes<TModelName>['WhereInput'] {
    if (!this.supportsSoftDelete) {
      return where || ({} as InferModelTypes<TModelName>['WhereInput'])
    }

    const baseWhere = where || ({} as InferModelTypes<TModelName>['WhereInput'])
    return {
      ...baseWhere,
      deletedAt: null,
    } as InferModelTypes<TModelName>['WhereInput']
  }

  /**
   * 获取只包含软删除记录的查询条件
   */
  protected getWhereOnlyDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): InferModelTypes<TModelName>['WhereInput'] {
    if (!this.supportsSoftDelete) {
      return where || ({} as InferModelTypes<TModelName>['WhereInput'])
    }

    const baseWhere = where || ({} as InferModelTypes<TModelName>['WhereInput'])
    return {
      ...baseWhere,
      deletedAt: { not: null },
    } as InferModelTypes<TModelName>['WhereInput']
  }

  /**
   * 软删除单条记录
   */
  async softDelete(
    id: number | string,
  ): Promise<InferModelTypes<TModelName>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.updateById({
      id,
      data: {
        deletedAt: new Date(),
      } as InferModelTypes<TModelName>['UpdateInput'],
    })
  }

  /**
   * 批量软删除记录
   */
  async softDeleteMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.updateMany({
      where,
      data: {
        deletedAt: new Date(),
      } as InferModelTypes<TModelName>['UpdateInput'],
    })
  }

  /**
   * 恢复软删除的记录
   */
  async restore(id: number): Promise<InferModelTypes<TModelName>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.model.update({
      where: { id } as InferModelTypes<TModelName>['WhereUniqueInput'],
      data: { deletedAt: null } as InferModelTypes<TModelName>['UpdateInput'],
    })
  }

  /**
   * 批量恢复软删除的记录
   */
  async restoreMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.model.updateMany({
      where,
      data: { deletedAt: null } as InferModelTypes<TModelName>['UpdateInput'],
    })
  }

  /**
   * 永久删除记录（物理删除）
   */
  async forceDelete(options: {
    id: number | string
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model']> {
    const { id, include, select } = options
    return this.deleteById({ id, include, select })
  }

  /**
   * 批量永久删除记录（物理删除）
   */
  async forceDeleteMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    return this.deleteMany(where)
  }

  /**
   * 查找记录（包含软删除记录）
   */
  async findWithDeleted(options?: {
    where?: InferModelTypes<TModelName>['WhereInput']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
    skip?: number
    take?: number
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model'][]> {
    const { where, orderBy, skip, take, include, select } = options || {}
    return this.model.findMany({
      ...(where && { where }),
      ...(orderBy && { orderBy }),
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
      ...(include && { include }),
      ...(select && { select }),
    })
  }

  /**
   * 只查找软删除的记录
   */
  async findOnlyDeleted(options?: {
    where?: InferModelTypes<TModelName>['WhereInput']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
    skip?: number
    take?: number
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<InferModelTypes<TModelName>['Model'][]> {
    const { where, orderBy, skip, take, include, select } = options || {}
    if (!this.supportsSoftDelete) {
      return []
    }

    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    return this.findWithDeleted({
      where: whereOnlyDeleted,
      orderBy,
      skip,
      take,
      include,
      select,
    })
  }

  /**
   * 分页查询（包含软删除记录）
   */
  async findWithDeletedPagination(options?: {
    pageIndex?: number
    pageSize?: number
    where?: InferModelTypes<TModelName>['WhereInput']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    const {
      pageIndex = 1,
      pageSize = 10,
      where,
      orderBy,
      include,
      select,
    } = options || {}

    const skip = (pageIndex - 1) * pageSize
    const [data, total] = await Promise.all([
      this.findWithDeleted({
        where,
        orderBy,
        skip,
        take: pageSize,
        include,
        select,
      }),
      this.countWithDeleted(where),
    ])
    return {
      list: data,
      total,
      pageIndex,
      pageSize,
    }
  }

  /**
   * 分页查询软删除记录
   */
  async findOnlyDeletedPagination(options?: {
    pageIndex?: number
    pageSize?: number
    where?: InferModelTypes<TModelName>['WhereInput']
    orderBy?: InferModelTypes<TModelName>['OrderByInput']
    include?: InferModelTypes<TModelName>['Include']
    select?: InferModelTypes<TModelName>['Select']
  }): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    const {
      pageIndex = 1,
      pageSize = 10,
      where,
      orderBy,
      include,
      select,
    } = options || {}
    if (!this.supportsSoftDelete) {
      return {
        list: [],
        total: 0,
        pageIndex,
        pageSize,
      }
    }

    const skip = (pageIndex - 1) * pageSize
    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    const [data, total] = await Promise.all([
      this.findWithDeleted({
        where: whereOnlyDeleted,
        orderBy,
        skip,
        take: pageSize,
        include,
        select,
      }),
      this.countWithDeleted(whereOnlyDeleted),
    ])

    return {
      list: data,
      total,
      pageIndex,
      pageSize,
    }
  }

  /**
   * 统计记录数量（包含软删除）
   */
  async countWithDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    return this.model.count(where ? { where } : undefined)
  }

  /**
   * 统计软删除记录数量
   */
  async countOnlyDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    if (!this.supportsSoftDelete) {
      return 0
    }

    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    return this.countWithDeleted(whereOnlyDeleted)
  }

  /**
   * 获取软删除统计信息
   */
  async getSoftDeleteStats(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<{
    total: number
    active: number
    deleted: number
  }> {
    if (!this.supportsSoftDelete) {
      const total = await this.count(where)
      return {
        total,
        active: total,
        deleted: 0,
      }
    }

    const [total, active, deleted] = await Promise.all([
      this.countWithDeleted(where),
      this.count(where),
      this.countOnlyDeleted(where),
    ])

    return { total, active, deleted }
  }
}
