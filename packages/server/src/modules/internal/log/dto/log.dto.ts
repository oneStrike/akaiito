import { BasicPageDto } from '@/basic/dto/basic.dto'
import {
  givenValue,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

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
