import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../shared/service/base.service'
import { PageMapping } from './mapping/page.mapping'
@Provide()
export class PageService extends BaseService {
  @Inject()
  mapping: PageMapping

  async createClientPage() {
    return this.mapping.createPage()
  }
}
