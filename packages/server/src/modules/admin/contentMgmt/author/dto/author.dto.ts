import { BasicPageDTO } from '@/basic/dto/basic.dto'
import {
  requiredBoolean,
  requiredNumber,
  requiredString,
  validateBoolean,
  validateNumber,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class AuthorDTO {
  @Rule(requiredNumber)
  id!: number

  @Rule(requiredString)
  name!: string

  @Rule(validateString)
  avatar?: string

  @Rule(requiredString)
  description!: string

  @Rule(validateBoolean)
  status!: boolean

  @Rule(requiredBoolean)
  isModel!: boolean

  @Rule(requiredBoolean)
  isWriter!: boolean

  @Rule(requiredBoolean)
  isCartoonist!: boolean

  @Rule(requiredBoolean)
  isIllustrator!: boolean

  @Rule(validateString)
  website?: string
}

export class CreateAuthorDTO extends OmitDto(AuthorDTO, ['id']) {}

export class GetAuthorPageDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateBoolean)
  isModel?: boolean

  @Rule(validateBoolean)
  isWriter?: boolean

  @Rule(validateBoolean)
  isCartoonist?: boolean

  @Rule(validateBoolean)
  isIllustrator?: boolean
}
