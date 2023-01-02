import { Inject, Post, Controller, Body, Get, Query } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { MaterialService } from './material.service'
import {
  CreateMaterialDto,
  CreateMaterialLibraryDto,
  FindMaterialDto,
  MaterialLibraryDto
} from './dto/material.dto'
import { Validate } from '@midwayjs/validate'
import { IdDto } from '../../../shared/dto/id.dto'
@Controller('/admin/materialLibrary')
export class MaterialController extends BaseController {
  @Inject()
  materialService: MaterialService

  @Get('/getMaterialGroup', { summary: '获取素材库分组' })
  async getMaterialLibrary() {
    return this.materialService.findMultiple({ pageSize: 99 })
  }

  @Post('/createMaterialGroup', { summary: '创建素材库分组' })
  @Validate()
  async createMaterialLibrary(@Body() body: CreateMaterialLibraryDto) {
    return this.materialService.createMaterialLibrary(body.groupName)
  }

  @Post('/deleteMaterialGroup', { summary: '删除素材库分组' })
  @Validate()
  async delete(@Body() body: IdDto) {
    return this.materialService.destroyMaterialGroup(body.id)
  }

  @Post('/updateMaterialGroup', { summary: '修改素材库分组' })
  @Validate()
  async modify(@Body() body: MaterialLibraryDto) {
    return this.materialService.update(body)
  }

  @Get('/getMaterial', { summary: '获取素材' })
  @Validate()
  async getMaterial(@Query() query: FindMaterialDto) {
    return this.materialService.materialFindMultiple(query)
  }

  @Post('/createMaterial', { summary: '添加素材' })
  @Validate()
  async createMaterial(@Body() body: CreateMaterialDto) {
    return this.materialService.materialBulkCreate(body)
  }

  @Post('/deleteMaterial', { summary: '删除素材' })
  @Validate()
  async deleteMaterial(@Body() body: IdDto) {
    return this.materialService.materialDestroy(body.id)
  }
}
