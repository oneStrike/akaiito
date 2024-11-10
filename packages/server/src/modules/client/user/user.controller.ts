import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { ClientUserService } from '@/modules/client/user/user.service'
import { CreateUserDto, LoginUserDto } from '@/modules/client/user/dto/user.dto'
import { UserInfo } from '@/decorator/userinfo.decorator'
import { UserDto } from '@/modules/admin/user/dto/user.dto'
import { Context } from '@midwayjs/koa'

@Controller('/client/user', {
  tagName: '客户端用户',
  description: '客户端用户相关接口',
})
export class ClientUserController {
  @Inject()
  userService: ClientUserService

  @Inject()
  ctx: Context

  @Post('/createClientUser', { summary: '创建客户端用户' })
  async createClientUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body)
  }

  @Post('/login', { summary: '登录' })
  async loginClientUser(@Body() body: LoginUserDto) {
    return this.userService.login(body)
  }

  @Get('/userInfo', { summary: '获取用户详细信息' })
  @UserInfo()
  async getClientUserInfo() {
    return this.ctx.getAttr('userInfo') as UserDto
  }
}
