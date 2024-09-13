import { prismaErrorMessage } from '@/prisma/utils/errorMessage'
import { utils } from '@/utils'
import { App, Config, httpError, Inject } from '@midwayjs/core'
import type { PrismaConfig } from '@/typings/config/prisma'
import type {
  FindPageResponse,
  PrismaFindOptions,
} from '@/typings/service/base.service'
import type { IterateObject } from '@akaiito/typings/src'
import type { Context } from '@midwayjs/core'
import type { Application } from '@midwayjs/koa'
import { BasicOrderDto } from '../dto/basic.dto'

export abstract class BasicService<T = IterateObject> {
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

  // 手动抛出异常
  throwError(message: string) {
    throw new httpError.BadRequestError(message)
  }

  async getCount(where?: PrismaFindOptions<T>): Promise<number> {
    return await this.model.count(where || {})
  }

  // 是否存在
  async exists(options: PrismaFindOptions<T>): Promise<boolean> {
    const result = await this.model.findFirst({
      where: this.handlerWhere(options).where,
    })
    return !!result
  }

  // 创建数据
  async create(data: Partial<T>): Promise<number> {
    const { id } = await this.model.create({ data })
    return id
  }

  // 更新数据
  async update(options: PrismaFindOptions<T>, data: IterateObject) {
    try {
      return await this.model.update({
        where: this.handlerWhere(options).where,
        data,
      })
    } catch (e) {
      return null
    }
  }

  // 更新或插入一条数据
  async upsert(options: PrismaFindOptions<T>, data: IterateObject) {
    try {
      return await this.model.upsert({
        where: this.handlerWhere(options).where,
        update: data,
        create: data,
      })
    } catch (e) {
      return null
    }
  }

  // 批量更新数据
  async updateBatch(options: PrismaFindOptions<T>, data: IterateObject) {
    try {
      return await this.model.updateMany({
        where: this.handlerWhere(options).where,
        data,
      })
    } catch (e) {
      return null
    }
  }

  // 更新排序
  async updateOrder(info: BasicOrderDto) {
    await Promise.all([
      this.update(
        { where: { id: info.targetId } },
        { order: info.targetOrder },
      ),
      this.update(
        { where: { id: info.originId } },
        { order: info.originOrder },
      ),
    ])
    return info.targetId
  }

  // 软删除
  async softDeletion(options?: PrismaFindOptions<T>) {
    return await this.update(
      { where: this.handlerWhere(options).where },
      { deletedAt: new Date() },
    )
  }

  // 删除
  async delete(options?: PrismaFindOptions<T>) {
    try {
      return await this.model.delete({
        where: this.handlerWhere(options).where,
      })
    } catch (e) {
      this.throwError(prismaErrorMessage(e.code))
    }
  }

  // 批量删除
  async deleteBatch(options?: PrismaFindOptions<T>) {
    return await this.model.deleteMany({
      where: this.handlerWhere(options).where,
    })
  }

  // 根据条件查询唯一数据
  async findUnique(options?: PrismaFindOptions<T>): Promise<T | null> {
    const { where } = this.handlerWhere(options)
    return await this.model.findUnique({ where })
  }

  // 分页查询
  async findPage(options?: PrismaFindOptions<T>): FindPageResponse<T> {
    const where = this.handlerWhere(options, true)
    // 并行查询总数和数据
    const [total, record] = await Promise.all([
      this.getCount({ where: where.where }),
      this.model.findMany(where),
    ])
    return {
      pageSize: record?.length ?? 0,
      pageIndex: where.skip ? where.skip / where.take + 1 : 1,
      total,
      list: record,
    }
  }

  // 查询列表
  async findList(options?: PrismaFindOptions<T>) {
    const result = await this.model.findMany({
      ...this.handlerWhere(options),
      take: this.prismaConfig.maxListItemLimit,
    })

    return {
      data: result,
      total: result.length,
    }
  }

  // 处理where
  handlerWhere(options: PrismaFindOptions<T>, page?: boolean) {
    const optionsKeys = [
      'orderBy',
      'pageSize',
      'pageIndex',
      'fuzzy',
      'where',
      'startTime',
      'endTime',
      'omit',
    ]

    const where: IterateObject = {
      where: utils._.omit(options, optionsKeys) || {},
    }

    if (options.where) {
      where.where = Object.assign(where.where, options.where)
    }

    where.orderBy = this.orderBy(options.orderBy)

    if (options?.fuzzy) {
      where.where = this.fuzzyQuery(
        options.fuzzy,
        Object.assign(where.where, options.where),
      )
    }
    if (options?.omit) {
      where.omit = options.omit
    }
    if (!where.where) {
      where.where = {}
    }
    if (options.startTime) {
      where.where.createdAt = {
        gte: options.startTime,
      }
    }
    if (options.endTime) {
      if (!where.where.createdAt) {
        where.where.createdAt = {}
      }
      where.where.createdAt.lte = options.endTime
    }

    if (page) {
      const { pageIndex, pageSize } = this.pagination(options)
      where.skip = Number(pageIndex * pageSize)
      where.take = Number(pageSize)
    }
    return where
  }

  // 分页
  pagination(options: IterateObject) {
    const { pageSize, pageIndex } = options
    return {
      pageSize: pageSize || this.prismaConfig.pagination.pageSize,
      pageIndex: pageIndex || this.prismaConfig.pagination.pageIndex,
    }
  }

  // 排序
  orderBy(orderBy?: string) {
    const orderByArr = []
    if (utils.isJson(orderBy)) {
      orderByArr.push(JSON.parse(orderBy))
    }
    if (this.prismaConfig.orderBy) {
      orderByArr.push(this.prismaConfig.orderBy)
    }
    return orderByArr
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
    where: PrismaFindOptions<T>['where'],
  ) {
    if (!Array.isArray(options)) return where
    options.forEach((item: PrismaFindOptions<T>['fuzzy'][number]) => {
      if (typeof item === 'string') {
        if (where[item]) {
          where[item] = {
            startsWith: `%${where[item]}%`,
          }
        }
      } else {
        where[item.field] = {
          startsWith: item.pos.replace('V', where[item.field]),
        }
      }
    })
    return where
  }
}
