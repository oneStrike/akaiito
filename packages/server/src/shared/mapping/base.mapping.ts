import { Inject, Provide } from '@midwayjs/core'
import { Model, Repository } from 'sequelize-typescript'
import { IListQueryParam, IListResponseRes } from '../../types/dto/list'
import Utils from '../../utils'
import { MakeNullishOptional } from 'sequelize/types/utils'
import { Attributes, FindOptions, WhereOptions } from 'sequelize'
import { BasicEntity } from '../entities/basic.entity'

@Provide()
export abstract class BaseMapping<T extends BasicEntity = Model> {
  @Inject()
  utils: Utils

  //实体
  protected abstract repository: Repository<T>

  /**
   * 查到单条数据
   * @param where 查询条件
   * @param withDeleted 是否查询软删除的数据
   */
  async findOne(where: WhereOptions, withDeleted = false): Promise<T> {
    return this.repository.findOne({
      where,
      paranoid: !withDeleted,
      raw: true
    })
  }

  /**
   * 根据主键查询一条数据
   * @param id
   */
  async findByPk(id: number) {
    return this.repository.findByPk(id, { raw: true })
  }

  /**
   * 查到多条数据
   * @param where 查询条件
   * @param options 附属查询条件
   * @param withDeleted 是否查询软删除的数据
   */
  async findMultiple(
    where: WhereOptions,
    options: IListQueryParam = {},
    withDeleted = false
  ): Promise<IListResponseRes<T>> {
    let order
    if (options.sortField) {
      const { sort, sortField } = options
      order = [sortField, sort]
    }

    delete options.sort
    delete options.sortField
    const listData = await this.repository.findAndCountAll({
      where,
      paranoid: !withDeleted,
      order: order ? [order] : [],
      offset: options.pageIndex * options.pageSize,
      limit: options.pageSize,
      raw: true
    })

    const { rows, count } = listData
    return {
      list: rows,
      total: count,
      count: rows.length,
      ...options
    }
  }

  /**
   * 查找所有
   * @param options
   */
  async findAll(options?: FindOptions<Attributes<T>>) {
    return await this.repository.findAll(options)
  }

  /**
   * 插入一条数据
   * @param val 插入的数据
   */
  async create(val: MakeNullishOptional<T>): Promise<T> {
    return await this.repository.create(val)
  }

  /**
   * 批量插入数据
   */
  async bulkCreate(params: MakeNullishOptional<T>[]): Promise<T[]> {
    return await this.repository.bulkCreate(params)
  }

  /**
   * 更新数据
   * @param updateData
   * @param where 更新条件
   */
  async updateOne(updateData: Partial<T>, where: WhereOptions<Attributes<T>>) {
    return await this.repository.update(updateData, {
      where
    })
  }

  /**
   * 删除一条数据
   * @param where
   */
  async destroy(where: WhereOptions<Attributes<T>>) {
    return this.repository.destroy({ where })
  }

  /**
   * 恢复软删除一条数据
   * @param id 主键
   */
  async softRestore(id: number) {
    return (await this.findOne({ id }, true)).restore()
  }

  /**
   * 清空数据表
   * 根据表的paranoid决定是否是软删除
   */
  async clearTable() {
    return await this.repository.destroy({ truncate: true })
  }
}
