import { BasicPageDto } from '@/basic/dto/basic.dto'
import { givenValue, validateNumber, validateString } from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class LogDto extends BasicPageDto {
  @Rule(givenValue(['POST', 'GET'], false))
  method?: 'POST' | 'GET'

  @Rule(validateNumber)
  statusCode?: number

  @Rule(validateString)
  path?: number

  @Rule(validateString)
  mobile?: string
}
