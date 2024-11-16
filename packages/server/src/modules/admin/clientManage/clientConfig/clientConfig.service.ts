import type { ClientConfig, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'

@Provide()
export class ClientConfigService extends BasicService<ClientConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientConfig
  }


}
