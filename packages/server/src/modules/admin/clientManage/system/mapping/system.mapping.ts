import { Provide } from '@midwayjs/core'
import { InjectRepository } from '@midwayjs/sequelize'
import { Repository } from 'sequelize-typescript'
import { BaseMapping } from '../../../../../shared/mapping/base.mapping'
import { SystemEntity } from '../entities/system.entity'

@Provide()
export class SystemMapping extends BaseMapping<SystemEntity> {
  @InjectRepository(SystemEntity)
  repository: Repository<SystemEntity>
}
