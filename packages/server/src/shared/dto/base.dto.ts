import { Rule } from '@midwayjs/validate'
import {
  givenRange,
  givenValue,
  requiredNumber,
  requiredNumberArray,
  validateNumber,
  validateString
} from '../../utils/validate/base.validate'

export class IdDto {
  @Rule(requiredNumber)
  id: number
}

export class ToggleStatusDto {
  @Rule(requiredNumberArray)
  ids: number[]

  @Rule(requiredNumber)
  status: number
}

export class ListDto {
  @Rule(validateNumber)
  pageIndex?: number

  @Rule(givenRange([100, 1], false))
  pageSize?: number

  @Rule(givenValue(['desc', 'asc'], false))
  sort?: 'desc' | 'asc'

  @Rule(validateString)
  sortField?: string
}
