import { Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredDate,
  requiredNumber,
  scopeLengthString,
  validateEmail,
  validatePhone,
  validatePwd,
  validateString
} from '../../../../utils/validate/base.validate'

export class UserDto {
  @Rule(requiredNumber)
  id: number

  @Rule(scopeLengthString(2))
  username: string

  @Rule(scopeLengthString(5))
  account: string

  @Rule(validateString)
  avatar?: string

  @Rule(validatePwd)
  password: string

  @Rule(validatePwd)
  confirmPassword!: string

  @Rule(givenValue([1, 0]))
  isRoot: number

  @Rule(givenValue([1, 0]))
  status: number

  @Rule(validatePhone)
  mobile: string

  @Rule(validateEmail)
  email: string

  @Rule(requiredDate)
  createdAt: string
}
