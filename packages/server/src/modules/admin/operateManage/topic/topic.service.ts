import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../../../../shared/service/base.service'
import { TopicMapping } from './mapping/topic.mapping'

@Provide()
export class TopicService extends BaseService {
  @Inject()
  mapping: TopicMapping

  //订阅话题
  async concernTopic(id: number) {
    const topic = await this.mapping.findByPk(id)
    if (!topic) return this.normalError('未查询到相关条目')
    topic.memberCount++
    return this.mapping.updateOne(topic, { id })
  }
}
