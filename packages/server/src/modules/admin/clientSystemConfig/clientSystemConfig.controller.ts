import type { ClientSystemConfigService } from './clientSystemConfig.service'
import type { ClientSystemConfigDto } from './dto/clientSystemConfig.dto'
import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'

@Controller('/admin/clientManage')
export class ClientSystemConfigController {
  @Inject()
  clientSystemConfig: ClientSystemConfigService

  @Get('/getClientSystemConfig', { summary: '获取客户端系统配置信息' })
  async getClientSystemConfig() {
    return this.clientSystemConfig.findUnique({ id: 1 })
  }

  @Post('/updateClientSystemConfig', { summary: '更新客户端系统配置信息' })
  async updateClientSystemConfig(@Body() body: ClientSystemConfigDto) {
    return this.clientSystemConfig.upsert({ id: 1 }, body)
  }
}
