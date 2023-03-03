import { Post, Body, Inject, Get, Query, Controller } from '@midwayjs/core'
import { BaseController } from '../../shared/controller/base.controller'
import { UserService } from '../../service/admin/user/user.service'
import {
  UpdateUserInfoDto,
  CreateUserDto,
  LoginDto,
  getUserListDto,
  UpdatePasswordDto
} from '../../service/admin/user/dto/operate-user.dto'
import { Serialize } from '../../decorator/serialize.decorator'
import { UserDto } from '../../service/admin/user/dto/user.dto'
import { AdminUserEntity } from '../../service/admin/user/entities/user.entity'
import { IdDto, ToggleStatusDto } from '../../shared/dto/base.dto'

@Controller('/admin/user', { tagName: '用户' })
export class UserController extends BaseController {
  @Inject()
  userService: UserService

  static pure = ['password']

  @Post('/createUser', { summary: '创建用户' })
  async createAccount(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }

  @Post('/login', { summary: '登录' })
  @Serialize('user')
  async login(@Body() body: LoginDto) {
    body.captchaId = this.ctx.session?.captchaId
    return await this.userService.login(body)
  }

  @Get('/userInfo', { summary: '获取用户信息' })
  @Serialize()
  async getUserInfo() {
    const userInfo = this.ctx.getAttr('userInfo') as UserDto
    return this.userService.getUserInfo(userInfo.id)
  }

  @Post('/deleteUser', { summary: '删除用户' })
  async deleteUser(@Body() body: IdDto) {
    return this.userService.destroy(body.id)
  }

  @Get('/userList', { summary: '获取用户列表' })
  @Serialize('list')
  async getUserList(@Query() params: getUserListDto) {
    return await this.userService.findMultiple({ params })
  }

  @Post('/switchUserStatus', { summary: '启用或禁用用户' })
  async switchUserStatus(@Body() params: ToggleStatusDto) {
    return this.userService.update(params, params.ids)
  }

  @Post('/updatePassword', { summary: '修改密码' })
  async updatePassword(@Body() params: UpdatePasswordDto) {
    return this.userService.updatePassword(params)
  }

  @Post('/updateUserInfo', { summary: '修改用户信息' })
  async updateUserInfo(@Body() params: UpdateUserInfoDto) {
    return this.userService.updateUserInfo(params)
  }

  @Post('/refreshToken', { summary: '刷新用户token' })
  async refreshToken() {
    const { id } = this.ctx.getAttr('userInfo') as AdminUserEntity
    return this.userService.refreshToken(id)
  }
}
