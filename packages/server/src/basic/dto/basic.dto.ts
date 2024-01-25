import { Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredNumberLess,
  validateDate,
  validateNumber,
  validateNumberArray,
  validateString
} from '../../utils/validate'

export class BasicPageDto {
  @Rule(validateNumber)
  pageSize?: number

  @Rule(validateNumber)
  pageIndex?: number

  @Rule(validateString)
  orderBy?: string

  @Rule(validateDate)
  startTime?: string

  @Rule(validateDate)
  endTime?: string
}

export class BasicIdDto {
  @Rule(requiredNumber)
  id: number
}

export class BaseIdsDto {
  @Rule(validateNumberArray)
  ids: number[]
}

export class BaseIdsStatusDto extends BaseIdsDto {
  @Rule(requiredNumberLess(2))
  status: number
}

export class BaseIdStatusDto extends BasicIdDto {
  @Rule(requiredNumberLess(2))
  status: number
}

export class BaseOrderDto {
  @Rule(requiredNumber)
  targetId: number

  @Rule(requiredNumber)
  targetOrder: number

  @Rule(requiredNumber)
  originId: number

  @Rule(requiredNumber)
  originOrder: number
}
