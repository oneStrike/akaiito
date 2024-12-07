import { BasicIdDTO, BasicPageDTO } from '@/basic/dto/basic.dto'
import {
  requiredNumber,
  requiredString,
  validateBoolean,
  validatePwd,
  validateString,
} from '@/utils/validate'
import { OmitDto, PickDto, Rule } from '@midwayjs/validate'

export class UserDTO {
  @Rule(requiredNumber)
  id!: number

  @Rule(validateString)
  username?: string

  @Rule(validateString)
  avatar?: string

  @Rule(validateString)
  mobile?: string

  @Rule(validateBoolean)
  status?: boolean

  @Rule(validateBoolean)
  isRoot?: boolean
}

export class CreateUserDTO extends OmitDto(UserDTO, ['id']) {
  @Rule(validatePwd)
  password!: string

  @Rule(validatePwd)
  confirmPassword!: string
}

export class UpdateUserPwd extends BasicIdDTO {
  @Rule(validatePwd)
  oldPassword!: string

  @Rule(validatePwd)
  newPassword!: string

  @Rule(validatePwd)
  confirmNewPassword!: string
}

export class UserLoginDTO extends PickDto(UserDTO, ['mobile']) {
  @Rule(validatePwd)
  password!: string

  @Rule(requiredString)
  captcha!: string

  @Rule(requiredString)
  captchaId!: string
}

export class UserPageDTO extends BasicPageDTO {
  @Rule(validateString)
  username?: string

  @Rule(validateBoolean)
  status: boolean

  @Rule(validateBoolean)
  isRoot: boolean

  @Rule(validateString)
  mobile?: string
}

export class RefreshAccessTokenDTO {
  @Rule(requiredString)
  accessToken: string

  @Rule(requiredString)
  refreshToken: string
}
