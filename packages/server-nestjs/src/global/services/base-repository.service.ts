import type { Prisma } from '@/prisma/client/client'
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
  Model: Prisma.TypeMap['model'][T]['operations']['findUnique']['result']
  WhereInput: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['where']
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
  omit?: ModelTypes<T>['Select']
}

/**
 * 通用分页查询参数
 */
export interface CommonPaginationOptions<T extends ModelName>
  extends QueryOptions<T> {
  pageSize?: number
  pageIndex?: number
  orderBy?: string | ModelTypes<T>['OrderByInput']
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
   * 获取当前模型的 Prisma 操作对象，类型安全
   */
  protected get model() {
    return (this.prisma as Record<string, any>)[this.modelName]
  }

  /**
   * 默认 select 只返回 id
   */
  private defaultSelect(
    options: Partial<QueryOptions<T>>,
  ): Partial<QueryOptions<T>> {
    if (!options?.omit && !options?.select) {
      return { ...options, select: { id: true } as ModelTypes<T>['Select'] }
    }
    return options
  }

  /**
   * 构建查询选项，自动处理 select/include/omit，select 与 omit 互斥
   */
  private buildQueryOptions(options?: Partial<QueryOptions<T>>) {
    if (!options) return { select: { id: true } }
    const { include, select, omit } = options
    if (select && omit)
      throw new Error('Prisma 查询参数 select 和 omit 不能同时使用')
    if (select) return { select }
    if (omit) return { omit }
    if (include) return { include }
    return {}
  }

  /**
   * 创建单条记录
   */
  async create(
    options: { data: ModelTypes<T>['CreateInput'] } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.create({
      data: options.data,
      ...this.buildQueryOptions(this.defaultSelect(options)),
    })
  }

  /**
   * 批量创建记录
   */
  async createMany(options: {
    data: ModelTypes<T>['CreateInput'][]
    skipDuplicates?: boolean
  }): Promise<BatchResult> {
    return this.model.createMany({
      data: options.data,
      ...(options.skipDuplicates !== undefined && {
        skipDuplicates: options.skipDuplicates,
      }),
    })
  }

  /**
   * 查找首条匹配记录
   */
  async findFirst(
    options?: { where?: ModelTypes<T>['WhereInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const where = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(options?.where)
      : options?.where
    return this.model.findFirst({
      ...(where && { where }),
      ...this.buildQueryOptions(options),
    })
  }

  /**
   * 根据 id 查找单条记录
   */
  async findById(
    options: { id: number } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const where = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted({
          id: options.id,
        } as ModelTypes<T>['WhereInput'])
      : ({ id: options.id } as ModelTypes<T>['WhereInput'])
    return this.model.findFirst({ where, ...this.buildQueryOptions(options) })
  }

  /**
   * 查找多条记录（可分页、排序）
   */
  async findMany(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<any[]> {
    return this._findManyInternal(
      {
        ...options,
        pageSize: BaseRepositoryService.MAX_PAGE_SIZE,
        pageIndex: 0,
      },
      true,
    )
  }

  /**
   * 通用分页查询
   */
  async findPagination(
    options?: CommonPaginationOptions<T>,
  ): Promise<PaginationResult<any>> {
    const {
      pageSize,
      pageIndex,
      orderBy: orderBy2,
      startDate,
      endDate,
      where,
      include,
      select,
      omit,
      dateField = 'createdAt',
    } = options || {}
    let finalWhere: ModelTypes<T>['WhereInput'] =
      where || ({} as ModelTypes<T>['WhereInput'])
    if (startDate || endDate) {
      const dateCondition: Record<string, Date> = {}
      if (startDate) dateCondition.gte = new Date(startDate)
      if (endDate) {
        const endDateTime = new Date(endDate)
        endDateTime.setDate(endDateTime.getDate() + 1)
        dateCondition.lt = endDateTime
      }
      finalWhere = {
        ...finalWhere,
        [dateField]: dateCondition,
      }
    }
    let orderBy: ModelTypes<T>['OrderByInput'] = {
      id: 'desc',
    } as ModelTypes<T>['OrderByInput']
    if (orderBy2) {
      try {
        orderBy = typeof orderBy2 === 'string' ? JSON.parse(orderBy2) : orderBy2
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
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.update({
      where: options.where,
      data: options.data,
      ...this.buildQueryOptions(this.defaultSelect(options)),
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
    const { id, data, ...rest } = options
    return this.update({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      data,
      ...this.defaultSelect(rest),
    })
  }

  /**
   * 批量更新
   */
  async updateMany(options: {
    where: ModelTypes<T>['WhereInput']
    data: ModelTypes<T>['UpdateInput']
  }): Promise<BatchResult> {
    return this.model.updateMany({
      ...(options.where && { where: options.where }),
      data: options.data,
    })
  }

  /**
   * 删除单条记录
   */
  async delete(
    options: { where: ModelTypes<T>['WhereUniqueInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.delete({
      where: options.where,
      ...this.buildQueryOptions(this.defaultSelect(options)),
    })
  }

  /**
   * 根据 id 删除记录
   */
  async deleteById(
    options: { id: number | string } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.delete({
      where: { id: options.id } as ModelTypes<T>['WhereUniqueInput'],
      ...this.defaultSelect(options),
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
    return this.model.upsert({
      where: options.where,
      create: options.create,
      update: options.update,
      ...this.buildQueryOptions(this.defaultSelect(options)),
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
    params?: unknown[]
  }): Promise<R> {
    return this.prisma.$queryRawUnsafe<R>(
      options.query,
      ...(options.params || []),
    )
  }

  /**
   * 执行原生 SQL 写操作
   */
  async executeRaw(options: {
    query: string
    params?: unknown[]
  }): Promise<number> {
    return this.prisma.$executeRawUnsafe(
      options.query,
      ...(options.params || []),
    )
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
    const existing = await this.exists({ id } as ModelTypes<T>['WhereInput'])
    if (!existing) throw new BadRequestException(`删除失败，数据不存在`)
    return this.updateById({
      id,
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 批量软删除（极致性能：直接 updateMany，无需先查）
   */
  async softDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    return this.updateMany({
      where: { ...where, deletedAt: null },
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
    return this.deleteById(options)
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
    return this._findManyInternal(
      { where: this.getWhereOnlyDeleted(where), ...restOptions },
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
  ): Promise<any[]> {
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
  ): Promise<PaginationResult<any>> {
    return this._paginationInternal(options, 'withDeleted')
  }

  async findOnlyDeletedPagination(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<PaginationResult<any>> {
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
  ): Promise<PaginationResult<any>> {
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
    if (mode === 'normal' && this.supportsSoftDelete) {
      finalWhere = this.getWhereWithoutDeleted(where)
      countWhere = finalWhere
    } else if (mode === 'onlyDeleted') {
      finalWhere = this.getWhereOnlyDeleted(where)
      countWhere = finalWhere
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
    return this._countInternal(this.getWhereOnlyDeleted(where), true)
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
    const [total, active, deleted] = await Promise.all([
      this._countInternal(where, true),
      this._countInternal(where, false),
      this._countInternal(this.getWhereOnlyDeleted(where), true),
    ])
    return { total, active, deleted }
  }
}
