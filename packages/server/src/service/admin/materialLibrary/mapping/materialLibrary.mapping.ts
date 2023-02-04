import { Provide } from '@midwayjs/core'
import { BaseMapping } from '../../../../shared/mapping/base.mapping'
import { Repository } from 'sequelize-typescript'
import {
  MaterialEntity,
  MaterialGroupEntity
} from '../entities/materialLibrary.entity'
import { InjectRepository } from '@midwayjs/sequelize'

@Provide()
export class MaterialLibraryMapping extends BaseMapping<MaterialGroupEntity> {
  @InjectRepository(MaterialGroupEntity)
  repository: Repository<MaterialGroupEntity>
}

@Provide()
export class MaterialMapping extends BaseMapping<MaterialEntity> {
  @InjectRepository(MaterialEntity)
  repository: Repository<MaterialEntity>
}
