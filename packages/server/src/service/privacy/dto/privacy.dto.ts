import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredString,
  validateString
} from '../../../utils/validate/base.validate'
import { ListDto } from '../../../shared/dto/base.dto'

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

export class GetPrivacyDto extends ListDto {
  @Rule(validateString)
  name?: string

  @Rule(validateString)
  platform?: string

  @Rule(givenValue([0, 1], false))
  status?: number
}

export class AddPrivacyDto extends PrivacyDto {}
