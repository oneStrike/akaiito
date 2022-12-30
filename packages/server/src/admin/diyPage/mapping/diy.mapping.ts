import { Provide } from '@midwayjs/core'
import { BaseMapping } from '../../../shared/mapping/base.mapping'
import { InjectRepository } from '@midwayjs/sequelize'
import { DiyEntity } from '../entities/diy.entity'
import { Repository } from 'sequelize-typescript'

@Provide()
export class DiyMapping extends BaseMapping<DiyEntity> {
  @InjectRepository(DiyEntity)
  repository: Repository<DiyEntity>
}
