import {
  ALL,
  App,
  Config,
  httpError,
  Inject,
  MidwayWebRouterService
} from '@midwayjs/core'
import { Application, Context } from '@midwayjs/koa'
import Util from '../../utils'
import type { ListQueryOptions } from '../../types/dto/list'
import { Op, WhereOptions } from 'sequelize'
import { ConfigService } from '../../service/config.service'
import { BaseMapping } from '../mapping/base.mapping'
import { Model } from 'sequelize-typescript'
import type { FindMultipleServiceOptions } from '../../types/service/base'

export abstract class BaseService {
  //列表查询初始参数
  pageIndex = 0 //默认页偏移量
  pageSize = 15 //默认页大小
  maxPageSize = 500 //默认最大页大小
  sort: ListQueryOptions['sort'] = '' //默认排序方式

  @App()
  protected app: Application

  @Inject()
  webRouterService: MidwayWebRouterService

  protected abstract mapping: BaseMapping

  @Inject()
  configService: ConfigService

  @Config(ALL)
  midwayConfig

  @Inject()
  protected ctx: Context

  @Inject()
  protected utils: Util

  normalError(tips: string) {
    throw new httpError.BadRequestError(tips)
  }

  //创建
  async create<T>(params: T): Promise<number> {
    return (await this.mapping.create(params)).id
  }

  //批量创建
  async bulkCreate<T>(params: T[]): Promise<Model[]> {
    return await this.mapping.bulkCreate(params)
  }

  async findOne(where: WhereOptions) {
    return await this.mapping.findOne(where)
  }

  async findByPk(id: number) {
    return await this.mapping.findByPk(id)
  }

  //查找多个
  async findMultiple(options: FindMultipleServiceOptions) {
    let { params, attributes, likeKeys } = options
    if (likeKeys) {
      params = this.generateLikeSql(likeKeys, params)
    }
    const { where, listOptions } = this.getWhere(params)
    return await this.mapping.findMultiple({
      where: { where, attributes },
      listOptions
    })
  }

  /**
   * 查找所有
   */
  async findAll() {
    return await this.mapping.findAll()
  }

  //更新
  async update<T>(
    params: T,
    id: number | number[]
  ): Promise<number | number[]> {
    await this.mapping.updateOne(params, { id })
    return id
  }

  //批量更新
  async updateMultiple<T extends { ids: number[] }>(
    params: Partial<T>
  ): Promise<number | number[]> {
    const ids = this.utils.lodash.cloneDeep(params.ids)
    delete params.ids
    return await this.update(this.utils.lodash.omit(params, 'ids'), ids)
  }

  //删除
  async destroy(id: number): Promise<number> {
    await this.mapping.destroy({ id })
    return id
  }

  /**
   *  获取最大排序值
   */
  async getMaxSort(field = 'sort') {
    const maxSortArr = await this.mapping.findAll({
      limit: 1,
      order: [[field, 'desc']],
      paranoid: false,
      raw: true
    })
    let maxSort = 0
    if (maxSortArr.length) {
      maxSort = maxSortArr[0][field]
    }

    return maxSort
  }

  /**
   * 判断是否已经存在
   */
  async isExists(where: WhereOptions | number, isPk = false, isError = true) {
    let result
    if (isPk && typeof where === 'number') {
      result = await this.mapping.findByPk(where)
    } else if (!isPk && typeof where !== 'number') {
      result = await this.mapping.findOne(where, true)
    }

    let errMsg = ''
    if (isError && result !== null) {
      if (typeof where === 'number') {
        errMsg = 'id：' + where
      } else if (typeof where !== 'number') {
        for (const whereKey in where) {
          errMsg = where[whereKey]
        }
      }
    }
    return errMsg ? this.normalError(`【${errMsg}】已经存在`) : result
  }

  /**
   * 生成where查询接口
   * @param where
   */
  getWhere(where: Record<string, any>) {
    const listOptionsKeys = ['pageSize', 'pageIndex', 'sort', 'sortField']
    //过滤空值
    const trueWhere = this.utils.lodash.pickBy(
      where,
      (val) => !this.utils.lodash.isNil(val)
    )
    //生成列表查询参数
    const listOptions = this.formatListQueryParams(where)
    //过滤掉列表查询参数
    const prueWhere = this.utils.lodash.omit(trueWhere, [
      ...listOptionsKeys,
      'attributes'
    ])

    //生成时间查询参数
    return {
      where: this.handleDate(prueWhere),
      listOptions
    }
  }

  /**
   * 处理时间查询
   */
  handleDate(params: any) {
    const { startDate, endDate } = params
    if (!startDate && !endDate) return params
    const start = startDate || '2022-12-03 23:57:32'
    const end = endDate || this.utils.dayjs().format('YY-MM-DD HH:mm:ss')
    params.createdAt = {
      [Op.between]: [start, end]
    }
    delete params.startDate
    delete params.endDate
    return params
  }

  /**
   *格式化查询列表数据的附属参数
   * @param param
   */
  formatListQueryParams(param) {
    const pageSize = param?.pageSize ?? this.pageSize
    return {
      sort: param?.sort || this.sort,
      pageIndex: Number(param?.pageIndex) || this.pageIndex,
      pageSize: Number(pageSize > 100 ? this.maxPageSize : pageSize),
      sortField: param?.sort ? param?.sortField ?? '' : ''
    }
  }

  /**
   * 多条查询语句时生成or查询语句
   * @param where 查询体检
   * @private
   */
  generateORSql(where: WhereOptions): WhereOptions {
    if (!this.utils.lodash.isObject(where)) return
    const whereLen = Object.keys(where).length
    if (whereLen === 1) return where
    const whereStatement = []
    for (const whereKey in where) {
      const item = where[whereKey]
      whereStatement.push({
        [whereKey]: item
      })
    }
    return { [Op.or]: whereStatement }
  }

  /**
   * 生成like查询参数
   * @param likeKeys
   * @param params
   */
  generateLikeSql(likeKeys: string[], params: Record<string, any>) {
    const likeObj = this.utils.lodash.pick(params, likeKeys)
    const likeRes = {}
    this.utils.lodash.forOwn(likeObj, (value: string, key) => {
      likeRes[key] = {
        [Op.regexp]: `[${value.replaceAll(',', '|')}]`
      }
    })
    return {
      ...this.utils.lodash.omit(params, likeKeys),
      ...likeRes
    }
  }
}
