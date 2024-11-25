import { BasicPageDto } from '@/basic/dto/basic.dto'
import { requiredNumber, requiredString, validateNumber, validateNumberLess, validateString } from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class AuthorDto {
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

export class CreateAuthorDto extends OmitDto(AuthorDto, ['id']) {}

export class GetAuthorPageDto extends BasicPageDto {
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
