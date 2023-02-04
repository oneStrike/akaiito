import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredString,
  validateDate,
  validatePwd,
  validateString
} from '../../../../utils/validate/base.validate'

import { UserDto } from './user.dto'
import { ListDto } from '../../../../shared/dto/base.dto'

/**
 * 创建新用户
 */
export class CreateUserDto extends OmitDto(UserDto, [
  'id',
  'status',
  'createdAt'
]) {}

/**
 * 登录
 */

export class LoginDto extends PickDto(UserDto, ['account', 'password']) {
  @Rule(validateString)
  captchaId?: string

  @Rule(requiredString)
  captcha: string
}

/**
 * 修改密码
 */
export class UpdatePasswordDto extends PickDto(UserDto, [
  'password',
  'confirmPassword'
]) {
  @Rule(validatePwd)
  originalPassword: string
}

/**
 * 修改用户信息
 */

export class UpdateUserInfoDto extends OmitDto(UserDto, [
  'password',
  'confirmPassword'
]) {}

/**
 * 获取用户列表
 */

export class getUserListDto extends ListDto {
  @Rule(givenValue([1, 0], false))
  isRoot?: number

  @Rule(givenValue([1, 0], false))
  status?: number

  @Rule(validateDate)
  startDate?: Date

  @Rule(validateDate)
  endDate?: Date
}
