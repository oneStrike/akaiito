import { PickDto, Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validatePwd,
  validateString,
} from '@/utils/validate'

export class UserDTO {
  @Rule(requiredNumber)
  id!: number

  @Rule(requiredString)
  username!: string

  @Rule(validateString)
  avatar?: string

  @Rule(validateString)
  mobile?: string

  @Rule(validateNumberLess(2))
  status?: number

  @Rule(validateNumberLess(2))
  sex?: number
}

export class CreateUserDTO extends PickDto(UserDTO, ['username']) {
  @Rule(validatePwd)
  password!: string

  @Rule(validatePwd)
  confirmPassword!: string
}

export class LoginUserDTO extends PickDto(UserDTO, ['username']) {
  @Rule(validatePwd)
  password!: string
}
