import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import type { FunPlugin, PrismaClient } from '@prisma/client'

@Provide()
export class FunPluginService extends BasicService<FunPlugin> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.funPlugin
  }
}
