import { ListDto } from '../../../shared/dto/list.dto'
import { PickDto, Rule } from '@midwayjs/validate'
import {
  validateDate,
  validateNumber,
  validateString
} from '../../../utils/validate/base.validate'

export class LoginDto extends PickDto(ListDto, [
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
