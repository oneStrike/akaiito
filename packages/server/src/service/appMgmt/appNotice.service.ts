import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import type { AppNotice, PrismaClient } from '@prisma/client'
import { PublishNoticeDTO } from '@/modules/admin/appManage/appNotice/dto/notice'
import { utils } from '@/utils'

@Provide()
export class AppNoticeService extends BasicService<AppNotice> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.appNotice
  }

  async publish(data: PublishNoticeDTO) {
    const { enableWeb, enableApp, enableApplet, endTime } = await this.model.findUnique({
      where: { id: data.id },
    })
    if (!enableApp && !enableWeb && !enableApplet) {
      this.throwError('暂无可发布平台')
    } else if (utils.dayjs() > utils.dayjs(endTime)) {
      this.throwError('通知时间已过期')
    }
    return this.model.update({ where: { id: data.id }, data })
  }
}
