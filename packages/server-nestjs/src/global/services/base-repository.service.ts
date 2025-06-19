import type { Prisma } from '@/prisma/client'
import { BadRequestException, Global, Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'

/**
 * 通用分页返回结构
 */
export interface PaginationResult<T> {
  list: T[]
  total: number
  pageIndex: number
  pageSize: number
}

/**
 * 批量操作返回结构
 */
export interface BatchResult {
  count: number
}

/**
 * Prisma 所有模型名称类型
 */
type ModelName = keyof typeof Prisma.ModelName

/**
 * 针对指定模型名，推导出常用的 Prisma 类型
 */
interface ModelTypes<T extends ModelName> {
  Model: Prisma.TypeMap['model'][T]['operations']['findMany']['result']
  WhereInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['where']
  CreateInput: Prisma.TypeMap['model'][T]['operations']['create']['args']['data']
  UpdateInput: Prisma.TypeMap['model'][T]['operations']['update']['args']['data']
  OrderByInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['orderBy']
  WhereUniqueInput: Prisma.TypeMap['model'][T]['operations']['findUnique']['args']['where']
  Include: Prisma.TypeMap['model'][T]['operations']['findFirst']['args'] extends {
    include?: infer I
  }
    ? I
    : never
  Select: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['select']
}

/**
 * 查询选项类型，支持 include/select/omit
 */
interface QueryOptions<T extends ModelName> {
  include?: ModelTypes<T>['Include']
  select?: ModelTypes<T>['Select']
  omit?: ModelTypes<T>['Select'] // omit 语法与 select 结构一致
}

/**
 * 通用分页查询参数
 */
export interface CommonPaginationOptions<T extends ModelName>
  extends QueryOptions<T> {
  pageSize?: number
  pageIndex?: number
  orderBy?: string
  startDate?: string
  endDate?: string
  where?: ModelTypes<T>['WhereInput']
  dateField?: string
}

/**
 * 通用基础仓储服务，封装常用数据库操作，支持软删除
 * @template T Prisma 模型名称
 */
@Injectable()
@Global()
export abstract class BaseRepositoryService<T extends ModelName> {
  /**
   * 默认分页参数，统一管理
   */
  static readonly MAX_PAGE_SIZE = 500
  static readonly DEFAULT_PAGE_SIZE = 15
  static readonly DEFAULT_PAGE_INDEX = 0

  /**
   * 子类需指定模型名
   */
  protected abstract readonly modelName: T
  /**
   * 是否支持软删除，子类可重写
   */
  protected readonly supportsSoftDelete: boolean = false

  constructor(protected readonly prisma: PrismaService) {}

  /**
   * 获取当前模型的 Prisma 操作对象
   */
  protected get model() {
    return (this.prisma as any)[this.modelName]
  }

  /**
   * 构建查询选项，自动处理 select/include/omit，select 与 omit 互斥
   */
  private buildQueryOptions(options?: QueryOptions<T>) {
    if (!options) return { select: { id: true } }
    const { include, select, omit } = options
    const queryOptions: any = {}
    if (include) queryOptions.include = include
    // select 和 omit 不能同时使用，优先 select
    if (select && omit) {
      throw new Error('Prisma 查询参数 select 和 omit 不能同时使用')
    }
    if (select) queryOptions.select = select
    else if (omit) queryOptions.omit = omit
    else queryOptions.select = { id: true }
    return queryOptions
  }

  /**
   * 创建单条记录
   */
  async create(
    options: { data: ModelTypes<T>['CreateInput'] } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { data, ...queryOptions } = options
    return this.model.create({ data, ...this.buildQueryOptions(queryOptions) })
  }

  /**
   * 批量创建记录
   */
  async createMany(options: {
    data: ModelTypes<T>['CreateInput'][]
    skipDuplicates?: boolean
  }): Promise<BatchResult> {
    const { data, skipDuplicates } = options
    return this.model.createMany({
      data,
      ...(skipDuplicates !== undefined && { skipDuplicates }),
    })
  }

  /**
   * 查找首条匹配记录
   */
  async findFirst(
    options?: { where?: ModelTypes<T>['WhereInput'] } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const { where, ...queryOptions } = options || {}
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(where)
      : where
    return this.model.findFirst({
      ...(finalWhere && { where: finalWhere }),
      ...this.buildQueryOptions(queryOptions),
    })
  }

  /**
   * 根据 id 查找单条记录
   */
  async findById(
    options: { id: number } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const { id, ...queryOptions } = options
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted({ id })
      : { id }
    return this.model.findFirst({
      where: finalWhere,
      ...this.buildQueryOptions(queryOptions),
    })
  }

  /**
   * 查找多条记录（可分页、排序）
   */
  async findMany(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'][]> {
    return this._findManyInternal(
      {
        ...options,
        pageIndex: 0,
        pageSize: BaseRepositoryService.MAX_PAGE_SIZE,
      },
      true,
    )
  }

  /**
   * 通用分页查询
   */
  async findPagination(
    options?: CommonPaginationOptions<T>,
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
    const {
      pageSize = BaseRepositoryService.DEFAULT_PAGE_SIZE,
      pageIndex = BaseRepositoryService.DEFAULT_PAGE_INDEX,
      orderBy: orderByString,
      startDate,
      endDate,
      where,
      include,
      select,
      omit,
      dateField = 'createdAt',
    } = options || {}
    let finalWhere: ModelTypes<T>['WhereInput'] = where || {}
    // 时间范围处理
    if (startDate || endDate) {
      const dateCondition: any = {}
      if (startDate) dateCondition.gte = new Date(startDate)
      if (endDate) {
        const endDateTime = new Date(endDate)
        endDateTime.setDate(endDateTime.getDate() + 1)
        dateCondition.lt = endDateTime
      }
      finalWhere = {
        ...finalWhere,
        [dateField]: dateCondition,
      } as ModelTypes<T>['WhereInput']
    }
    let orderBy: ModelTypes<T>['OrderByInput'] = {
      id: 'desc',
    } as ModelTypes<T>['OrderByInput']
    if (orderByString) {
      try {
        orderBy = JSON.parse(orderByString)
      } catch {}
    }
    return this._paginationInternal(
      {
        pageIndex,
        pageSize,
        where: finalWhere,
        orderBy,
        include,
        select,
        omit,
      },
      'normal',
    )
  }

  /**
   * 更新单条记录
   */
  async update(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
      data: ModelTypes<T>['UpdateInput']
    } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model']> {
    const { where, data, ...queryOptions } = options
    return this.model.update({
      where,
      data,
      ...this.buildQueryOptions(queryOptions),
    })
  }

  /**
   * 根据 id 更新记录
   */
  async updateById(
    options: {
      id: number | string
      data: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, data, ...queryOptions } = options
    return this.update({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      data,
      ...queryOptions,
    })
  }

  /**
   * 批量更新
   */
  async updateMany(options: {
    where: ModelTypes<T>['WhereInput']
    data: ModelTypes<T>['UpdateInput']
  }): Promise<BatchResult> {
    const { where, data } = options
    return this.model.updateMany({ ...(where && { where }), data })
  }

  /**
   * 删除单条记录
   */
  async delete(
    options: { where: ModelTypes<T>['WhereUniqueInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model']> {
    const { where, ...queryOptions } = options
    return this.model.delete({ where, ...this.buildQueryOptions(queryOptions) })
  }

  /**
   * 根据 id 删除记录
   */
  async deleteById(
    options: { id: number | string } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, ...queryOptions } = options
    return this.delete({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      ...queryOptions,
    })
  }

  /**
   * 批量删除
   */
  async deleteMany(where?: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    return this.model.deleteMany({ ...(where && { where }) })
  }

  /**
   * 统计记录数（不含软删除）
   */
  async count(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, false)
  }

  /**
   * 检查是否存在匹配记录
   */
  async exists(where: ModelTypes<T>['WhereInput']): Promise<boolean> {
    return (await this.count(where)) > 0
  }

  /**
   * 内部计数方法，支持软删除过滤
   */
  private async _countInternal(
    where?: ModelTypes<T>['WhereInput'],
    includeDeleted = false,
  ): Promise<number> {
    let finalWhere = where
    if (!includeDeleted && this.supportsSoftDelete) {
      finalWhere = this.getWhereWithoutDeleted(where)
    }
    return this.model.count(finalWhere ? { where: finalWhere } : undefined)
  }

  /**
   * upsert 操作，存在则更新，不存在则创建
   */
  async upsert(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
      create: ModelTypes<T>['CreateInput']
      update: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { where, create, update, ...queryOptions } = options
    return this.model.upsert({
      where,
      create,
      update,
      ...this.buildQueryOptions(queryOptions),
    })
  }

  /**
   * 事务操作
   */
  async transaction<R>(
    callback: (prisma: PrismaService) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(callback)
  }

  /**
   * 执行原生 SQL 查询
   */
  async queryRaw<R = any>(options: {
    query: string
    params?: any[]
  }): Promise<R> {
    const { query, params = [] } = options
    return this.prisma.$queryRawUnsafe<R>(query, ...params)
  }

  /**
   * 执行原生 SQL 写操作
   */
  async executeRaw(options: {
    query: string
    params?: any[]
  }): Promise<number> {
    const { query, params = [] } = options
    return this.prisma.$executeRawUnsafe(query, ...params)
  }

  /**
   * 获取未软删除的 where 条件
   */
  protected getWhereWithoutDeleted(
    where?: ModelTypes<T>['WhereInput'],
  ): ModelTypes<T>['WhereInput'] {
    if (!this.supportsSoftDelete)
      return where || ({} as ModelTypes<T>['WhereInput'])
    return { ...(where || {}), deletedAt: null } as ModelTypes<T>['WhereInput']
  }

  /**
   * 获取仅软删除的 where 条件
   */
  protected getWhereOnlyDeleted(
    where?: ModelTypes<T>['WhereInput'],
  ): ModelTypes<T>['WhereInput'] {
    if (!this.supportsSoftDelete)
      return where || ({} as ModelTypes<T>['WhereInput'])
    return {
      ...(where || {}),
      deletedAt: { not: null },
    } as ModelTypes<T>['WhereInput']
  }

  /**
   * 软删除单条记录（仅标记 deletedAt）
   */
  async softDelete(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    const existing = await this.exists({ id } as any)
    if (!existing) throw new BadRequestException(`删除失败，数据不存在`)
    return this.updateById({
      id,
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 批量软删除（只处理未被软删除的记录）
   */
  async softDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    // 只查未软删除的 id
    const existing = await this.findMany({
      where: { ...where, deletedAt: null },
      select: { id: true },
    })
    const existingIds = existing
      .map((item: any) => item.id)
      .filter((id: unknown): id is number => typeof id === 'number')
    if (!existingIds.length) return { count: 0 }
    return this.updateMany({
      where: { id: { in: existingIds } } as any,
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 恢复软删除的单条记录
   */
  async restore(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    return this.model.update({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 批量恢复软删除
   */
  async restoreMany(where: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    return this.model.updateMany({
      where,
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 物理删除单条记录
   */
  async forceDelete(
    options: { id: number | string } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, include, select } = options
    return this.deleteById({ id, include, select })
  }

  /**
   * 批量物理删除
   */
  async forceDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    return this.deleteMany(where)
  }

  /**
   * 查找所有（包含软删除）
   */
  async findWithDeleted(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'][]> {
    return this._findManyInternal(options, false)
  }

  /**
   * 查找仅软删除的记录
   */
  async findOnlyDeleted(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'][]> {
    if (!this.supportsSoftDelete) return []
    const { where, ...restOptions } = options || {}
    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    return this._findManyInternal(
      { where: whereOnlyDeleted, ...restOptions },
      false,
    )
  }

  /**
   * 内部 findMany，支持软删除过滤
   */
  private async _findManyInternal(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
    applySoftDeleteFilter = true,
  ): Promise<ModelTypes<T>['Model'][]> {
    const { where, orderBy, pageIndex, pageSize, include, select, omit } =
      options || {}
    let finalWhere = where
    if (applySoftDeleteFilter && this.supportsSoftDelete) {
      finalWhere = this.getWhereWithoutDeleted(where)
    }
    const finalOrderBy =
      orderBy || ({ id: 'desc' } as ModelTypes<T>['OrderByInput'])
    const skip = pageIndex ?? BaseRepositoryService.DEFAULT_PAGE_INDEX
    const take = pageSize ?? BaseRepositoryService.DEFAULT_PAGE_SIZE
    return this.model.findMany({
      ...(finalWhere && { where: finalWhere }),
      orderBy: finalOrderBy,
      skip,
      take,
      ...this.buildQueryOptions({ include, select, omit }),
    })
  }

  /**
   * 分页查找（包含软删除/仅软删除/正常）
   */
  async findWithDeletedPagination(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
    return this._paginationInternal(options, 'withDeleted')
  }

  async findOnlyDeletedPagination(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
    if (!this.supportsSoftDelete) {
      const {
        pageIndex = BaseRepositoryService.DEFAULT_PAGE_INDEX,
        pageSize = BaseRepositoryService.DEFAULT_PAGE_SIZE,
      } = options || {}
      return { list: [], total: 0, pageIndex, pageSize }
    }
    return this._paginationInternal(options, 'onlyDeleted')
  }

  /**
   * 内部分页查询，支持软删除模式
   */
  private async _paginationInternal(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
    mode: 'normal' | 'withDeleted' | 'onlyDeleted' = 'normal',
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
    const {
      pageIndex = BaseRepositoryService.DEFAULT_PAGE_INDEX,
      pageSize = BaseRepositoryService.DEFAULT_PAGE_SIZE,
      where,
      orderBy,
      include,
      select,
      omit,
    } = options || {}
    let finalWhere = where
    let countWhere = where
    switch (mode) {
      case 'normal':
        if (this.supportsSoftDelete) {
          finalWhere = this.getWhereWithoutDeleted(where)
          countWhere = finalWhere
        }
        break
      case 'withDeleted':
        break
      case 'onlyDeleted':
        finalWhere = this.getWhereOnlyDeleted(where)
        countWhere = finalWhere
        break
    }
    const [data, total] = await Promise.all([
      this._findManyInternal(
        {
          where: finalWhere,
          orderBy,
          pageIndex,
          pageSize,
          include,
          select,
          omit,
        },
        false,
      ),
      this._countInternal(countWhere, mode !== 'normal'),
    ])
    return { list: data, total, pageIndex, pageSize }
  }

  /**
   * 统计所有（含软删除）
   */
  async countWithDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, true)
  }

  /**
   * 统计仅软删除
   */
  async countOnlyDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    if (!this.supportsSoftDelete) return 0
    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    return this._countInternal(whereOnlyDeleted, true)
  }

  /**
   * 获取软删除统计信息
   */
  async getSoftDeleteStats(
    where?: ModelTypes<T>['WhereInput'],
  ): Promise<{ total: number; active: number; deleted: number }> {
    if (!this.supportsSoftDelete) {
      const total = await this._countInternal(where, false)
      return { total, active: total, deleted: 0 }
    }
    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    const [total, active, deleted] = await Promise.all([
      this._countInternal(where, true),
      this._countInternal(where, false),
      this._countInternal(whereOnlyDeleted, true),
    ])
    return { total, active, deleted }
  }
}
