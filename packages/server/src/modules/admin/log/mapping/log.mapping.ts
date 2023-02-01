import { Provide } from '@midwayjs/core'
import { InjectRepository } from '@midwayjs/sequelize'
import { Repository } from 'sequelize-typescript'
import { LogEntity } from '../entities/log.entity'
import { BaseMapping } from '../../../../shared/mapping/base.mapping'

@Provide()
export class LogMapping extends BaseMapping<LogEntity> {
  @InjectRepository(LogEntity)
  repository: Repository<LogEntity>
}
