import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { AppNotification, PrismaClient } from '@prisma/client'

@Provide()
export class NotificationService extends BasicService<AppNotification> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.appNotification
  }
}
