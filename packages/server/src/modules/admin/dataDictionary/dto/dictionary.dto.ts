import { OmitDto, Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validateString
} from '@/utils/validate'
import { BasicPageDto } from '@/basic/dto/basic.dto'

export class DictionaryDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  code: string

  @Rule(validateNumberLess(2))
  status: number

  @Rule(requiredString)
  desc: string
}

export class CreateDictionaryDto extends OmitDto(DictionaryDto, [
  'id',
  'status'
]) {}
export class UpdateDictionaryDto extends OmitDto(DictionaryDto, ['status']) {}

export class CreateDictionaryItemsDto extends OmitDto(DictionaryDto, [
  'id',
  'status'
]) {
  @Rule(requiredNumber)
  dictionaryId: number
}

export class FindDictionDto extends BasicPageDto {
  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(validateNumberLess(2))
  status?: number
}

export class FindDictionItemsDto extends BasicPageDto {
  @Rule(requiredNumber)
  dictionaryId: number

  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(validateNumberLess(2))
  status?: number
}
