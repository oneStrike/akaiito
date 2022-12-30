import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../shared/controller/base.controller'
import { CreateDiyDto, DiyDto, SwitchDiyDto } from './dto/diy.dto'
import { DiyService } from './diy.service'
import { Validate } from '@midwayjs/validate'
@Controller('/admin/diy')
export class DiyController extends BaseController {
  @Inject()
  diyService: DiyService

  @Post('/createDiy', { summary: '创建diy页面' })
  @Validate()
  async createDiy(@Body() body: CreateDiyDto) {
    await this.diyService.isExists({ diyName: body.diyName })
    return await this.diyService.create(body)
  }

  @Post('/modifyDiy', { summary: '修改diy页面' })
  @Validate()
  async modifyDiy(@Body() body: DiyDto) {
    return await this.diyService.update(body)
  }

  @Post('/switchDiy', { summary: '切换diy使用状态' })
  @Validate()
  async useDiy(@Body() body: SwitchDiyDto) {
    return await this.diyService.switchDiy(body)
  }

  @Post('/deleteDiy', { summary: '删除diy数据' })
  @Validate()
  async deleteDiy(@Body() body: SwitchDiyDto) {
    return await this.diyService.destroy(body.id)
  }

  @Get('/getDiy', { summary: '获取diy数据' })
  async getDiyData() {
    return await this.diyService.findAll()
  }
}
