import { App, Config, Context, httpError, Inject } from '@midwayjs/core'
import { Application } from '@midwayjs/koa'
import type { PrismaConfig } from '../../typings/config/prisma'
import {
  FindPageResponse,
  WhereOptions
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

  async getCount(): Promise<number> {
    return this.model.count()
  }

  //是否存在
  async exists(where: WhereOptions<T>): Promise<boolean> {
    const result = await this.model.findFirst({ where })
    return !!result
  }

  // 创建数据
  async create(data: Partial<T>): Promise<T> {
    const { id } = await this.model.create({ data })
    return id
  }

  //更新数据
  async update(where: WhereOptions<T>, data: IterateObject) {
    try {
      return await this.model.update({ where, data })
    } catch (e) {
      return null
    }
  }

  //更新数据
  async updateBatch(where: WhereOptions<T>, data: IterateObject) {
    try {
      return await this.model.updateMany({ where, data })
    } catch (e) {
      return null
    }
  }

  //根据主键id更新数据
  async updateById(id: number, data: Partial<T>): Promise<T | null> {
    return await this.update({ id }, data)
  }

  //更新排序
  async updateOrder(info: BaseOrderDto) {
    await Promise.all([
      this.update({ id: info.targetId }, { order: info.targetOrder }),
      this.update({ id: info.originId }, { order: info.originOrder })
    ])
    return info.targetId
  }

  // 软删除
  async softDeletion(where: WhereOptions<T>) {
    return await this.update(where, { deletedAt: new Date() })
  }

  //删除
  async delete(where: WhereOptions<T>) {
    return await this.model.delete({ where })
  }

  // 根据条件查询唯一数据
  async findUnique(where: WhereOptions<T>): Promise<T | null> {
    const excludes = where.excludes
    return this.excludesField(excludes, await this.model.findUnique({ where }))
  }

  // 根据ID查询数据
  async findById(id: number, excludes?: string[]): Promise<T | null> {
    return await this.findUnique({ id, excludes })
  }

  // 分页查询
  async findPage(
    options?: WhereOptions<T> & PrismaConfig['pagination']
  ): FindPageResponse<T> {
    // 合并分页配置
    const { pageIndex, pageSize, orderBy, where, excludes } =
      this.pagination(options)
    // 查询选项
    const findOptions = {
      where,
      orderBy,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize
    }
    // 并行查询总数和数据
    const [total, res] = await Promise.all([
      this.getCount(),
      this.model.findMany(findOptions, this.prismaConfig.timeSerialize)
    ])
    return {
      pageSize: res?.length ?? 0,
      pageIndex,
      total,
      list: this.excludesField(excludes, res)
    }
  }

  // 查询列表
  async findList(where?: WhereOptions<T>) {
    const excludes = where.excludes
    const orderBy = utils.isJson(where.orderBy)
      ? Object.assign(this.prismaConfig.orderBy, JSON.parse(where.orderBy))
      : this.prismaConfig.orderBy
    const result = await this.model.findMany({
      where,
      take: this.prismaConfig.maxListItemLimit,
      orderBy
    })

    return {
      data: this.excludesField(excludes, result),
      total: result.length
    }
  }

  //排除结果中的指定字段
  excludesField(excludes: string[], data: IterateObject | IterateObject[]) {
    excludes = this.prismaConfig.excludes?.concat(excludes)
    if (!excludes || !excludes.length) return data
    const target = Array.isArray(data) ? data : [data]
    target.forEach((item) => {
      for (const itemKey in item) {
        if (excludes.includes(itemKey)) delete item[itemKey]
      }
    })
    return Array.isArray(data) ? target : target[0]
  }

  //分页参数
  pagination(options: IterateObject) {
    if (!options) return {}
    const { pageSize, pageIndex, orderBy: orderByJson, excludes } = options
    const orderBy = utils.isJson(orderByJson)
      ? Object.assign(this.prismaConfig.orderBy, JSON.parse(orderByJson))
      : this.prismaConfig.orderBy

    return {
      where: utils._.omit(options, [
        ...Object.keys(this.prismaConfig.pagination),
        'excludes'
      ]),
      pageSize: pageSize || this.prismaConfig.pagination.pageSize,
      pageIndex: pageIndex || this.prismaConfig.pagination.pageIndex,
      orderBy,
      excludes
    }
  }
}
