import type { Prisma } from '@/prisma/client/client'
import { BadRequestException, Global, Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'

export interface PaginationResult<T> {
  list: T[]
  total: number
  pageIndex: number
  pageSize: number
}

export interface BatchResult {
  count: number
}

type ModelName = keyof typeof Prisma.ModelName

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

interface QueryOptions<T extends ModelName> {
  include?: ModelTypes<T>['Include']
  select?: ModelTypes<T>['Select']
  omit?: ModelTypes<T>['Select']
}

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

@Injectable()
@Global()
export abstract class BaseRepositoryService<T extends ModelName> {
  static readonly MAX_PAGE_SIZE = 500
  static readonly DEFAULT_PAGE_SIZE = 15
  static readonly DEFAULT_PAGE_INDEX = 0
  static readonly DEFAULT_SELECT = { id: true }
  static readonly DEFAULT_OMIT = { deletedAt: true }

  protected abstract readonly modelName: T
  protected readonly supportsSoftDelete = false

  constructor(protected readonly prisma: PrismaService) {}

  protected get model() {
    return (this.prisma as Record<string, any>)[this.modelName]
  }

  /**
   * 查询操作参数构建：官方Prisma方案，直接传递omit参数，select/omit互斥，默认合并DEFAULT_OMIT
   */
  private buildQueryArgs(options?: Partial<QueryOptions<T>>) {
    const { select, omit, include } = options || {}
    if (select && omit) throw new Error('select 和 omit 不能同时使用')
    const args: Record<string, any> = {}
    if (select) {
      args.select = select
    } else {
      args.omit = omit
        ? { ...BaseRepositoryService.DEFAULT_OMIT, ...omit }
        : BaseRepositoryService.DEFAULT_OMIT
    }
    if (include) {
      args.include = include
    }
    return args
  }

  /**
   * 写操作参数构建：如未传select/omit，默认select id
   */
  private buildWriteQueryArgs(options?: Partial<QueryOptions<T>>) {
    const { select, omit, include } = options || {}
    if (select && omit) throw new Error('select 和 omit 不能同时使用')
    const args: Record<string, any> = {}
    if (select) {
      args.select = select
    } else if (omit) {
      args.omit = { ...BaseRepositoryService.DEFAULT_OMIT, ...omit }
    } else {
      args.select = { id: true }
    }
    if (include) {
      args.include = include
    }
    return args
  }

  private getWhere(
    where?: ModelTypes<T>['WhereInput'],
    mode: 'active' | 'deleted' | 'all' = 'active',
  ): ModelTypes<T>['WhereInput'] {
    if (!this.supportsSoftDelete) {
      return (where || {}) as ModelTypes<T>['WhereInput']
    }
    if (mode === 'active') {
      return {
        ...(where || {}),
        deletedAt: null,
      } as ModelTypes<T>['WhereInput']
    }
    if (mode === 'deleted') {
      return {
        ...(where || {}),
        deletedAt: { not: null },
      } as ModelTypes<T>['WhereInput']
    }
    return (where || {}) as ModelTypes<T>['WhereInput']
  }

  async create(
    options: { data: ModelTypes<T>['CreateInput'] } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.create({
      data: options.data,
      ...this.buildWriteQueryArgs(options),
    })
  }

  async createMany(options: {
    data: ModelTypes<T>['CreateInput'][]
    skipDuplicates?: boolean
  }): Promise<BatchResult> {
    return this.model.createMany({
      data: options.data,
      skipDuplicates: options.skipDuplicates,
    })
  }

  async findFirst(
    options?: { where?: ModelTypes<T>['WhereInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const where = this.getWhere(options?.where)
    return this.model.findFirst({ where, ...this.buildQueryArgs(options) })
  }

  async findByUnique(
    options: { where: ModelTypes<T>['WhereUniqueInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const where = this.getWhere(options.where as ModelTypes<T>['WhereInput'])
    return this.model.findFirst({ where, ...this.buildQueryArgs(options) })
  }

  async findById(
    options: { id: number } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'] | null> {
    const where = this.getWhere({
      id: options.id,
    } as ModelTypes<T>['WhereInput'])
    return this.model.findFirst({ where, ...this.buildQueryArgs(options) })
  }

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
      'active',
    )
  }

  async findPagination(
    options?: CommonPaginationOptions<T>,
  ): Promise<PaginationResult<any>> {
    const {
      pageSize,
      pageIndex,
      orderBy,
      startDate,
      endDate,
      where,
      dateField = 'createdAt',
      ...rest
    } = options || {}
    let finalWhere = where || ({} as ModelTypes<T>['WhereInput'])
    if (startDate || endDate) {
      const dateCond: Record<string, Date> = {}
      if (startDate) {
        dateCond.gte = new Date(startDate)
      }
      if (endDate) {
        const d = new Date(endDate)
        d.setDate(d.getDate() + 1)
        dateCond.lt = d
      }
      finalWhere = { ...finalWhere, [dateField]: dateCond }
    }
    let finalOrderBy: ModelTypes<T>['OrderByInput'] = { id: 'desc' } as any
    if (orderBy) {
      try {
        finalOrderBy =
          typeof orderBy === 'string' ? JSON.parse(orderBy) : orderBy
      } catch (e) {
        // ignore
      }
    }
    return this._paginationInternal(
      {
        ...rest,
        pageIndex,
        pageSize,
        where: finalWhere,
        orderBy: finalOrderBy,
      },
      'active',
    )
  }

  async update(
    options: {
      where: ModelTypes<T>['WhereUniqueInput']
      data: ModelTypes<T>['UpdateInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.update({
      where: options.where,
      data: options.data,
      ...this.buildWriteQueryArgs(options),
    })
  }

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
      ...rest,
    })
  }

  async updateMany(options: {
    where: ModelTypes<T>['WhereInput']
    data: ModelTypes<T>['UpdateInput']
  }): Promise<BatchResult> {
    return this.model.updateMany({ where: options.where, data: options.data })
  }

  async delete(
    options: { where: ModelTypes<T>['WhereUniqueInput'] } & Partial<
      QueryOptions<T>
    >,
  ): Promise<ModelTypes<T>['Model']> {
    return this.model.delete({
      where: options.where,
      ...this.buildWriteQueryArgs(options),
    })
  }

  async deleteById(
    options: { id: number | string } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.delete({
      where: { id: options.id } as ModelTypes<T>['WhereUniqueInput'],
      ...options,
    })
  }

  async deleteMany(where?: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    return this.model.deleteMany({ where })
  }

  async count(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, 'active')
  }

  async exists(where: ModelTypes<T>['WhereInput']): Promise<boolean> {
    return (await this.count(where)) > 0
  }

  private async _countInternal(
    where?: ModelTypes<T>['WhereInput'],
    mode: 'active' | 'deleted' | 'all' = 'active',
  ): Promise<number> {
    return this.model.count({ where: this.getWhere(where, mode) })
  }

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
      ...this.buildWriteQueryArgs(options),
    })
  }

  async transaction<R>(
    callback: (prisma: PrismaService) => Promise<R>,
  ): Promise<R> {
    return this.prisma.$transaction(callback)
  }

  async queryRaw<R = any>(options: {
    query: string
    params?: unknown[]
  }): Promise<R> {
    return this.prisma.$queryRawUnsafe<R>(
      options.query,
      ...(options.params || []),
    )
  }

  async executeRaw(options: {
    query: string
    params?: unknown[]
  }): Promise<number> {
    return this.prisma.$executeRawUnsafe(
      options.query,
      ...(options.params || []),
    )
  }

  async softDelete(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    if (!(await this.exists({ id } as ModelTypes<T>['WhereInput'])))
      throw new BadRequestException('删除失败，数据不存在')
    return this.updateById({
      id,
      data: { deletedAt: new Date() } as ModelTypes<T>['UpdateInput'],
    })
  }

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

  async restore(id: number): Promise<ModelTypes<T>['Model']> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    return this.updateById({
      id,
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  async restoreMany(where: ModelTypes<T>['WhereInput']): Promise<BatchResult> {
    if (!this.supportsSoftDelete)
      throw new BadRequestException(`${this.modelName} 不支持软删除功能`)
    return this.updateMany({
      where,
      data: { deletedAt: null } as ModelTypes<T>['UpdateInput'],
    })
  }

  async forceDelete(
    options: { id: number | string } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model']> {
    return this.deleteById(options)
  }

  async forceDeleteMany(
    where: ModelTypes<T>['WhereInput'],
  ): Promise<BatchResult> {
    return this.deleteMany(where)
  }

  async findWithDeleted(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'][]> {
    return this._findManyInternal(options, 'all')
  }

  async findOnlyDeleted(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
  ): Promise<ModelTypes<T>['Model'][]> {
    if (!this.supportsSoftDelete) return []
    return this._findManyInternal(options, 'deleted')
  }

  private async _findManyInternal(
    options?: {
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
      pageIndex?: number
      pageSize?: number
    } & Partial<QueryOptions<T>>,
    mode: 'active' | 'deleted' | 'all' = 'active',
  ): Promise<any[]> {
    const { where, orderBy, pageIndex, pageSize, ...rest } = options || {}
    const skip = pageIndex ?? BaseRepositoryService.DEFAULT_PAGE_INDEX
    const take = pageSize ?? BaseRepositoryService.DEFAULT_PAGE_SIZE
    return this.model.findMany({
      where: this.getWhere(where, mode),
      orderBy: orderBy || { id: 'desc' },
      skip,
      take,
      ...this.buildQueryArgs(rest),
    })
  }

  async findWithDeletedPagination(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
  ): Promise<PaginationResult<any>> {
    return this._paginationInternal(options, 'all')
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
    return this._paginationInternal(options, 'deleted')
  }

  private async _paginationInternal(
    options?: {
      pageIndex?: number
      pageSize?: number
      where?: ModelTypes<T>['WhereInput']
      orderBy?: ModelTypes<T>['OrderByInput']
    } & Partial<QueryOptions<T>>,
    mode: 'active' | 'deleted' | 'all' = 'active',
  ): Promise<PaginationResult<any>> {
    const {
      pageIndex = BaseRepositoryService.DEFAULT_PAGE_INDEX,
      pageSize = BaseRepositoryService.DEFAULT_PAGE_SIZE,
      where,
    } = options || {}
    const [list, total] = await Promise.all([
      this._findManyInternal(
        { ...this.buildQueryArgs(options), pageIndex, pageSize },
        mode,
      ),
      this._countInternal(where, mode),
    ])
    return { list, total, pageIndex, pageSize }
  }

  async countWithDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    return this._countInternal(where, 'all')
  }

  async countOnlyDeleted(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    if (!this.supportsSoftDelete) return 0
    return this._countInternal(where, 'deleted')
  }

  async getSoftDeleteStats(
    where?: ModelTypes<T>['WhereInput'],
  ): Promise<{ total: number; active: number; deleted: number }> {
    if (!this.supportsSoftDelete) {
      const total = await this._countInternal(where, 'active')
      return { total, active: total, deleted: 0 }
    }
    const [total, active, deleted] = await Promise.all([
      this._countInternal(where, 'all'),
      this._countInternal(where, 'active'),
      this._countInternal(where, 'deleted'),
    ])
    return { total, active, deleted }
  }

  async getMaxOrder(where?: ModelTypes<T>['WhereInput']): Promise<number> {
    const result = await this.model.aggregate({
      where: this.getWhere(where),
      _max: { order: true },
    })
    return result._max.order || 0
  }

  async dragSort({
    dragId,
    targetId,
  }: {
    dragId: number
    targetId: number
  }): Promise<{ dragId: number; targetId: number }> {
    return this.transaction(async () => {
      const [dragRecord, targetRecord] = await Promise.all([
        this.findById({ id: dragId }),
        this.findById({ id: targetId }),
      ])
      if (!dragRecord || !targetRecord)
        throw new BadRequestException('记录不存在')
      const dragOrder = (dragRecord as any).order
      const targetOrder = (targetRecord as any).order
      if (dragOrder === undefined || targetOrder === undefined)
        throw new BadRequestException('记录缺少排序字段')
      if (dragOrder === targetOrder) return { dragId, targetId }
      await Promise.all([
        this.updateById({
          id: dragId,
          data: { order: targetOrder } as ModelTypes<T>['UpdateInput'],
        }),
        this.updateById({
          id: targetId,
          data: { order: dragOrder } as ModelTypes<T>['UpdateInput'],
        }),
      ])
      return { dragId, targetId }
    })
  }
}
