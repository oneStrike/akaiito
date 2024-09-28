import type { ClientSystemConfig, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class ClientSystemConfigService extends BasicService<ClientSystemConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientSystemConfig
  }
}
