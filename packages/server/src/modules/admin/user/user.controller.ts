import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import {
  CreateUserDto,
  RefreshAccessTokenDto,
  UpdateUserPwd,
  UserDto,
  UserLoginDto,
  UserPageDto
} from './dto/user.dto'
import { UserService } from './user.service'
import { UserInfo } from '@/decorator/userinfo.decorator'
import { Context } from '@midwayjs/koa'
import { BasicIdStatusDto, BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/user', {
  tagName: '管理员',
  description: '管理平台的用户管理'
})
export class UserController {
  @Inject()
  userService: UserService

  @Inject()
  ctx: Context

  @Post('/login', { summary: '登录' })
  async login(@Body() body: UserLoginDto) {
    return this.userService.login(body)
  }

  @Post('/createAdminUser', { summary: '创建管理员' })
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body)
  }

  @Get('/getUserInfo', { summary: '获取管理员信息' })
  async getUserInfo(@Query() query: { id?: number }) {
    const id = query.id || this.ctx.getAttr('userId')
    return this.userService.findUnique({ where: { id } })
  }

  @Get('/getUserPage', { summary: '获取管理员列表' })
  async getUserPage(@Query() query: UserPageDto) {
    return this.userService.findPage({
      ...query,
      fuzzy: ['username', 'mobile'],
      excludes: ['password']
    })
  }

  @Post('/updateAdminUserInfo', { summary: '更新用户信息' })
  @UserInfo()
  async updateUser(@Body() body: UserDto) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserInfo(body, user, 'info')
  }

  @Post('/deleteAdminUser', { summary: '删除管理员' })
  @UserInfo()
  async deleteAdminUser(@Body() body: BasicIdDto) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.deleteAdminUser(body, user)
  }

  @Post('/updateAdminUserPassword', { summary: '修改密码' })
  @UserInfo()
  async updateAdminUserPassword(@Body() body: UpdateUserPwd) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserPwd(body, user)
  }

  @Post('/updateAdminUserStatus', { summary: '启用或者禁用管理员' })
  @UserInfo()
  async updateUserStatus(@Body() body: BasicIdStatusDto) {
    const user = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.updateUserInfo(body, user)
  }

  @Post('/refreshAccessToken', { summary: '刷新accessToken' })
  @UserInfo()
  async refreshAccessToken(
    @Body() body: RefreshAccessTokenDto
  ): Promise<string> {
    const userInfo = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.refreshAccessToken(body.accessToken, userInfo)
  }
}
