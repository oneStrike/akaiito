import { Rule } from '@midwayjs/validate'
import {
  givenRange,
  givenValue,
  validateNumber,
  validateString
} from '../../utils/validate/base.validate'
export class ListDto {
  @Rule(validateNumber)
  pageIndex?: number

  @Rule(givenRange([100, 1], false))
  pageSize?: number

  @Rule(givenValue(['desc', 'asc'], false))
  sort?: string

  @Rule(validateString)
  sortField?: string
}
