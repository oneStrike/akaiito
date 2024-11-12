import { Controller, Get, Inject } from '@midwayjs/core'
import { ClientConfigService } from '@/modules/admin/clientManage/clientConfig/clientConfig.service'

@Controller('/client/clientManage')
export class ClientManageController {
  @Inject()
  clientConfig: ClientConfigService

  @Get('/getClientSystemConfig', { summary: '获取客户端系统配置' })
  async getClientSystemConfig() {
    return this.clientConfig.findUnique({ where: { id: 1 } })
  }
}
