import { App, Config, Context, httpError, Inject } from '@midwayjs/core'
import { Application } from '@midwayjs/koa'
import type { PrismaConfig } from '../../typings/config/prisma'
import {
  FindPageResponse,
  WhereOptions
} from '../../typings/service/base.service'
import type { IterateObject } from '@akaiito/typings/src'
import { utils } from '../../utils'

export abstract class BaseService<T> {
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
  protected abstract model

  //手动抛出异常
  throwError(message: string) {
    throw new httpError.BadRequestError(message)
  }

  //是否存在
  async exists(where: WhereOptions<T>): Promise<boolean> {
    return await this.model.isExists(where)
  }

  // 创建数据
  async create(data: Partial<T>): Promise<T> {
    return await this.model.create({ data })
  }

  //更新数据
  async update(data: { where: WhereOptions<T>; data: Partial<T> }) {
    return await this.model.update(data)
  }

  //根据主键id更新数据
  async updateById(id: number, data: Partial<T>): Promise<T | null> {
    try {
      return await this.model.update({
        where: {
          id
        },
        data
      })
    } catch (e) {
      return null
    }
  }

  // 软删除
  async softDeletion(where: WhereOptions<T>) {
    return await this.model.softDeletion(where)
  }

  // 根据ID查询数据
  async findById(id: number): Promise<T | null> {
    return await this.model.findOne(
      this.mergeCommonQuery({
        where: { id: Number(id) }
      })
    )
  }

  // 根据条件查询唯一数据
  async findUnique(where: WhereOptions<T>): Promise<T | null> {
    return await this.model.findOne(
      this.mergeCommonQuery({
        where
      })
    )
  }

  // 分页查询
  async findPage(
    options?: WhereOptions<T> & PrismaConfig['pagination']
  ): FindPageResponse<T> {
    // 合并分页配置
    const { pageIndex, pageSize, orderBy, where } = this.pagination(options)
    // 查询选项
    const findOptions = this.mergeCommonQuery({
      where,
      orderBy,
      skip: (pageIndex - 1) * pageSize,
      take: pageSize
    })
    // 并行查询总数和数据
    const [total, res] = await Promise.all([
      this.model.count(),
      this.model.find(findOptions, this.prismaConfig.timeSerialize)
    ])
    return {
      pageSize: res?.length ?? 0,
      pageIndex,
      total,
      data: res
    }
  }

  // 查询列表
  async findList(where?: WhereOptions<T>) {
    const result = await this.model.find(
      this.mergeCommonQuery({
        where,
        take: this.prismaConfig.maxListItemLimit
      }),
      this.prismaConfig.timeSerialize
    )

    return {
      data: result,
      total: result.length
    }
  }

  // 合并查询选项
  mergeCommonQuery(options: IterateObject) {
    if (!options.where) options.where = {}
    if (!options.where.deletedAt) options.where.deletedAt = null
    options.exclude = Object.assign(this.prismaConfig.exclude, options.exclude)
    return options
  }

  //分页参数
  pagination(options: IterateObject) {
    if (!options) return {}
    const { pageSize, pageIndex, orderBy } = options

    return {
      where: utils._.omit(options, Object.keys(this.prismaConfig.pagination)),
      pageSize: pageSize || this.prismaConfig.pagination.pageSize,
      pageIndex: pageIndex || this.prismaConfig.pagination.pageIndex,
      orderBy: utils.isJson(orderBy)
        ? JSON.parse(orderBy)
        : this.prismaConfig.pagination.orderBy
    }
  }
}
