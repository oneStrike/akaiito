import {
  requiredNumber,
  requiredNumberLess,
  validateDate,
  validateNumber,
  validateNumberArray,
  validateString,
} from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class BasicPageDto {
  /* 单页数量 */
  @Rule(validateNumber)
  pageSize?: number

  /* 页码 */
  @Rule(validateNumber)
  pageIndex?: number

  /* 排序 */
  @Rule(validateString)
  orderBy?: string

  /* 开始时间 */
  @Rule(validateDate)
  startTime?: string

  /* 结束时间 */
  @Rule(validateDate)
  endTime?: string
}

export class BasicIdDto {
  /* 主键id */
  @Rule(requiredNumber)
  id: number
}

export class BasicIdsDto {
  /* 主键ids */
  @Rule(validateNumberArray)
  ids: number[]
}

export class BasicIdsStatusDto extends BasicIdsDto {
  /* 状态 */
  @Rule(requiredNumberLess(2))
  status: number
}

export class BasicIdStatusDto extends BasicIdDto {
  /* 状态 */
  @Rule(requiredNumberLess(2))
  status: number
}

export class BasicOrderDto {
  @Rule(requiredNumber)
  targetId: number

  @Rule(requiredNumber)
  targetOrder: number

  @Rule(requiredNumber)
  originId: number

  @Rule(requiredNumber)
  originOrder: number
}
