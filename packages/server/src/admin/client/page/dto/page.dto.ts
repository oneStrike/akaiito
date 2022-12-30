import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString,
  validateNumber
} from '../../../../utils/validate/base.validate'

export class PageDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  pageName!: string

  @Rule(requiredString)
  pagePath: string

  @Rule(requiredString)
  pageTitle: string

  @Rule(givenValue(['normal', 'vip', 'vipLevel']))
  role: string

  @Rule(validateNumber)
  vipLevel?: number

  @Rule(givenValue([1, 2, 3]))
  status: number
}

export class ModifyPageDto extends PageDto {}
