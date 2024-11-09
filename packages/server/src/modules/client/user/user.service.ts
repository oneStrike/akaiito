import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { ClientUser, PrismaClient } from '@prisma/client'
import { CreateUserDto, LoginUserDto } from '@/modules/client/user/dto/user.dto'
import { utils } from '@/utils'
import { JwtService } from '@/basic/service/jwt.service'

@Provide()
export class ClientUserService extends BasicService<ClientUser> {
  @Inject()
  prismaClient: PrismaClient

  @Inject()
  jwt: JwtService

  protected get model() {
    return this.prismaClient.clientUser
  }

  async createUser(info: CreateUserDto) {
    if (info.password !== info.confirmPassword) {
      this.throwError('密码不一致')
    }
    console.log(info)
    const isExists = await this.isExists({
      where: { username: info.username },
    })
    console.log(isExists)

    if (isExists) {
      this.throwError('用户信息已被注册')
    }

    delete info.confirmPassword
    // 加密密码
    info.password = await utils.encryption(info.password)
    return this.create({ data: info })
  }

  async login(user: LoginUserDto) {
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
        purpose: 'client',
      }),
      refreshToken: await this.jwt.sign({ id: userInfo.id, refresh: true, purpose: 'client' }, '2d'),
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
