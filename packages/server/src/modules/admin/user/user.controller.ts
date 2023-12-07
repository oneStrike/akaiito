import { Body, Controller, Inject, Post } from '@midwayjs/core'
import { CreateUserDto, UserDto, UserLoginDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('/admin', { tagName: '管理员', description: '管理平台的用户管理' })
export class UserController {
  @Inject()
  userService: UserService

  @Post('/user/login', { summary: '登录' })
  async login(@Body() body: UserLoginDto) {
    console.log('🚀 ~ file:user.controller method:login line:8 -----', body)
  }

  @Post('/user/createAdminUser', { summary: '创建管理员' })
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body)
  }

  @Post('/user/updateAdminUser', { summary: '更新管理员信息' })
  async updateUser(@Body() body: UserDto) {
    console.log(
      '🚀 ~ file:user.controller method:updateUser line:8 -----',
      body
    )
  }
}
