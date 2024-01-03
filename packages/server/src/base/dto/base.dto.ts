import { Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredNumberLess,
  validateNumber,
  validateNumberArray,
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

export class BaseIdsDto {
  @Rule(validateNumberArray)
  ids: number[]
}

export class BaseIdsStatusDto extends BaseIdsDto {
  @Rule(requiredNumberLess(2))
  status: number
}

export class BaseIdStatusDto extends BaseIdDto {
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
