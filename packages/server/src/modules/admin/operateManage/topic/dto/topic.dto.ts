import { OmitDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString,
  validateNumber,
  validateString
} from '../../../../../utils/validate/base.validate'

export class TopicDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  topicName: string

  @Rule(requiredString)
  desc: string

  @Rule(givenValue([1, 2]))
  creationMethod: number

  @Rule(requiredString)
  call: string

  @Rule(requiredString)
  topicAvatar: string

  @Rule(validateNumber)
  activePeopleMock?: number

  @Rule(validateString)
  advocateRules?: string

  @Rule(validateString)
  forbidRules?: string

  @Rule(givenValue([1, 0], false))
  status?: number
}

export class addTopicDto extends OmitDto(TopicDto, ['id']) {}
export class updateTopicDto extends TopicDto {}
