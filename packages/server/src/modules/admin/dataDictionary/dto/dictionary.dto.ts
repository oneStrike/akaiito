import { BasicPageDTO } from '@/basic/dto/basic.dto'
import { requiredNumber, requiredString, validateBoolean, validateString } from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class DictionaryDTO {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  name: string

  @Rule(requiredString)
  code: string

  @Rule(validateBoolean)
  status: boolean

  @Rule(validateString)
  remark?: string
}

export class CreateDictionaryDTO extends OmitDto(DictionaryDTO, ['id', 'status']) {
}

export class UpdateDictionaryDTO extends OmitDto(DictionaryDTO, ['status']) {
}

export class CreateDictionaryItemsDTO extends OmitDto(DictionaryDTO, ['id', 'status']) {
  @Rule(requiredString)
  dictionaryCode!: string
}

export class FindDictionDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(validateBoolean)
  status?: boolean
}

export class FindDictionItemsDTO {
  @Rule(requiredString)
  dictionaryCode!: string

  @Rule(validateString)
  name?: string

  @Rule(validateString)
  code?: string

  @Rule(validateBoolean)
  status?: boolean
}
