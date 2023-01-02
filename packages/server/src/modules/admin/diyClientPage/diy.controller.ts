import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { CreateDiyDto, DiyDto, SwitchDiyPageStatusDto } from './dto/diy.dto'
import { DiyService } from './diy.service'
import { Validate } from '@midwayjs/validate'
import { IdDto } from '../../../shared/dto/id.dto'
@Controller('/admin/diyClientPage')
export class DiyController extends BaseController {
  @Inject()
  diyService: DiyService

  @Post('/createDiyPage', { summary: '创建diy页面' })
  @Validate()
  async createDiyPage(@Body() body: CreateDiyDto) {
    await this.diyService.isExists({ diyName: body.diyName })
    return await this.diyService.create(body)
  }

  @Post('/updateDiyPage', { summary: '修改diy页面' })
  @Validate()
  async updateDiyPage(@Body() body: DiyDto) {
    return await this.diyService.update(body)
  }

  @Post('/switchPageStatus', { summary: '切换diy使用状态' })
  @Validate()
  async switchPageStatus(@Body() body: SwitchDiyPageStatusDto) {
    return await this.diyService.switchPageStatus(body)
  }

  @Post('/deleteDiyPage', { summary: '删除diy数据' })
  @Validate()
  async deleteDiyPage(@Body() body: IdDto) {
    return await this.diyService.destroy(body.id)
  }

  @Get('/getDiyPage', { summary: '获取diy数据' })
  async getDiyData() {
    return await this.diyService.findAll()
  }
}
