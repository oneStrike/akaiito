import { Rule } from '@midwayjs/validate'
import {
  givenValue,
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

export class BaseStatusDto extends BaseIdDto {
  @Rule(givenValue([0, 1], true))
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
