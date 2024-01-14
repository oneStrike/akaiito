import { App, Config, Context, httpError, Inject } from '@midwayjs/core'
import { Application } from '@midwayjs/koa'
import type { PrismaConfig } from '../../typings/config/prisma'
import {
  FindPageResponse,
  PrismaFindOptions
} from '../../typings/service/base.service'
import type { IterateObject } from '@akaiito/typings/src'
import { utils } from '../../utils'
import { BaseOrderDto } from '../dto/base.dto'

export abstract class BaseService<T = IterateObject> {
  // 注入应用实例
  @App()
  protected app: Application

  // 注入Prisma配置
  @Config('prisma')
  prismaConfig: PrismaConfig

  // 注入上下文
  @Inject()
  protected ctx: Context

  // 抽象模型
  protected abstract model: any

  //手动抛出异常
  throwError(message: string) {
    throw new httpError.BadRequestError(message)
  }

  async getCount(where?: PrismaFindOptions<T>): Promise<number> {
    return await this.model.count(where || {})
  }

  //是否存在
  async exists(options: PrismaFindOptions<T>): Promise<boolean> {
    const result = await this.model.findFirst({
      where: this.handlerWhere(options).where
    })
    return !!result
  }

  // 创建数据
  async create(data: Partial<T>): Promise<number> {
    const { id } = await this.model.create({ data })
    return id
  }

  //更新数据
  async update(options: PrismaFindOptions<T>, data: IterateObject) {
    try {
      return await this.model.update({
        where: this.handlerWhere(options).where,
        data
      })
    } catch (e) {
      return null
    }
  }

  //批量更新数据
  async updateBatch(options: PrismaFindOptions<T>, data: IterateObject) {
    try {
      return await this.model.updateMany({
        where: this.handlerWhere(options).where,
        data
      })
    } catch (e) {
      return null
    }
  }

  //更新排序
  async updateOrder(info: BaseOrderDto) {
    await Promise.all([
      this.update(
        { where: { id: info.targetId } },
        { order: info.targetOrder }
      ),
      this.update({ where: { id: info.originId } }, { order: info.originOrder })
    ])
    return info.targetId
  }

  // 软删除
  async softDeletion(options?: PrismaFindOptions<T>) {
    return await this.update(
      { where: this.handlerWhere(options).where },
      { deletedAt: new Date() }
    )
  }

  //删除
  async delete(options?: PrismaFindOptions<T>) {
    return await this.model.delete({
      where: this.handlerWhere(options).where
    })
  }

  //批量删除
  async deleteBatch(options?: PrismaFindOptions<T>) {
    return await this.model.deleteMany({
      where: this.handlerWhere(options).where
    })
  }

  // 根据条件查询唯一数据
  async findUnique(options?: PrismaFindOptions<T>): Promise<T | null> {
    return this.handlerExcludeField(
      this.excludeField(options.excludes),
      await this.model.findUnique(this.handlerWhere(options))
    )
  }

  // 分页查询
  async findPage(options?: PrismaFindOptions<T>): FindPageResponse<T> {
    const excludes = this.excludeField(options.excludes)
    const where = this.handlerWhere(options, true)
    console.log('🚀 ~ file:base.service method:findPage line:121 -----', where)
    // 并行查询总数和数据
    const [total, record] = await Promise.all([
      this.getCount(),
      this.model.findMany(where)
    ])
    return {
      pageSize: record?.length ?? 0,
      pageIndex: where.pageIndex,
      total,
      list: this.handlerExcludeField(excludes, record)
    }
  }

  // 查询列表
  async findList(options?: PrismaFindOptions<T>) {
    const excludes = this.excludeField(options.excludes)
    const result = await this.model.findMany({
      ...this.handlerWhere(options),
      take: this.prismaConfig.maxListItemLimit
    })

    return {
      data: this.handlerExcludeField(excludes, result),
      total: result.length
    }
  }

  //排除结果中的指定字段
  handlerExcludeField<T>(excludes: string[], data: T): T {
    if (!excludes || !excludes.length) return data
    if (Array.isArray(data)) {
      return data.map((item) => utils._.omit(item, excludes)) as T
    } else {
      return utils._.omit(data as object, excludes) as T
    }
  }

  //处理where
  handlerWhere(options: PrismaFindOptions<T>, page?: boolean) {
    const optionsKeys = [
      'orderBy',
      'pageSize',
      'pageIndex',
      'where',
      'fuzzy',
      'excludes'
    ]

    const where: IterateObject = {
      where: utils._.omit(options, optionsKeys) || {}
    }

    where.orderBy = this.orderBy(options.orderBy)

    if (options?.fuzzy) {
      where.where = this.fuzzyQuery(
        options.fuzzy,
        Object.assign(where.where, options.where)
      )
    }

    if (page) {
      const { pageIndex, pageSize } = this.pagination(options)
      where.skip = (pageIndex - 1) * pageSize
      where.take = pageSize
    }

    return where
  }

  //分页
  pagination(options: IterateObject) {
    const { pageSize, pageIndex } = options
    return {
      pageSize: pageSize || this.prismaConfig.pagination.pageSize,
      pageIndex: pageIndex || this.prismaConfig.pagination.pageIndex
    }
  }

  //排序
  orderBy(orderBy?: string) {
    return utils.isJson(orderBy)
      ? Object.assign(this.prismaConfig.orderBy, JSON.parse(orderBy))
      : this.prismaConfig.orderBy
  }

  /**
   * 模糊查询函数
   *
   * @param options - 查询选项的模糊匹配部分
   * @param where - 查询条件
   * @returns 返回模糊查询条件
   */
  fuzzyQuery(
    options: PrismaFindOptions<T>['fuzzy'],
    where: PrismaFindOptions<T>['where']
  ) {
    if (!Array.isArray(options)) return where
    options.forEach((item: PrismaFindOptions<T>['fuzzy'][number]) => {
      if (typeof item === 'string') {
        if (where[item]) {
          where[item] = {
            startsWith: `%${where[item]}%`
          }
        }
      } else {
        where[item.field] = {
          startsWith: item.pos.replace('V', where[item.field])
        }
      }
    })
    return where
  }

  //排除的字段
  excludeField(field: string[] = []) {
    return field.concat(this.prismaConfig.excludes || [])
  }
}
