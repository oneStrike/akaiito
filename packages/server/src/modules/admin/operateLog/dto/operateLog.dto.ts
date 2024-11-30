import { BasicPageDto } from '@/basic/dto/basic.dto'
import { givenValue, validateNumber, validateString } from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class OperateLogDto extends BasicPageDto {
  @Rule(givenValue(['POST', 'GET'], false))
  requestMethod?: 'POST' | 'GET'

  @Rule(validateNumber)
  responseCode?: number

  @Rule(validateString)
  apiPath?: string

  @Rule(validateString)
  userMobile?: string
}
