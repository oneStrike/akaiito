import { Controller, Get, Inject } from '@midwayjs/core'
import { ClientSystemConfigService } from '@/modules/admin/clientSystemConfig/clientSystemConfig.service'

@Controller('/client/clientManage')
export class ClientManageController {
  @Inject()
  clientSystemConfig: ClientSystemConfigService

  @Get('/getClientSystemConfig', { summary: '获取客户端系统配置' })
  async getClientSystemConfig() {
    return this.clientSystemConfig.findUnique({ where: { id: 1 } })
  }
}
