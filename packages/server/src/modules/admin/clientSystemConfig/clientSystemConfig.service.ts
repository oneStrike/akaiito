import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { ClientSystemConfig, PrismaClient } from '@prisma/client'

@Provide()
export class ClientSystemConfigService extends BasicService<ClientSystemConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientSystemConfig
  }
}
