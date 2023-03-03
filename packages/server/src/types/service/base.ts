import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types/model'
import { ListQueryOptions } from '../dto/list'

export interface FindMultipleMappingOptions {
  where: WhereOptions
  listOptions?: ListQueryOptions
  withDeleted?: boolean
}

export interface FindMultipleServiceOptions {
  params: ListQueryOptions & Record<string | symbol, any>
  attributes?: FindAttributeOptions
  likeKeys?: RegExpMatch
}

/**
 * 生成like语句
 * sporadic 只要出现一个就视为匹配成功
 * include 不同的是必须同时出现，但是不限顺序
 *
 */
export type RegExpMatch = Record<any, 'sporadic' | 'include'>
