import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  validateNumber,
  validateString
} from '../../../../utils/validate'
import { BasePageDto } from '../../../../basic/dto/basic.dto'

export class LogDto extends BasePageDto {
  @Rule(givenValue(['POST', 'GET'], false))
  method?: 'POST' | 'GET'

  @Rule(validateNumber)
  statusCode?: number

  @Rule(validateString)
  path?: number
}
