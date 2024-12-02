import { BasicPageDTO } from '@/basic/dto/basic.dto'
import { requiredNumber, requiredString, validateNumber, validateNumberLess, validateString } from '@/utils/validate'
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

  @Rule(validateNumberLess(2))
  status!: number

  @Rule(validateNumberLess(2))
  isModel!: number

  @Rule(validateNumberLess(2))
  isWriter!: number

  @Rule(validateNumberLess(2))
  isCartoonist!: number

  @Rule(validateNumberLess(2))
  isIllustrator!: number

  @Rule(validateString)
  website?: string
}

export class CreateAuthorDTO extends OmitDto(AuthorDTO, ['id']) {}

export class GetAuthorPageDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateNumberLess(2))
  isModel?: number

  @Rule(validateNumberLess(2))
  isWriter?: number

  @Rule(validateNumberLess(2))
  isCartoonist?: number

  @Rule(validateNumberLess(2))
  isIllustrator?: number
}
