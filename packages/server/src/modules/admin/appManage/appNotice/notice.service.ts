import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { AppNotice, PrismaClient } from '@prisma/client'

@Provide()
export class NoticeService extends BasicService<AppNotice> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.appNotice
  }
}
