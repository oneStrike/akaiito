import {
  requiredNumber,
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import type { Decimal } from '@prisma/client/runtime/library'

export class FunPluginDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  avatar: string

  @Rule(requiredString)
  pluginFile: string

  @Rule(requiredString)
  version: string

  @Rule(validateNumberLess(5))
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

/* 获取功能插件列表 */

export class GetFunPluginDto extends PickDto(FunPluginDto, ['type', 'status', 'isFree']) {
  @Rule(validateString)
  name: string
}

/* 创建功能插件 */
export class CreateFunPluginDto extends OmitDto(FunPluginDto, ['id']) {}
