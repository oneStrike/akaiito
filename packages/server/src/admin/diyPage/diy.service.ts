import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../shared/service/base.service'
import { DiyMapping } from './mapping/diy.mapping'
import { DiyEntity } from './entities/diy.entity'
import { SwitchDiyDto } from './dto/diy.dto'

@Provide()
export class DiyService extends BaseService {
  @Inject()
  mapping: DiyMapping

  async switchDiy(params: SwitchDiyDto) {
    if (params.use === 1) {
      const isUseData = (await this.findOne({ use: 1 })) as Required<DiyEntity>
      if (isUseData) {
        isUseData.use = 0
        isUseData && (await this.update(isUseData))
      }
    }
    return await this.update(params)
  }
}
