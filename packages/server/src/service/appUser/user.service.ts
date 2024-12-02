import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { AppUser, PrismaClient } from '@prisma/client'
import { CreateUserDTO, LoginUserDTO } from '@/modules/app/user/dto/user.dto'
import { utils } from '@/utils'
import { JwtService } from '@/auth/jwt.service'

@Provide()
export class AppUserService extends BasicService<AppUser> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  jwt: JwtService

  protected get model() {
    return this.prismaClient.appUser
  }

  async createUser(info: CreateUserDTO) {
    if (info.password !== info.confirmPassword) {
      this.throwError('密码不一致')
    }
    const isExists = await this.isExists({
      where: { username: info.username },
    })

    if (isExists) {
      this.throwError('用户信息已被注册')
    }

    delete info.confirmPassword
    // 加密密码
    info.password = await utils.encryption(info.password)
    return this.create({ data: info })
  }

  async login(user: LoginUserDTO) {
    const userInfo = await this.model.findUnique({
      where: { username: user.username },
    })
    if (!userInfo || !(await this.diffPwd(user.password, userInfo.password))) {
      this.throwError('用户名或密码错误')
    }

    if (!userInfo.status) {
      this.throwError('账户已被禁用')
    }

    delete userInfo.password

    const token = {
      accessToken: await this.jwt.sign({
        id: userInfo.id,
        username: userInfo.username,
        purpose: 'app',
      }),
      refreshToken: await this.jwt.sign({ id: userInfo.id, refresh: true, purpose: 'app' }, '2d'),
    }

    return {
      token,
      userInfo,
    }
  }

  // 比对密码
  private async diffPwd(newPwd: string, oldPwd: string) {
    const salt = oldPwd.split('.')[0]
    const currentPassword = await utils.encryption(newPwd, salt)
    return currentPassword === oldPwd
  }
}
