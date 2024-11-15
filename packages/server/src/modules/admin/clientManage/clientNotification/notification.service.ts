import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { ClientNotification, PrismaClient } from '@prisma/client'
import { BasicIdStatusDto } from '@/basic/dto/basic.dto'

@Provide()
export class NotificationService extends BasicService<ClientNotification> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.clientNotification
  }

  async updateStatus(data: BasicIdStatusDto) {
    await this.updateBatch({
      where: { NOT: { id: data.id } },
      data: { status: 0 },
    })
    return await this.update({ where: { id: data.id }, data })
  }
}
