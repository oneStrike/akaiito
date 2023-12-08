import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { CreateUserDto, UserDto, UserLoginDto } from './dto/user.dto'
import { UserService } from './user.service'
import { UserInfo } from '../../../decorator/userinfo.decorator'
import { Context } from '@midwayjs/koa'

@Controller('/admin', { tagName: '管理员', description: '管理平台的用户管理' })
export class UserController {
  @Inject()
  userService: UserService

  @Inject()
  ctx: Context

  @Post('/user/login', { summary: '登录' })
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body)
  }

  @Post('/user/createAdminUser', { summary: '创建管理员' })
  async createUser(@Body() body: CreateUserDto) {
    return (await this.userService.createUser(body)).id
  }

  @Get('/user/getUserInfo', { summary: '获取管理员信息' })
  @UserInfo()
  async getUserInfo() {
    return this.ctx.getAttr('userInfo')
  }

  @Post('/user/updateAdminUser', { summary: '更新管理员信息' })
  async updateUser(@Body() body: UserDto) {
    console.log(
      '🚀 ~ file:user.controller method:updateUser line:8 -----',
      body
    )
  }
}
