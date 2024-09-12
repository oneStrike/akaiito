import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule, RuleType } from '@midwayjs/validate'

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
  contentType!: number

  @Rule(validateString)
  website?: string
}

export class CreateAuthorDto extends OmitDto(AuthorDto, ['id']) {}

export class GetAuthorPageDto {
  @Rule(validateString)
  name: string

  @Rule(RuleType.number().required())
  status?: number
}
