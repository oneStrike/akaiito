import { BasicIdDto, BasicPageDto } from '@/basic/dto/basic.dto'
import {
  requiredNumber,
  requiredString,
  validateNumberLess,
  validatePwd,
  validateString,
} from '@/utils/validate'
import { OmitDto, PickDto, Rule } from '@midwayjs/validate'

export class UserDto {
  @Rule(requiredNumber)
  id!: number

  @Rule(validateString)
  username?: string

  @Rule(validateString)
  avatar?: string

  @Rule(validateString)
  mobile?: string

  @Rule(validateNumberLess(2))
  status?: number

  @Rule(validateNumberLess(2))
  isRoot?: number
}

export class CreateUserDto extends OmitDto(UserDto, ['id']) {
  @Rule(validatePwd)
  password!: string

  @Rule(validatePwd)
  confirmPassword!: string
}

export class UpdateUserPwd extends BasicIdDto {
  @Rule(validatePwd)
  oldPassword!: string

  @Rule(validatePwd)
  newPassword!: string

  @Rule(validatePwd)
  confirmNewPassword!: string
}

export class UserLoginDto extends PickDto(UserDto, ['mobile']) {
  @Rule(validatePwd)
  password!: string

  @Rule(requiredString)
  captcha!: string

  @Rule(requiredString)
  captchaId!: string
}

export class UserPageDto extends BasicPageDto {
  @Rule(validateString)
  username?: string

  @Rule(validateNumberLess(2))
  status: number

  @Rule(validateNumberLess(2))
  isRoot: number

  @Rule(validateString)
  mobile?: string
}

export class RefreshAccessTokenDto {
  @Rule(requiredString)
  accessToken: string
}
