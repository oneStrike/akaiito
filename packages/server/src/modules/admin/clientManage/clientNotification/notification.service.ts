import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { ClientNotification, PrismaClient } from '@prisma/client'

@Provide()
export class NotificationService extends BasicService<ClientNotification> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientNotification
  }
}
