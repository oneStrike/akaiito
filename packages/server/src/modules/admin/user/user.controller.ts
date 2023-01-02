import { Post, Body, Inject, Get, Query, Controller } from '@midwayjs/core'
import { Validate } from '@midwayjs/validate'
import { BaseController } from '../../../shared/controller/base.controller'
import { UserService } from './user.service'
import {
  SwitchUserStatusDto,
  UpdateUserInfoDto,
  CreateUserDto,
  LoginDto,
  getUserListDto,
  UpdatePasswordDto
} from './dto/operate-user.dto'
import { Serialize } from '../../../decorator/serialize.decorator'
import { UserDto } from './dto/user.dto'
import { ListDto } from '../../../shared/dto/list.dto'
import { AdminUserEntity } from './entities/user.entity'
import { ApiResponse, ApiTags } from '@midwayjs/swagger'
import { IdDto } from '../../../shared/dto/id.dto'

@ApiTags(['管理端/用户', '用户'])
@Controller('/admin/user', { tagName: '用户' })
export class UserController extends BaseController {
  @Inject()
  userService: UserService

  static pure = ['password', 'deletedAt']

  @Post('/createUser', { summary: '创建用户' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateUserDto
  })
  @Validate()
  async createAccount(@Body() user: CreateUserDto) {
    return this.userService.createUser(user)
  }

  @Post('/login', { summary: '登录' })
  @Validate()
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
  @Validate()
  async deleteUser(@Body() body: IdDto) {
    return this.userService.destroy(body.id)
  }

  @Get('/userList', { summary: '获取用户列表' })
  @Validate()
  @Serialize('list')
  async getUserList(@Query() param: getUserListDto) {
    return await this.userService.findMultiple(param)
  }

  @Get('/deleteUserList', { summary: '获取已删除用户列表' })
  @Serialize('list')
  async deleteUserList(@Query() param: ListDto) {
    return this.userService.findMultiple(param, true)
  }

  @Post('/switchUserStatus', { summary: '启用或禁用用户' })
  @Validate()
  async switchUserStatus(@Body() params: SwitchUserStatusDto) {
    return this.userService.update(params)
  }

  @Post('/updatePassword', { summary: '修改密码' })
  @Validate()
  async updatePassword(@Body() params: UpdatePasswordDto) {
    return this.userService.updatePassword(params)
  }

  @Post('/updateUserInfo', { summary: '修改用户信息' })
  @Validate()
  async updateUserInfo(@Body() params: UpdateUserInfoDto) {
    return this.userService.updateUserInfo(params)
  }

  @Post('/refreshToken', { summary: '刷新用户token' })
  async refreshToken() {
    const { id } = this.ctx.getAttr('userInfo') as AdminUserEntity
    return this.userService.refreshToken(id)
  }
}
