import {
  requiredNumber,
  validateBoolean,
  validateDate,
  validateNumber,
  validateNumberArray,
  validateString,
} from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class BasicPageDTO {
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

export class BasicIdDTO {
  /* 主键id */
  @Rule(requiredNumber)
  id: number
}

export class BasicIdsDTO {
  /* 主键ids */
  @Rule(validateNumberArray)
  ids: number[]
}

export class BasicIdsStatusDTO extends BasicIdsDTO {
  /* 状态 */
  @Rule(validateBoolean)
  status: boolean
}

export class BasicIdStatusDTO extends BasicIdDTO {
  /* 状态 */
  @Rule(validateBoolean)
  status: boolean
}

export class BasicOrderDTO {
  @Rule(requiredNumber)
  targetId: number

  @Rule(requiredNumber)
  targetOrder: number

  @Rule(requiredNumber)
  originId: number

  @Rule(requiredNumber)
  originOrder: number
}
