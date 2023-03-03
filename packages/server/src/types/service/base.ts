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
  likeKeys?: string[]
}
