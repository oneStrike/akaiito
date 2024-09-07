import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

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
