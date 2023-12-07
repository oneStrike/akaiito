import { Inject, Provide } from '@midwayjs/core'
import { PrismaClient, AdminUser } from '@prisma/client'
import { BaseService } from '../../../base/service/base.service'
import { utils } from '../../../utils'
import { CreateUserDto } from './dto/user.dto'

@Provide()
export class UserService extends BaseService<AdminUser> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.adminUser
  }

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
}
