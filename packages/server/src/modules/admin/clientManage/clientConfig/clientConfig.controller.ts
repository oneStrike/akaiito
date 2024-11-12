import { ClientConfigService } from './clientConfig.service'
import { ClientConfigDto } from './dto/clientConfig.dto'
import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'

@Controller('/admin/clientManage')
export class ClientConfigController {
  @Inject()
  clientSystemConfig: ClientConfigService

  @Get('/getClientConfig', { summary: '获取客户端系统配置信息' })
  async getClientSystemConfig() {
    return this.clientSystemConfig.findUnique({ where: { id: 1 } })
  }

  @Post('/updateClientConfig', { summary: '更新客户端系统配置信息' })
  async updateClientSystemConfig(@Body() body: ClientConfigDto) {
    return this.clientSystemConfig.upsert({
      where: { id: 1 },
      create: body,
      update: body,
    })
  }
}
