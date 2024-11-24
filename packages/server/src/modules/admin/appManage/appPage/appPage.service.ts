import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { AppPageConfig, PrismaClient } from '@prisma/client'

@Provide()
export class AppPageService extends BasicService<AppPageConfig> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.appPageConfig
  }
}
