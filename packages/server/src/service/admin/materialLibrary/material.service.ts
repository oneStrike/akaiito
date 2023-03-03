import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../shared/service/base.service'
import {
  MaterialLibraryMapping,
  MaterialMapping
} from './mapping/materialLibrary.mapping'
import { CreateMaterialDto, FindMaterialDto } from './dto/material.dto'
import { Op } from 'sequelize'

@Provide()
export class MaterialService extends BaseService {
  @Inject()
  mapping: MaterialLibraryMapping

  @Inject()
  materialMapping: MaterialMapping

  async createMaterialLibrary(name: string) {
    await this.isExists({ groupName: name })
    const maxSort = await this.getMaxSort()
    return await this.create({ groupName: name, sort: maxSort + 1 })
  }

  //删除素材分组，并删除分组下的所有素材
  async destroyMaterialGroup(id: number) {
    await this.mapping.destroy({ id })
    await this.materialMapping.destroy({ groupId: id })
    return id
  }

  async materialFindMultiple(params: FindMaterialDto) {
    const { where, listOptions } = this.getWhere(params)
    const materialName = where.materialName
    if (materialName) {
      where.materialName = {
        [Op.substring]: materialName
      }
    }

    return this.materialMapping.findMultiple({ where, listOptions })
  }

  async materialBulkCreate(params: CreateMaterialDto) {
    const idExistsGroup = await this.isExists(params.groupId, true, false)
    if (idExistsGroup === null) {
      return this.normalError('分组不存在')
    }
    const materials = params.material.map((item) => {
      return {
        groupId: params.groupId,
        ...item
      }
    })
    return (await this.materialMapping.bulkCreate(materials)).map(
      (item) => item.id
    )
  }

  async materialDestroy(id: number) {
    return this.materialMapping.destroy({ id })
  }
}
