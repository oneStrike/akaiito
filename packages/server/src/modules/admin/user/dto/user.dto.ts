import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString,
  validatePwd,
  validateString
} from '../../../../utils/validate'

export class UserDto {
  @Rule(requiredNumber)
  id!: number

  @Rule(validateString)
  username?: string

  @Rule(validateString)
  avatar?: string

  @Rule(validateString)
  mobile?: string

  @Rule(givenValue([0, 1], false))
  status?: number

  @Rule(givenValue([0, 1], false))
  isRoot?: number
}

export class CreateUserDto extends OmitDto(UserDto, ['id']) {
  @Rule(validatePwd)
  password!: string

  @Rule(validatePwd)
  confirmPassword!: string
}

export class UpdateUserPwd extends PickDto(UserDto, ['id']) {
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

export class UserStatus extends PickDto(UserDto, ['id']) {
  @Rule(givenValue([0, 1]))
  status: number
}

export class UserPermissions extends PickDto(UserDto, ['id']) {
  @Rule(givenValue([0, 1]))
  isRoot: number
}

export class RefreshAccessToken {
  @Rule(requiredString)
  accessToken: string
}
