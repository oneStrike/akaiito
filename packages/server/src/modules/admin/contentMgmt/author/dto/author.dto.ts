import {
  requiredNumber,
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'
import { BasicPageDto } from '@/basic/dto/basic.dto'

export class AuthorDto {
  @Rule(requiredNumber)
  id!: number

  @Rule(requiredString)
  name!: string

  @Rule(requiredString)
  avatar!: string

  @Rule(requiredString)
  description!: string

  @Rule(validateNumberLess(2))
  status!: number

  @Rule(validateNumberLess(4))
  contentModel!: number

  @Rule(validateString)
  website?: string
}

export class CreateAuthorDto extends OmitDto(AuthorDto, ['id']) {}

export class GetAuthorPageDto extends BasicPageDto {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateNumberLess(4))
  contentModel?: number
}
