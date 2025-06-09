import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'
import { Prisma } from '@/prisma/client'

// 基础类型定义
export interface PaginationResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface BatchResult {
  count: number
}

export interface SoftDeletableEntity {
  deletedAt?: Date | null
}

// 假设 TModelName 是从 Prisma.ModelName 中来的
type ModelName = keyof typeof Prisma.ModelName

// 从模型名称推导相关类型
interface InferModelTypes<T extends ModelName> {
  Model: Prisma.TypeMap['model'][T]['operations']['findMany']['result']
  WhereInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['where']
  CreateInput: Prisma.TypeMap['model'][T]['operations']['create']['args']['data']
  UpdateInput: Prisma.TypeMap['model'][T]['operations']['update']['args']['data']
  OrderByInput: Prisma.TypeMap['model'][T]['operations']['findMany']['args']['orderBy']
  Include: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['include']
  Select: Prisma.TypeMap['model'][T]['operations']['findFirst']['args']['select']
}

// 获取Prisma客户端的模型代理类型
type GetModelDelegate<TModelName extends ModelName> =
  Prisma.TypeMap['model'][TModelName]['operations']

/**
 * 抽象数据库服务层
 * 提供通用的数据库操作方法，支持完全自动化的类型推导
 * 包含软删除功能
 *
 * @template TModelName - Prisma模型名称，用于自动推导所有相关类型
 */
@Injectable()
export abstract class BaseRepositoryService<TModelName extends ModelName> {
  protected readonly logger: Logger
  protected abstract readonly modelName: TModelName
  protected readonly supportsSoftDelete: boolean = false

  // 自动推导的类型别名，提供更好的IDE支持
  protected type!: InferModelTypes<TModelName>

  constructor(protected readonly prisma: PrismaService) {
    this.logger = new Logger(this.constructor.name)
  }

  /**
   * 获取 Prisma 模型代理
   * 使用类型安全的方式返回对应的 Prisma 模型
   */
  protected abstract model: any

  /**
   * 创建单条记录
   * @param data 创建数据
   * @param include 关联查询
   * @param select 字段选择
   * @returns 创建的记录
   */
  async create(
    data: InferModelTypes<TModelName>['CreateInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    try {
      this.logger.debug(`创建${this.modelName}记录`, { data })

      const options: any = { data }
      if (include) options.include = include
      if (select) options.select = select

      const result = await this.model.create(options)
      this.logger.log(`✅ 成功创建${this.modelName}记录`, { id: result.id })
      return result
    } catch (error) {
      this.logger.error(`❌ 创建${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 批量创建记录
   * @param data 创建数据数组
   * @param skipDuplicates 是否跳过重复记录
   * @returns 创建结果
   */
  async createMany(
    data: InferModelTypes<TModelName>['CreateInput'][],
    skipDuplicates = false,
  ): Promise<Prisma.BatchPayload> {
    try {
      this.logger.debug(`批量创建${this.modelName}记录`, { count: data.length })

      const result = await model.createMany({
        data,
        skipDuplicates,
      })

      this.logger.log(`✅ 成功批量创建${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量创建${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 根据ID查找单条记录
   * @param id 记录ID
   * @param include 关联查询
   * @param select 字段选择
   * @returns 查找到的记录或null
   */
  async findById(
    id: number | string,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model'] | null> {
    try {
      this.logger.debug(`根据ID查找${this.modelName}记录`, { id })

      const options: any = { where: { id } }
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.findUnique(options)

      if (result) {
        this.logger.debug(`✅ 找到${this.modelName}记录`, { id })
      } else {
        this.logger.debug(`⚠️ 未找到${this.modelName}记录`, { id })
      }

      return result
    } catch (error) {
      this.logger.error(`❌ 根据ID查找${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 根据条件查找单条记录
   * @param where 查询条件
   * @param include 关联查询
   * @param select 字段选择
   * @returns 查找到的记录或null
   */
  async findFirst(
    where: T,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model'] | null> {
    try {
      this.logger.debug(`根据条件查找${this.modelName}记录`, { where })

      // 如果支持软删除，自动过滤软删除记录
      const finalWhere = this.supportsSoftDelete
        ? this.getWhereWithoutDeleted(where)
        : where

      const options: any = { where: finalWhere }
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.findFirst(options)

      if (result) {
        this.logger.debug(`✅ 找到${this.modelName}记录`)
      } else {
        this.logger.debug(`⚠️ 未找到${this.modelName}记录`)
      }

      return result
    } catch (error) {
      this.logger.error(`❌ 根据条件查找${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 根据条件查找多条记录
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param skip 跳过记录数
   * @param take 获取记录数
   * @param include 关联查询
   * @param select 字段选择
   * @returns 查找到的记录数组
   */
  async findMany(
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    skip?: number,
    take?: number,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model'][]> {
    try {
      this.logger.debug(`查找多条${this.modelName}记录`, { where, skip, take })

      // 如果支持软删除，自动过滤软删除记录
      const finalWhere = this.supportsSoftDelete
        ? this.getWhereWithoutDeleted(where)
        : where

      const options: any = {}
      if (finalWhere) options.where = finalWhere
      if (orderBy) options.orderBy = orderBy
      if (skip !== undefined) options.skip = skip
      if (take !== undefined) options.take = take
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.findMany(options)

      this.logger.debug(`✅ 找到${result.length}条${this.modelName}记录`)
      return result
    } catch (error) {
      this.logger.error(`❌ 查找多条${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 分页查询
   * @param page 页码（从1开始）
   * @param pageSize 每页大小
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param include 关联查询
   * @param select 字段选择
   * @returns 分页结果
   */
  async findManyWithPagination(
    page: number = 1,
    pageSize: number = 10,
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    try {
      this.logger.debug(`分页查询${this.modelName}记录`, {
        page,
        pageSize,
        where,
      })

      const skip = (page - 1) * pageSize

      // 并行执行查询和计数
      const [data, total] = await Promise.all([
        this.findMany(where, orderBy, skip, pageSize, include, select),
        this.count(where),
      ])

      const totalPages = Math.ceil(total / pageSize)

      this.logger.debug(`✅ 分页查询${this.modelName}完成`, {
        total,
        page,
        pageSize,
        totalPages,
        dataCount: data.length,
      })

      return {
        data,
        total,
        page,
        pageSize,
        totalPages,
      }
    } catch (error) {
      this.logger.error(`❌ 分页查询${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 更新单条记录
   * @param where 查询条件
   * @param data 更新数据
   * @param include 关联查询
   * @param select 字段选择
   * @returns 更新后的记录
   */
  async update(
    where: InferModelTypes<TModelName>['WhereInput'],
    data: InferModelTypes<TModelName>['UpdateInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    try {
      this.logger.debug(`更新${this.modelName}记录`, { where, data })

      const options: any = { where, data }
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.update(options)

      this.logger.log(`✅ 成功更新${this.modelName}记录`, { id: result.id })
      return result
    } catch (error) {
      this.logger.error(`❌ 更新${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 根据ID更新记录
   * @param id 记录ID
   * @param data 更新数据
   * @param include 关联查询
   * @param select 字段选择
   * @returns 更新后的记录
   */
  async updateById(
    id: number | string,
    data: InferModelTypes<TModelName>['UpdateInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    return this.update(
      { id } as InferModelTypes<TModelName>['WhereInput'],
      data,
      include,
      select,
    )
  }

  /**
   * 批量更新记录
   * @param where 查询条件
   * @param data 更新数据
   * @returns 更新结果
   */
  async updateMany(
    where: InferModelTypes<TModelName>['WhereInput'],
    data: InferModelTypes<TModelName>['UpdateInput'],
  ): Promise<Prisma.BatchPayload> {
    try {
      this.logger.debug(`批量更新${this.modelName}记录`, { where, data })

      const result = await model.updateMany({
        where,
        data,
      })

      this.logger.log(`✅ 成功批量更新${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量更新${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 删除单条记录
   * @param where 查询条件
   * @param include 关联查询
   * @param select 字段选择
   * @returns 删除的记录
   */
  async delete(
    where: InferModelTypes<TModelName>['WhereInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    try {
      this.logger.debug(`删除${this.modelName}记录`, { where })

      const options: any = { where }
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.delete(options)

      this.logger.log(`✅ 成功删除${this.modelName}记录`, { id: result.id })
      return result
    } catch (error) {
      this.logger.error(`❌ 删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 根据ID删除记录
   * @param id 记录ID
   * @param include 关联查询
   * @param select 字段选择
   * @returns 删除的记录
   */
  async deleteById(
    id: number | string,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    return this.delete(
      { id } as InferModelTypes<TModelName>['WhereInput'],
      include,
      select,
    )
  }

  /**
   * 批量删除记录
   * @param where 查询条件
   * @returns 删除结果
   */
  async deleteMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<Prisma.BatchPayload> {
    try {
      this.logger.debug(`批量删除${this.modelName}记录`, { where })

      const result = await model.deleteMany({ where })

      this.logger.log(`✅ 成功批量删除${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 统计记录数量
   * @param where 查询条件
   * @returns 记录数量
   */
  async count(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    try {
      this.logger.debug(`统计${this.modelName}记录数量`, { where })

      // 如果支持软删除，自动过滤软删除记录
      const finalWhere = this.supportsSoftDelete
        ? this.getWhereWithoutDeleted(where)
        : where

      const options: any = {}
      if (finalWhere) options.where = finalWhere

      const result = await model.count(options)

      this.logger.debug(`✅ ${this.modelName}记录数量: ${result}`)
      return result
    } catch (error) {
      this.logger.error(`❌ 统计${this.modelName}记录数量失败`, error)
      throw error
    }
  }

  /**
   * 检查记录是否存在
   * @param where 查询条件
   * @returns 是否存在
   */
  async exists(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<boolean> {
    try {
      this.logger.debug(`检查${this.modelName}记录是否存在`, { where })

      const count = await this.count(where)
      const exists = count > 0

      this.logger.debug(`✅ ${this.modelName}记录存在性检查: ${exists}`)
      return exists
    } catch (error) {
      this.logger.error(`❌ 检查${this.modelName}记录是否存在失败`, error)
      throw error
    }
  }

  /**
   * 创建或更新记录（upsert）
   * @param where 查询条件
   * @param create 创建数据
   * @param update 更新数据
   * @param include 关联查询
   * @param select 字段选择
   * @returns 创建或更新的记录
   */
  async upsert(
    where: InferModelTypes<TModelName>['WhereInput'],
    create: InferModelTypes<TModelName>['CreateInput'],
    update: InferModelTypes<TModelName>['UpdateInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    try {
      this.logger.debug(`创建或更新${this.modelName}记录`, {
        where,
        create,
        update,
      })

      const options: any = { where, create, update }
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.upsert(options)

      this.logger.log(`✅ 成功创建或更新${this.modelName}记录`, {
        id: result.id,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 创建或更新${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 执行事务
   * @param callback 事务回调函数
   * @returns 事务结果
   */
  async transaction<R>(
    callback: (prisma: PrismaService) => Promise<R>,
  ): Promise<R> {
    try {
      this.logger.debug(`开始执行${this.modelName}相关事务`)

      const result = await this.prisma.$transaction(callback)

      this.logger.log(`✅ ${this.modelName}相关事务执行成功`)
      return result
    } catch (error) {
      this.logger.error(`❌ ${this.modelName}相关事务执行失败`, error)
      throw error
    }
  }

  /**
   * 执行原始查询
   * @param query 原始SQL查询
   * @param params 查询参数
   * @returns 查询结果
   */
  async queryRaw<R = any>(query: string, ...params: any[]): Promise<R> {
    try {
      this.logger.debug(`执行${this.modelName}原始查询`, { query, params })

      const result = await this.prisma.$queryRawUnsafe<R>(query, ...params)

      this.logger.debug(`✅ ${this.modelName}原始查询执行成功`)
      return result
    } catch (error) {
      this.logger.error(`❌ ${this.modelName}原始查询执行失败`, error)
      throw error
    }
  }

  /**
   * 执行原始操作（增删改）
   * @param query 原始SQL操作
   * @param params 操作参数
   * @returns 影响的行数
   */
  async executeRaw(query: string, ...params: any[]): Promise<number> {
    try {
      this.logger.debug(`执行${this.modelName}原始操作`, { query, params })

      const result = await this.prisma.$executeRawUnsafe(query, ...params)

      this.logger.log(`✅ ${this.modelName}原始操作执行成功`, {
        affectedRows: result,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ ${this.modelName}原始操作执行失败`, error)
      throw error
    }
  }

  // ==================== 软删除相关方法 ====================

  /**
   * 获取排除软删除记录的查询条件
   * @param where 原始查询条件
   * @returns 包含软删除过滤的查询条件
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
   * @param where 原始查询条件
   * @returns 只包含软删除记录的查询条件
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
   * @param id 记录ID
   * @returns 软删除后的记录
   */
  async softDelete(
    id: number | string,
  ): Promise<InferModelTypes<TModelName>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    try {
      this.logger.debug(`软删除${this.modelName}记录`, { id })

      const result = await this.updateById(id, {
        deletedAt: new Date(),
      } as InferModelTypes<TModelName>['UpdateInput'])

      this.logger.log(`✅ 成功软删除${this.modelName}记录`, { id })
      return result
    } catch (error) {
      this.logger.error(`❌ 软删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 批量软删除记录
   * @param where 查询条件
   * @returns 软删除结果
   */
  async softDeleteMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    try {
      this.logger.debug(`批量软删除${this.modelName}记录`, { where })

      const result = await this.updateMany(where, {
        deletedAt: new Date(),
      } as InferModelTypes<TModelName>['UpdateInput'])

      this.logger.log(`✅ 成功批量软删除${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量软删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 恢复软删除的记录
   * @param id 记录ID
   * @returns 恢复后的记录
   */
  async restore(
    id: number | string,
  ): Promise<InferModelTypes<TModelName>['Model']> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    try {
      this.logger.debug(`恢复${this.modelName}记录`, { id })

      // 直接更新，不过滤软删除条件
      const result = await model.update({
        where: { id },
        data: { deletedAt: null },
      })

      this.logger.log(`✅ 成功恢复${this.modelName}记录`, { id })
      return result
    } catch (error) {
      this.logger.error(`❌ 恢复${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 批量恢复软删除的记录
   * @param where 查询条件
   * @returns 恢复结果
   */
  async restoreMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    if (!this.supportsSoftDelete) {
      throw new Error(`${this.modelName} 不支持软删除功能`)
    }

    try {
      this.logger.debug(`批量恢复${this.modelName}记录`, { where })

      // 直接更新，不过滤软删除条件
      const result = await model.updateMany({
        where,
        data: { deletedAt: null },
      })

      this.logger.log(`✅ 成功批量恢复${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量恢复${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 永久删除记录（物理删除）
   * @param id 记录ID
   * @param include 关联查询
   * @param select 字段选择
   * @returns 删除的记录
   */
  async forceDelete(
    id: number | string,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model']> {
    try {
      this.logger.debug(`永久删除${this.modelName}记录`, { id })

      const result = await this.deleteById(id, include, select)

      this.logger.log(`✅ 成功永久删除${this.modelName}记录`, { id })
      return result
    } catch (error) {
      this.logger.error(`❌ 永久删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 批量永久删除记录（物理删除）
   * @param where 查询条件
   * @returns 删除结果
   */
  async forceDeleteMany(
    where: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<BatchResult> {
    try {
      this.logger.debug(`批量永久删除${this.modelName}记录`, { where })

      const result = await this.deleteMany(where)

      this.logger.log(`✅ 成功批量永久删除${this.modelName}记录`, {
        count: result.count,
      })
      return result
    } catch (error) {
      this.logger.error(`❌ 批量永久删除${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 查找记录（包含软删除记录）
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param skip 跳过记录数
   * @param take 获取记录数
   * @param include 关联查询
   * @param select 字段选择
   * @returns 查找到的记录数组
   */
  async findWithDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    skip?: number,
    take?: number,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model'][]> {
    try {
      this.logger.debug(`查找${this.modelName}记录（包含软删除）`, {
        where,
        skip,
        take,
      })

      const options: any = {}
      if (where) options.where = where
      if (orderBy) options.orderBy = orderBy
      if (skip !== undefined) options.skip = skip
      if (take !== undefined) options.take = take
      if (include) options.include = include
      if (select) options.select = select

      const result = await model.findMany(options)

      this.logger.debug(
        `✅ 找到${result.length}条${this.modelName}记录（包含软删除）`,
      )
      return result
    } catch (error) {
      this.logger.error(`❌ 查找${this.modelName}记录失败（包含软删除）`, error)
      throw error
    }
  }

  /**
   * 只查找软删除的记录
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param skip 跳过记录数
   * @param take 获取记录数
   * @param include 关联查询
   * @param select 字段选择
   * @returns 查找到的软删除记录数组
   */
  async findOnlyDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    skip?: number,
    take?: number,
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<InferModelTypes<TModelName>['Model'][]> {
    if (!this.supportsSoftDelete) {
      return []
    }

    try {
      this.logger.debug(`查找已软删除的${this.modelName}记录`, {
        where,
        skip,
        take,
      })

      const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
      const result = await this.findWithDeleted(
        whereOnlyDeleted,
        orderBy,
        skip,
        take,
        include,
        select,
      )

      this.logger.debug(
        `✅ 找到${result.length}条已软删除的${this.modelName}记录`,
      )
      return result
    } catch (error) {
      this.logger.error(`❌ 查找已软删除的${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 分页查询（包含软删除记录）
   * @param page 页码
   * @param pageSize 每页大小
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param include 关联查询
   * @param select 字段选择
   * @returns 分页结果
   */
  async findWithDeletedPagination(
    page: number = 1,
    pageSize: number = 10,
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    try {
      this.logger.debug(`分页查询${this.modelName}记录（包含软删除）`, {
        page,
        pageSize,
        where,
      })

      const skip = (page - 1) * pageSize

      // 并行执行查询和计数
      const [data, total] = await Promise.all([
        this.findWithDeleted(where, orderBy, skip, pageSize, include, select),
        this.countWithDeleted(where),
      ])

      const totalPages = Math.ceil(total / pageSize)

      this.logger.debug(`✅ 分页查询${this.modelName}完成（包含软删除）`, {
        total,
        page,
        pageSize,
        totalPages,
        dataCount: data.length,
      })

      return {
        data,
        total,
        page,
        pageSize,
        totalPages,
      }
    } catch (error) {
      this.logger.error(
        `❌ 分页查询${this.modelName}记录失败（包含软删除）`,
        error,
      )
      throw error
    }
  }

  /**
   * 分页查询软删除记录
   * @param page 页码
   * @param pageSize 每页大小
   * @param where 查询条件
   * @param orderBy 排序条件
   * @param include 关联查询
   * @param select 字段选择
   * @returns 分页结果
   */
  async findOnlyDeletedPagination(
    page: number = 1,
    pageSize: number = 10,
    where?: InferModelTypes<TModelName>['WhereInput'],
    orderBy?: InferModelTypes<TModelName>['OrderByInput'],
    include?: InferModelTypes<TModelName>['Include'],
    select?: InferModelTypes<TModelName>['Select'],
  ): Promise<PaginationResult<InferModelTypes<TModelName>['Model']>> {
    if (!this.supportsSoftDelete) {
      return {
        data: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      }
    }

    try {
      this.logger.debug(`分页查询已软删除的${this.modelName}记录`, {
        page,
        pageSize,
        where,
      })

      const skip = (page - 1) * pageSize
      const whereOnlyDeleted = this.getWhereOnlyDeleted(where)

      // 并行执行查询和计数
      const [data, total] = await Promise.all([
        this.findWithDeleted(
          whereOnlyDeleted,
          orderBy,
          skip,
          pageSize,
          include,
          select,
        ),
        this.countWithDeleted(whereOnlyDeleted),
      ])

      const totalPages = Math.ceil(total / pageSize)

      this.logger.debug(`✅ 分页查询已软删除的${this.modelName}完成`, {
        total,
        page,
        pageSize,
        totalPages,
        dataCount: data.length,
      })

      return {
        data,
        total,
        page,
        pageSize,
        totalPages,
      }
    } catch (error) {
      this.logger.error(`❌ 分页查询已软删除的${this.modelName}记录失败`, error)
      throw error
    }
  }

  /**
   * 统计记录数量（包含软删除）
   * @param where 查询条件
   * @returns 记录数量
   */
  async countWithDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    try {
      this.logger.debug(`统计${this.modelName}记录数量（包含软删除）`, {
        where,
      })

      const options: any = {}
      if (where) options.where = where

      const result = await model.count(options)

      this.logger.debug(`✅ ${this.modelName}记录数量（包含软删除）: ${result}`)
      return result
    } catch (error) {
      this.logger.error(
        `❌ 统计${this.modelName}记录数量失败（包含软删除）`,
        error,
      )
      throw error
    }
  }

  /**
   * 统计软删除记录数量
   * @param where 查询条件
   * @returns 软删除记录数量
   */
  async countOnlyDeleted(
    where?: InferModelTypes<TModelName>['WhereInput'],
  ): Promise<number> {
    if (!this.supportsSoftDelete) {
      return 0
    }

    try {
      this.logger.debug(`统计已软删除的${this.modelName}记录数量`, { where })

      const whereOnlyDeleted = this.getWhereOnlyDeleted(where)
      const result = await this.countWithDeleted(whereOnlyDeleted)

      this.logger.debug(`✅ 已软删除的${this.modelName}记录数量: ${result}`)
      return result
    } catch (error) {
      this.logger.error(`❌ 统计已软删除的${this.modelName}记录数量失败`, error)
      throw error
    }
  }

  /**
   * 获取软删除统计信息
   * @param where 查询条件
   * @returns 统计结果
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

    try {
      this.logger.debug(`获取${this.modelName}软删除统计信息`, { where })

      const [total, active, deleted] = await Promise.all([
        this.countWithDeleted(where),
        this.count(where),
        this.countOnlyDeleted(where),
      ])

      const stats = { total, active, deleted }
      this.logger.debug(`✅ ${this.modelName}软删除统计信息`, stats)

      return stats
    } catch (error) {
      this.logger.error(`❌ 获取${this.modelName}软删除统计信息失败`, error)
      throw error
    }
  }
}
