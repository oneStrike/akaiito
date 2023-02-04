import { BaseMapping } from '../../../shared/mapping/base.mapping'
import { InjectRepository } from '@midwayjs/sequelize'
import { PrivacyEntity } from '../entities/privacy.entity'
import { Repository } from 'sequelize-typescript'
import { Provide } from '@midwayjs/core'

@Provide()
export class PrivacyMapping extends BaseMapping<PrivacyEntity> {
  @InjectRepository(PrivacyEntity)
  protected repository: Repository<PrivacyEntity>
}
