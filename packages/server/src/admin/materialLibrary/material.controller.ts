import { Inject, Post, Controller, Body, Get, Query } from '@midwayjs/core'
import { BaseController } from '../../shared/controller/base.controller'
import { MaterialService } from './material.service'
import {
  AddMaterialDto,
  CreateDto,
  DeleteDto,
  DeleteMaterialDto,
  MaterialGroupDto,
  ModifyDto
} from './dto/material.dto'
import { Validate } from '@midwayjs/validate'
@Controller('/admin/materialLibrary')
export class MaterialController extends BaseController {
  @Inject()
  materialService: MaterialService

  @Get('/getMaterialLibrary', { summary: '获取素材库分组' })
  async getMaterialLibrary() {
    return this.materialService.findMultiple({ pageSize: 99 })
  }

  @Post('/createMaterialLibrary', { summary: '创建素材库分组' })
  @Validate()
  async createMaterialLibrary(@Body() body: CreateDto) {
    return this.materialService.createMaterialLibrary(body.groupName)
  }

  @Post('/deleteMaterialLibrary', { summary: '删除素材库分组' })
  @Validate()
  async delete(@Body() body: DeleteDto) {
    return this.materialService.destroyMaterialGroup(body.id)
  }

  @Post('/modifyMaterialLibrary', { summary: '修改素材库分组' })
  @Validate()
  async modify(@Body() body: ModifyDto) {
    return this.materialService.update(body)
  }

  @Get('/getMaterial', { summary: '获取素材' })
  async getMaterial(@Query() query: MaterialGroupDto) {
    return this.materialService.materialFindMultiple(query)
  }

  @Post('/createMaterial', { summary: '添加素材' })
  @Validate()
  async createMaterial(@Body() body: AddMaterialDto[]) {
    return this.materialService.materialBulkCreate(body)
  }

  @Post('/deleteMaterial', { summary: '删除素材' })
  @Validate()
  async deleteMaterial(@Body() body: DeleteMaterialDto) {
    return this.materialService.materialDestroy(body.id)
  }
}
