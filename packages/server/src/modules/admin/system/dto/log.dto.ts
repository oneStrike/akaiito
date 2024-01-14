import { BasePageDto } from '../../../../base/dto/base.dto'
import { Rule } from '@midwayjs/validate'
import { givenValue, validateNumber } from '../../../../utils/validate'

export class LogDto extends BasePageDto {
  @Rule(givenValue(['POST', 'GET'], false))
  method?: 'POST' | 'GET'

  @Rule(validateNumber)
  statusCode?: number
}
