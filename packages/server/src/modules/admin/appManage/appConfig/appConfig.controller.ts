import { AppConfigDTO } from './dto/appConfig.dto'
import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { AppConfigService } from '@/service/appOperations/config/appConfig.service'

@Controller('/admin/appManage')
export class AppConfigController {
  @Inject()
  appSystemConfig: AppConfigService

  @Get('/getAppConfig', { summary: '获取客户端系统配置信息' })
  async getClientSystemConfig() {
    return this.appSystemConfig.findUnique({ where: { id: 1 } })
  }

  @Post('/updateClientConfig', { summary: '更新客户端系统配置信息' })
  async updateClientSystemConfig(@Body() body: AppConfigDTO) {
    return this.appSystemConfig.upsert({
      where: { id: 1 },
      create: body,
      update: body,
    })
  }
}
