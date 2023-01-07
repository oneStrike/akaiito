import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../shared/service/base.service'
import { BaseMapping } from '../shared/mapping/base.mapping'
import { PageService } from '../modules/admin/clientManage/page/page.service'
@Provide()
export class TransitService extends BaseService {
  @Inject()
  mapping: BaseMapping

  @Inject()
  pageService: PageService

  /**
   * 获取客户端页面列表
   */
  async clientPages() {
    return await this.pageService.findAll()
  }
}
