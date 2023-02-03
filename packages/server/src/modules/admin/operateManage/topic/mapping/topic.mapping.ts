import { BaseMapping } from '../../../../../shared/mapping/base.mapping'
import { Provide } from '@midwayjs/core'
import { InjectRepository } from '@midwayjs/sequelize'
import { Repository } from 'sequelize-typescript'
import { TopicEntity } from '../entities/topic.entity'

@Provide()
export class TopicMapping extends BaseMapping<TopicEntity> {
  @InjectRepository(TopicEntity)
  repository: Repository<TopicEntity>
}
