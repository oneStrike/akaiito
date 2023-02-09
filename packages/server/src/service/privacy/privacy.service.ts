import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../shared/service/base.service'
import { PrivacyMapping } from './mapping/privacy.mapping'
import { GetPrivacyDto } from './dto/privacy.dto'

@Provide()
export class PrivacyService extends BaseService {
  @Inject()
  mapping: PrivacyMapping

  async getPrivacyPage(params: GetPrivacyDto) {
    const attributes = { exclude: ['content'] }
    const likeKeys = ['name', 'platform']
    params = this.generateLikeSql(likeKeys, params)
    console.log(
      '🚀 ~ file:privacy.service method:getPrivacyPage line:15 -----',
      params
    )
    return this.findMultiple({ ...params, attributes })
  }
}
