import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../shared/service/base.service'
import { PrivacyMapping } from './mapping/privacy.mapping'
import { RegExpMatch } from '../../types/service/base'

@Provide()
export class PrivacyService extends BaseService {
  @Inject()
  mapping: PrivacyMapping

  async getPrivacyList(params) {
    const attributes = { exclude: ['content'] }
    const likeKeys: RegExpMatch = {
      name: 'sporadic',
      platform: 'include'
    }
    return this.findMultiple({
      params,
      attributes,
      likeKeys
    })
  }
}
