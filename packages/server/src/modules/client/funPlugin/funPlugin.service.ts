import { BasicService } from '@/basic/service/basic.service'
import { Inject, Provide } from '@midwayjs/core'
import { FunPlugin, PrismaClient } from '@prisma/client'

@Provide()
export class FunPluginService extends BasicService<FunPlugin> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.funPlugin
  }

  async getPage(query) {
    query.status = 1
    const pageData = await this.findPage({
      ...query,
      fuzzy: ['name'],
    })
    pageData.list = pageData.list.map((item) => {
      const res = {
        ...item,
        purchaseCount: item.assistPurchaseCount + item.purchaseCount,
      }
      delete res.assistPurchaseCount
      return res
    })
    return pageData
  }

  async getDetail(id: number) {
    const detailData = await this.findUnique({ id })
    detailData.purchaseCount = detailData.assistPurchaseCount + detailData.purchaseCount
    delete detailData.assistPurchaseCount
    return detailData
  }
}
