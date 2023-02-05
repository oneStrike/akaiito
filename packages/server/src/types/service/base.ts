import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types/model'
import { IListQueryParam } from '../dto/list'

export interface findMultipleQuery extends IListQueryParam {
  where: WhereOptions
  attributes?: FindAttributeOptions
  withDeleted?: boolean
}
