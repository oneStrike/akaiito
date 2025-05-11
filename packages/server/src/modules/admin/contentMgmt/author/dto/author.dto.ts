import { BasicPageDTO } from '@/basic/dto/basic.dto'
import {
  requiredNumber,
  requiredString,
  validateBoolean,
  validateNumberLess,
  validateString,
  validateStringArray,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'
import { AuthorRoleEnum, GenderEnum } from '@prisma/client'

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
  roles!: AuthorRoleEnum[]

  @Rule(validateNumberLess(3))
  gender?: GenderEnum

  @Rule(validateString)
  socialLinks?: string

  @Rule(validateString)
  nationality?: string

  @Rule(validateString)
  remark?: string
}

export class CreateAuthorDTO extends OmitDto(AuthorDTO, ['id']) {
}

export class GetAuthorPageDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateBoolean)
  status?: boolean

  @Rule(validateString)
  roles?: string
}
