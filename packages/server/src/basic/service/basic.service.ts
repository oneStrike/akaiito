import type { PrismaConfig } from '@/typings/config/prisma'
import { FindPageResponse } from '@/typings/service/base.service'
import { Context } from '@midwayjs/core'
import { Application } from '@midwayjs/koa'
import { utils } from '@/utils'
import { App, Config, httpError, Inject } from '@midwayjs/core'
import {
  PrismaCreateOptions,
  PrismaDeleteOptions,
  PrismaFindPageOptions,
  PrismaFindUniqueOptions,
  PrismaGetCountOptions,
  PrismaInstanceModel,
  PrismaIsExistsOptions,
  PrismaUpdateOptions,
  PrismaUpdateOrderOptions,
  PrismaUpsertBatchOptions,
  PrismaUpsertOptions,
  WhereOptions,
} from '@/typings/prisma'

export abstract class BasicService<T extends PrismaInstanceModel> {
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

  getCount(options?: PrismaGetCountOptions<T>): number {
    if (options && options.where) {
      return this.model.count({ where: options.where })
    } else {
      return this.model.count()
    }
  }

  // 是否存在
  isExists(options: PrismaIsExistsOptions<T>): boolean {
    return !!this.model.findFirst({ where: options.where })
  }

  // 创建数据
  create(options: PrismaCreateOptions<T>) {
    if (!options.select) {
      options.select = {
        id: true,
      }
    }
    return this.model.create(options)
  }

  // 更新数据
  update(options: PrismaUpdateOptions<T>) {
    if (!options.select && !options.include) {
      options.select = {
        id: true,
      }
    }
    return this.model.update(options)
  }

  // 更新或插入一条数据
  upsert(options: PrismaUpsertOptions<T>) {
    if (!options.select) {
      options.select = {
        id: true,
      }
    }
    return this.model.upsert(options)
  }

  // 批量更新数据
  updateBatch(options: PrismaUpsertBatchOptions<T>) {
    return this.model.updateMany(options)
  }

  // 更新排序
  async updateOrder(info: PrismaUpdateOrderOptions) {
    await Promise.all([
      this.update({
        where: { id: info.targetId } as T,
        data: { order: info.targetOrder } as unknown as T,
      }),
      this.update({
        where: { id: info.originId } as T,
        data: { order: info.originOrder } as unknown as T,
      }),
    ])
    return info.targetId
  }

  // 软删除
  softDeletion(where: WhereOptions<T>) {
    return this.update({
      where,
      data: { deletedAt: new Date() } as T,
    })
  }

  // 删除
  delete(options?: PrismaDeleteOptions<T>) {
    if (!options.select) {
      options.select = {
        id: true,
      }
    }
    return this.model.delete(options)
  }

  // 批量删除
  deleteBatch(options?: Pick<PrismaDeleteOptions<T>, 'where'>) {
    return this.model.deleteMany(options)
  }

  // 根据条件查询多条数据
  findMany(options?: PrismaFindUniqueOptions<T>): Promise<(T | null)[]> {
    return this.model.findMany(options)
  }

  // 根据条件查询第一条数据
  findFirst(options?: PrismaFindUniqueOptions<T>): Promise<T | null> {
    return this.model.findFirst(options)
  }

  // 根据条件查询唯一数据
  findUnique(options?: PrismaFindUniqueOptions<T>): PrismaInstanceModel | null {
    return this.model.findUnique(options)
  }

  // 分页查询
  async findPage(options?: PrismaFindPageOptions<T>): FindPageResponse<T> {
    const pageOptionsKeys = ['pageSize', 'pageIndex', 'orderBy', 'startTime', 'endTime']
    const { pagination } = this.prismaConfig
    pageOptionsKeys.forEach((item) => {
      switch (item) {
        case 'pageSize':
          options.take = Number(options.where.pageSize || pagination.pageSize)
          break
        case 'pageIndex':
          options.skip = Number((options.where.pageIndex || pagination.pageIndex) * options.take)
          break
        case 'orderBy':
          if (options.where.orderBy) {
            options.orderBy = utils.parseJson(options.where.orderBy)
          } else {
            options.orderBy = this.prismaConfig.orderBy
          }
          break
        case 'startTime':
          if (options.where.startTime) {
            options.where.createdAt = {
              gte: options.where.startTime,
            }
          }
          break
        case 'endTime':
          if (options.where.endTime) {
            if (!options.where.createdAt) {
              options.where.createdAt = {}
            }
            options.where.createdAt.lte = options.where.endTime
          }
      }
      delete options.where[item]
    })
    if (options.like) {
      for (const likeKey in options.like) {
        // @ts-ignore
        options.where[likeKey] = {
          [options.like[likeKey]]: options.where[likeKey],
        }
      }
      delete options.like
    }

    // 并行查询总数和数据
    const [total, record] = await Promise.all([this.getCount({ where: options.where }), this.model.findMany(options)])
    return {
      pageSize: record?.length ?? 0,
      pageIndex: options.where.skip ? options.where.skip / options.where.take + 1 : 1,
      total,
      list: record,
    }
  }

  // 获取列表数据
  async findList(options?: PrismaFindPageOptions<T>): FindPageResponse<T> {
    if (!options?.where) {
      options = { where: {} }
    }
    options.where.pageIndex = 0
    options.where.pageSize = 500
    return await this.findPage(options)
  }
}
