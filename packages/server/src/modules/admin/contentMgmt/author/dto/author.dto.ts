import { BasicPageDTO } from '@/basic/dto/basic.dto'
import {
  requiredNumber,
  requiredString,
  validateBoolean,
  validateString,
  validateStringArray,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'
import { AuthorRole } from '@prisma/client'

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

  @Rule(validateStringArray)
  roles!: AuthorRole[]

  @Rule(validateString)
  website?: string
}

export class CreateAuthorDTO extends OmitDto(AuthorDTO, ['id']) {}

export class GetAuthorPageDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateBoolean)
  status?: boolean

  @Rule(validateBoolean)
  isModel?: boolean

  @Rule(validateBoolean)
  isWriter?: boolean

  @Rule(validateBoolean)
  isCartoonist?: boolean

  @Rule(validateBoolean)
  isIllustrator?: boolean
}
