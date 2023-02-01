import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../../shared/service/base.service'
import { SystemMapping } from './mapping/system.mapping'

@Provide()
export class SystemService extends BaseService {
  @Inject()
  mapping: SystemMapping
}
