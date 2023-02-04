import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredString,
  validateString
} from '../../../utils/validate/base.validate'

export class PrivacyDto {
  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  content: string

  @Rule(requiredString)
  platform: string

  @Rule(givenValue([0, 1]))
  status?: number

  @Rule(validateString)
  remark?: string
}

export class AddPrivacyDto extends PrivacyDto {}

export class SwitchStatusDto {
  @Rule(givenValue([0, 1]))
  status?: number
}
