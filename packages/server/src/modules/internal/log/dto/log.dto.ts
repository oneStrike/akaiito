import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  validateNumberLess,
  validateString
} from '../../../../utils/validate'
import { BasicPageDto } from '../../../../basic/dto/basic.dto'

export class LogDto extends BasicPageDto {
  @Rule(givenValue(['POST', 'GET'], false))
  method?: 'POST' | 'GET'

  @Rule(validateNumberLess(2))
  status?: number

  @Rule(validateString)
  path?: number

  @Rule(validateString)
  mobile?: string
}
