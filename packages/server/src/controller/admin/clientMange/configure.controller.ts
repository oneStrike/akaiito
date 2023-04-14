import { BaseController } from '../../../shared/controller/base.controller'
import { Body, Controller, Inject, Post } from '@midwayjs/core'
import { ClientConfigureDto } from '../../../service/clientManage/configure/dto/configure.dto'
import { ConfigureService } from '../../../service/clientManage/configure/configure.service'

@Controller('admin/clientManage')
export class ConfigureController extends BaseController {
  @Inject()
  configureService: ConfigureService

  @Post('/updateConfigure', { summary: '更新客户端配置' })
  async updateConfigure(@Body() body: ClientConfigureDto) {
    return this.configureService.uploadConfigure(body)
  }
}
