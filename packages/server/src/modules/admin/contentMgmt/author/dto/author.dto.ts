import { Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validateString
} from '@/utils/validate'

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

  @Rule(validateString)
  website?: string
}
