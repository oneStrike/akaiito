import { OmitDto, Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateNumber,
  validateNumberLess
} from '@/utils/validate'
import type { Decimal } from '@prisma/client/runtime/library'

export class FunPluginDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  avatar: string

  @Rule(validateNumberLess(2))
  type: number

  @Rule(validateNumberLess(2))
  status: number

  @Rule(validateNumberLess(2))
  isFree: number

  @Rule(validateNumber)
  price?: Decimal

  @Rule(validateNumber)
  assistPurchaseCount: number

  @Rule(requiredString)
  sourceName: string

  @Rule(requiredString)
  sourceUrl: string

  @Rule(requiredString)
  desc: string
}

/*创建功能插件*/
export class CreateFunPluginDto extends OmitDto(FunPluginDto, ['id']) {}
