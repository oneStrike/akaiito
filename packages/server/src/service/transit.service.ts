import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../shared/service/base.service'
import { BaseMapping } from '../shared/mapping/base.mapping'
import { PageService } from '../modules/admin/clientManage/page/page.service'
import { SystemService } from '../modules/admin/clientManage/system/system.service'
@Provide()
export class TransitService extends BaseService {
  @Inject()
  mapping: BaseMapping

  @Inject()
  pageService: PageService

  @Inject()
  systemService: SystemService

  /**
   * 获取客户端页面列表
   */
  async clientPages() {
    return await this.pageService.findAll()
  }
  /**
   * 获取客户端系统配置信息
   */
  async clientSystemConfigInfo() {
    return await this.systemService.findByPk(1)
  }
}
