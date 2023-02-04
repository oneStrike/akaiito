import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../shared/service/base.service'
import { PrivacyMapping } from './mapping/privacy.mapping'

@Provide()
export class PrivacyService extends BaseService {
  @Inject()
  mapping: PrivacyMapping
}
