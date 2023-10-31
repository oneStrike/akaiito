import { Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  validateNumber,
  validateString
} from '../../utils/validate'

export class BasePageDto {
  @Rule(validateNumber)
  pageSize?: number

  @Rule(validateNumber)
  pageIndex?: number

  @Rule(validateString)
  orderBy?: string
}

export class BaseIdDto {
  @Rule(requiredNumber)
  id: number
}
