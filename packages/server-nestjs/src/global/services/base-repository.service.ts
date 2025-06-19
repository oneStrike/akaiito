import type { Prisma } from '@/prisma/client'
import { BadRequestException, Global, Injectable } from '@nestjs/common'
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

// 从 Prisma.ModelName 获取所有模型名称
type ModelName = keyof typeof Prisma.ModelName

// 简化的类型推导，直接使用 Prisma 生成的类型
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
  Omit: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['omit']
}

// 通用查询选项类型
interface QueryOptions<T extends ModelName> {
  include?: ModelTypes<T>['Include']
  select?: ModelTypes<T>['Select']
  omit?: ModelTypes<T>['Omit']
}

// 通用分页查询参数接口
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
 * 抽象数据库服务层
 * 提供通用的数据库操作方法，支持完全自动化的类型推导
 * 包含软删除功能
 *
 * @template T - Prisma模型名称，用于自动推导所有相关类型
 */
@Injectable()
@Global()
export abstract class BaseRepositoryService<T extends ModelName> {
  protected abstract readonly modelName: T
  protected readonly supportsSoftDelete: boolean = false

  constructor(protected readonly prisma: PrismaService) {}

  /**
   * 获取 Prisma 模型代理
   */
  protected get model() {
    return (this.prisma as any)[this.modelName]
  }

  /**
   * 创建单条记录
   */
  async create(
    options: {
      data: ModelTypes<T>['CreateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { data, include, select, omit } = options
    return this.model.create({
      data,
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
      ...(omit && { omit }),
    })
  }

  /**
   * 批量创建记录
   */
  async createMany(
    options: {
      data: ModelTypes<T>['CreateInput'][]
      skipDuplicates?: boolean
    } & Partial<QueryOptions<T>>,
  ): Promise<BatchResult> {
    const { data, skipDuplicates, include, select, omit } = options
    return this.model.createMany({
      data,
      ...(skipDuplicates !== undefined && { skipDuplicates }),
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
      ...(omit && { omit }),
    })
  }

  /**
   * 根据条件查找单条记录
   */
  async findFirst(
    options?: {
      where?: ModelTypes<T>['WhereInput']
    } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const { where, include, select } = options || {}
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted(where)
      : where

    return this.model.findFirst({
      ...(finalWhere && { where: finalWhere }),
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
    })
  }

  /**
   * 根据id查找单条记录
   */
  async findById(
    options?: {
      id: number
    } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const { id, include, select } = options || {}
    const finalWhere = this.supportsSoftDelete
      ? this.getWhereWithoutDeleted({ id })
      : { id }

    return this.model.findFirst({
      ...(finalWhere && { where: finalWhere }),
      ...(include && { include }),
      ...(select && { select }),
    })
  }

  /**
   * 根据条件查找多条记录
   */
  async findMany(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & QueryOptions<T>,
  ): Promise<ModelTypes<T>['Model'][]> {
    return this._findManyInternal(options, true)
  }

  /**
   * 通用分页查询
   */
  async findPagination(
    options?: CommonPaginationOptions<T>,
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
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

    let finalWhere: ModelTypes<T>['WhereInput'] = where || {}

    // 处理时间范围查询
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
      } catch {
        // 解析失败时使用默认排序 id
      }
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
    const { where, data, include, select, omit } = options
    return this.model.update({
      where,
      data,
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
      ...(omit && { omit }),
    })
  }

  /**
   * 根据ID更新记录
   */
  async updateById(
    options: {
      id: number | string
      data: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, data, include, select } = options
    return this.update({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      data,
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
    })
  }

  /**
   * 批量更新记录
   */
  async updateMany(options: {
    where: ModelTypes<T>['WhereInput']
    data: ModelTypes<T>['UpdateInput']
  }): Promise<Prisma.BatchPayload> {
    const { where, data } = options
    return this.model.updateMany({ ...(where && { where }), data })
  }

  /**
   * 删除单条记录
   */
  async delete(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { where, include, select } = options
    return this.model.delete({
      where,
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
    })
  }

  /**
   * 根据ID删除记录
   */
  async deleteById(
    options: {
      id: number | string
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, include, select } = options
    return this.delete({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
    })
  }

  /**
   * 批量删除记录
   */
  async deleteMany(
    where?: ModelTypes<T>['WhereInput'],
  ): Promise<Prisma.BatchPayload> {
    return this.model.deleteMany({ ...(where && { where }) })
  }

  /**
   * 统计记录数量
   */
  async count(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, false)
  }

  /**
   * 检查记录是否存在
   */
  async exists(where: ModelTypes<T>['WhereInput']): Promise<boolean> {
    return (await this.count(where)) > 0
  }

  /**
   * 内部计数方法，统一处理计数逻辑
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
   * 创建或更新记录（upsert）
   */
  async upsert(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
      create: ModelTypes<T>['CreateInput']
      update: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { where, create, update, include, select } = options
    return this.model.upsert({
      where,
      create,
      update,
      ...(include && { include }),
      ...(select ? { select } : { select: { id: true } }),
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
    where?: ModelTypes<T>['WhereInput'],
  ): ModelTypes<T>['WhereInput'] {
    if (!this.supportsSoftDelete) {
      return where || ({} as ModelTypes<T>['WhereInput'])
    }

    const baseWhere = where || ({} as ModelTypes<T>['WhereInput'])
    return {
      ...baseWhere,
      deletedAt: null,
    } as ModelTypes<T>['WhereInput']
  }

  /**
   * 获取只包含软删除记录的查询条件
   */
  protected getWhereOnlyDeleted(
    where?: ModelTypes<T>['WhereInput'],
  ): ModelTypes<T>['WhereInput'] {
    if (!this.supportsSoftDelete) {
      return where || ({} as ModelTypes<T>['WhereInput'])
    }

    const baseWhere = where || ({} as ModelTypes<T>['WhereInput'])
    return {
      ...baseWhere,
      deletedAt: { not: null },
    } as ModelTypes<T>['WhereInput']
  }

  /**
   * 软删除单条记录
   */
  async softDelete(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    }

    const existing = await this.exists({ id })
    if (!existing) {
      throw new BadRequestException(`删除失败，数据不存在`)
    }

    return this.updateById({
      id,
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 批量软删除记录
   */
  async softDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    }

    const existing = await this.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    })

    // @ts-expect-error ignore
    const existingIds = existing.map((item) => item.id)
    return this.updateMany({
      where: { id: { in: existingIds } },
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 恢复软删除的记录
   */
  async restore(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.model.update({
      where: { id } as ModelTypes<T>['WhereUniqueInput'],
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 批量恢复软删除的记录
   */
  async restoreMany(where: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    return this.model.updateMany({
      where,
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  /**
   * 永久删除记录（物理删除）
   */
  async forceDelete(
    options: {
      id: number | string
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    const { id, include, select } = options
    return this.deleteById({ id, include, select })
  }

  /**
   * 批量永久删除记录（物理删除）
   */
  async forceDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    return this.deleteMany(where)
  }

  /**
   * 查找记录（包含软删除记录）
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
   * 只查找软删除的记录
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
   * 内部查询方法，统一处理查询逻辑
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

    // 设置默认排序为 id
    const finalOrderBy =
      orderBy || ({ id: 'desc' } as ModelTypes<T>['OrderByInput'])

    // 转换分页参数
    const skip =
      pageIndex !== undefined && pageSize !== undefined
        ? pageIndex * pageSize
        : undefined
    const take = pageSize

    return this.model.findMany({
      ...(finalWhere && { where: finalWhere }),
      orderBy: finalOrderBy,
      ...(skip !== undefined && { skip }),
      ...(take !== undefined && { take }),
      ...(include && { include }),
      ...(select && { select }),
      ...(omit && { omit }),
    })
  }

  /**
   * 分页查询（包含软删除记录）
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

  /**
   * 分页查询软删除记录
   */
  async findOnlyDeletedPagination(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<PaginationResult<ModelTypes<T>['Model']>> {
    if (!this.supportsSoftDelete) {
      const { pageIndex = 1, pageSize = 10 } = options || {}
      return { list: [], total: 0, pageIndex, pageSize }
    }
    return this._paginationInternal(options, 'onlyDeleted')
  }

  /**
   * 内部分页查询方法，统一处理分页逻辑
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
      pageIndex = 1,
      pageSize = 10,
      where,
      orderBy,
      include,
      select,
      omit,
    } = options || {}

    let finalWhere = where
    let countWhere = where

    // 根据模式处理 where 条件
    switch (mode) {
      case 'normal':
        if (this.supportsSoftDelete) {
          finalWhere = this.getWhereWithoutDeleted(where)
          countWhere = finalWhere
        }
        break
      case 'withDeleted':
        // 不做任何过滤，包含所有记录
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
          pageIndex: pageIndex - 1, // 转换为从0开始的索引
          pageSize,
          include,
          select,
          omit,
        },
        false,
      ), // 不再应用软删除过滤，因为已经在上面处理了
      this._countInternal(countWhere, mode !== 'normal'),
    ])

    return { list: data, total, pageIndex, pageSize }
  }

  /**
   * 统计记录数量（包含软删除）
   */
  async countWithDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, true)
  }

  /**
   * 统计软删除记录数量
   */
  async countOnlyDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    if (!this.supportsSoftDelete) return 0

    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    return this._countInternal(whereOnlyDeleted, true)
  }

  /**
   * 获取软删除统计信息
   */
  async getSoftDeleteStats(where?: ModelTypes<T>['WhereInput']): Promise<{
    total: number
    active: number
    deleted: number
  }> {
    if (!this.supportsSoftDelete) {
      const total = await this._countInternal(where, false)
      return { total, active: total, deleted: 0 }
    }

    const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
    const [total, active, deleted] = await Promise.all([
      this._countInternal(where, true), // 包含软删除的总数
      this._countInternal(where, false), // 活跃记录数
      this._countInternal(whereOnlyDeleted, true), // 软删除记录数
    ])

    return { total, active, deleted }
  }
}
