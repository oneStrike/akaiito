import { App, Inject, Provide } from '@midwayjs/core'
import { PrismaClient, AdminUser } from '@prisma/client'
import { BaseService } from '../../../base/service/base.service'
import { utils } from '../../../utils'
import {
  CreateUserDto,
  UpdateUserPwd,
  UserDto,
  UserLoginDto
} from './dto/user.dto'
import { Jwt } from '../../../base/service/jwt.service'
import { CaptchaService } from '../../../base/service/captcha.service'
import { Application } from '@midwayjs/koa'
import { formatDate } from '../../../prisma/utils/formatDate'

@Provide()
export class UserService extends BaseService<AdminUser> {
  @Inject()
  prismaClient: PrismaClient

  @App()
  app: Application

  @Inject()
  jwt: Jwt

  @Inject()
  captchaServer: CaptchaService

  protected get model() {
    return this.prismaClient.adminUser
  }

  //创建用户
  async createUser(info: CreateUserDto) {
    if (info.password !== info.confirmPassword) {
      this.throwError('密码不一致')
    }
    const isExists = await this.exists({
      OR: [{ mobile: info.mobile }, { username: info.username }]
    })
    this.model.findFirst({ where: {} })
    if (isExists) {
      this.throwError('用户信息已被注册')
    }
    delete info.confirmPassword
    //加密密码
    info.password = await utils.encryption(info.password)
    return this.create(info)
  }

  //登录
  async login(info: UserLoginDto) {
    if (
      (await this.captchaServer.verifyCaptcha(info.captchaId, info.captcha)) &&
      this.app.getEnv() === 'prod'
    ) {
      this.throwError('验证码错误')
    }
    const userInfo = await this.model.findUnique({
      where: { mobile: info.mobile }
    })
    if (
      !userInfo ||
      !(await this.diffPassword(info.password, userInfo.password))
    ) {
      this.throwError('手机号或密码错误')
    }

    if (!userInfo.status) {
      this.throwError('账户已被禁用，请联系系统管理员')
    }
    delete userInfo.password
    userInfo.createdAt = formatDate(userInfo.createdAt) as unknown as Date
    userInfo.updatedAt = formatDate(userInfo.updatedAt) as unknown as Date
    const token = {
      accessToken: await this.jwt.sign({ id: userInfo.id }),
      refreshToken: await this.jwt.sign(
        { id: userInfo.id, refresh: true },
        { expiresIn: 1000 * 60 * 60 * 24 * 2 }
      )
    }
    console.log(
      '🚀 ~ file:user.service method:login line:84 -----',
      token,
      userInfo
    )
    return {
      token,
      userInfo
    }
  }

  //更新用户信息
  async updateUserInfo(userInfo: UserDto, user: UserDto, type?: string) {
    if (userInfo.id !== user.id && user.isRoot !== 1) {
      this.throwError('权限不足')
    }
    if (userInfo.id === user.id && type !== 'info') {
      this.throwError('权限不足')
    }
    const result = await this.updateById(userInfo.id, userInfo)
    return result?.id || result
  }

  //修改用户密码
  async updateUserPwd(userInfo: UpdateUserPwd, user: UserDto) {
    if (userInfo.id !== user.id && user.isRoot !== 1) {
      this.throwError('权限不足')
    }
    if (userInfo.newPassword !== userInfo.confirmNewPassword) {
      this.throwError('密码输入不一致')
    }
    const oldUserInfo = await this.model.findUnique({
      where: { id: userInfo.id }
    })
    if (!oldUserInfo) {
      this.throwError('用户不存在')
    }
    if (
      !(await this.diffPassword(userInfo.oldPassword, oldUserInfo.password))
    ) {
      this.throwError('原密码错误')
    }

    const result = await this.updateById(userInfo.id, {
      password: await utils.encryption(userInfo.newPassword)
    })

    return result?.id || result
  }

  async refreshAccessToken(token: string, userInfo: UserDto) {
    const accessToken = await this.jwt.verify(token)
    if (typeof accessToken === 'string' || accessToken.id !== userInfo.id) {
      this.throwError('权限不足')
    }
    return await this.jwt.sign({ id: userInfo.id })
  }

  //比对密码
  private async diffPassword(newPwd: string, oldPwd: string) {
    const salt = oldPwd.split('.')[0]
    const currentPassword = await utils.encryption(newPwd, salt)
    return currentPassword === oldPwd
  }
}
