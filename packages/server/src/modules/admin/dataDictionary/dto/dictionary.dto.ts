import { OmitDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString,
  validateString
} from '../../../../utils/validate'
import { BasePageDto } from '../../../../base/dto/base.dto'

export class DictionaryDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  code: string

  @Rule(givenValue([0, 1], true))
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

export class FindDictionDto extends BasePageDto {
  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(givenValue([0, 1], false))
  status?: number
}

export class FindDictionItemsDto extends BasePageDto {
  @Rule(requiredNumber)
  id: number

  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(givenValue([0, 1], false))
  status?: number
}
