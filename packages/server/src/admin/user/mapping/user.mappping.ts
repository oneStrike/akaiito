import { Provide } from '@midwayjs/core'
import { InjectRepository } from '@midwayjs/sequelize'
import { Repository } from 'sequelize-typescript'
import { AdminUserEntity } from '../entities/user.entity'
import { BaseMapping } from '../../../shared/mapping/base.mapping'

@Provide()
export class UserMapping extends BaseMapping<AdminUserEntity> {
  @InjectRepository(AdminUserEntity)
  repository: Repository<AdminUserEntity>
}
