import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { ClientPageConfig, PrismaClient } from '@prisma/client'

@Provide()
export class ClientPageService extends BasicService<ClientPageConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientPageConfig
  }
}
