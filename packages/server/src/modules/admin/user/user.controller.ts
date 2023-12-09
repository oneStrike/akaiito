import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import {
  CreateUserDto,
  UpdateUserPwd,
  UserDto,
  UserLoginDto,
  UserPermissions,
  UserStatus
} from './dto/user.dto'
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

  @Post('/user/updateAdminUserInfo', { summary: '更新用户信息' })
  @UserInfo()
  async updateUser(@Body() body: UserDto) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserInfo(body, user, 'info')
  }

  @Post('/user/updateAdminUserPassword', { summary: '修改密码' })
  @UserInfo()
  async updateAdminUserPassword(@Body() body: UpdateUserPwd) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserPwd(body, user)
  }

  @Post('/user/updateAdminUserStatus', { summary: '启用或者禁用管理员' })
  @UserInfo()
  async updateUserStatus(@Body() body: UserStatus) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserInfo(body, user)
  }

  @Post('/user/updateAdminUserPermissions', { summary: '更新用户权限' })
  @UserInfo()
  async updateAdminUserPermissions(@Body() body: UserPermissions) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserInfo(body, user)
  }
}
