import { PickDto, Rule } from '@midwayjs/validate'
import {
  validateDate,
  validateNumber,
  validateString
} from '../../../../utils/validate/base.validate'
import { ListDto } from '../../../../shared/dto/base.dto'

export class LoginLogDto extends PickDto(ListDto, [
  'pageIndex',
  'pageSize',
  'sort',
  'sortField'
]) {
  @Rule(validateString)
  path?: string

  @Rule(validateString)
  username?: string

  @Rule(validateNumber)
  receipt?: number

  @Rule(validateDate)
  startDate?: Date

  @Rule(validateDate)
  endDate?: Date
}
