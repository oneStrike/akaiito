import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { PrismaClient, ClientSystemConfig } from '@prisma/client'

@Provide()
export class ClientSystemConfigService extends BasicService<ClientSystemConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientSystemConfig
  }
}
