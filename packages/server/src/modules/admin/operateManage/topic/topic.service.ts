import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../../shared/service/base.service'

@Provide()
export class TopicService extends BaseService {
  @Inject()
  mapping
}
