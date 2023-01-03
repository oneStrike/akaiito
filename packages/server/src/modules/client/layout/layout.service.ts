import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../shared/service/base.service'
import { DiyMapping } from '../../admin/diyClientPage/mapping/diy.mapping'
@Provide()
export class LayoutService extends BaseService {
  @Inject()
  mapping: DiyMapping

  async getLayout() {
    const layout = await this.findOne({ use: 1 })
    return layout
  }
}
