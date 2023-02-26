import { Inject, Provide } from '@midwayjs/core'
import { Op, WhereOptions } from 'sequelize'
import { BaseService } from '../../../shared/service/base.service'
import { AuthService } from '../../auth.service'
import { UserMapping } from './mapping/user.mappping'
import { AdminUserEntity } from './entities/user.entity'
import { UpdatePasswordDto, UpdateUserInfoDto } from './dto/operate-user.dto'
import { CreateUserDto, LoginDto } from './dto/operate-user.dto'
import { CaptchaServiceOpen } from '../../../modules/captcha/captcha.service'

@Provide()
export class UserService extends BaseService {
  @Inject()
  authService: AuthService

  @Inject()
  captchaService: CaptchaServiceOpen

  @Inject()
  mapping: UserMapping

  //获取用户数据，不会查询被软删除的数据
  async getUserInfo(field: WhereOptions | number): Promise<AdminUserEntity> {
    const user = this.utils.lodash.isFinite(field)
      ? await this.mapping.findByPk(field as number)
      : await this.mapping.findOne(field as WhereOptions)
    if (user) return user
    this.normalError('用户不存在')
  }

  /**
   * 创建新用户
   * @param params
   */
  async createUser(params: CreateUserDto) {
    const { username, account, email, mobile, password, confirmPassword } =
      params
    if (password !== confirmPassword) {
      this.normalError('密码不一致')
    }
    //检查用户属性是否以被使用
    const where = this.generateORSql({ username, account, email, mobile })
    const accountResult: AdminUserEntity | null = await this.mapping.findOne(
      where,
      true
    )
    if (accountResult) {
      this.normalError('用户信息重复')
    }
    //密码加密
    delete params.confirmPassword
    params.password = await this.utils.encryption(password)
    return await this.create(params)
  }

  /**
   * 登陆
   * @param params
   */
  async login(params: LoginDto) {
    const captchaRes = await this.captchaService.captchaCheck(
      params.captchaId,
      params.captcha
    )

    if (!captchaRes && params.captcha !== '999') {
      this.normalError('验证码错误')
    }

    const { account, password } = params
    const user = await this.getUserInfo({ account })
    const matchPwd = await this.diffPassword(password, user.password)
    if (!matchPwd) {
      this.normalError('用户名或密码错误')
    }
    if (!user.status) {
      this.normalError('当前账号以被禁用，请联系管理员')
    }
    delete user.password
    return {
      token: await this.authService.generateToken(user),
      refreshToken: await this.authService.generateToken(user, true),
      user
    }
  }

  //刷新token
  async refreshToken(id: number) {
    const user = await this.getUserInfo(id)
    return this.authService.generateToken(user)
  }

  /**
   * 修改密码
   */
  async updatePassword(params: UpdatePasswordDto) {
    const { password, confirmPassword, originalPassword } = params
    if (password !== confirmPassword) {
      this.normalError('密码不一致')
    }
    const { id } = this.ctx.getAttr('userInfo') as AdminUserEntity
    const user = await this.getUserInfo(id)
    const matchPwd = await this.diffPassword(originalPassword, user.password)
    if (!matchPwd) {
      this.normalError('密码错误')
    }
    const salt = user.password.split('.')[0]
    user.password = await this.utils.encryption(password, salt)
    await this.mapping.updateOne(user, { id: user.id })
    return user.id
  }

  /**
   * 修改用户信息
   */
  async updateUserInfo(params: UpdateUserInfoDto) {
    const { username, account, email, mobile, id } = params
    const updateUser = await this.getUserInfo(id)

    const where = this.generateORSql({
      username,
      account,
      email,
      mobile
    })

    where[Op.not] = { id }
    const user = await this.mapping.findOne(where, true)

    if (user) {
      this.normalError('信息已经存在')
    }

    await this.mapping.updateOne(params, { id: updateUser.id })
    return params.id
  }

  /**
   * 密码比对
   * @param newPwd
   * @param oldPwd
   * @private
   */
  private async diffPassword(newPwd, oldPwd) {
    const salt = oldPwd.split('.')[0]
    const currentPassword = await this.utils.encryption(newPwd, salt)
    return currentPassword === oldPwd
  }
}
