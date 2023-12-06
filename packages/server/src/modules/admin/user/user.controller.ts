import { Body, Controller, Post } from '@midwayjs/core'
import { CreateUserDto, UserDto, UserLoginDto } from './dto/user.dto'

@Controller('/admin', { tagName: '管理员', description: '管理平台的用户管理' })
export class UserController {
  @Post('/user/login', { summary: '登录' })
  async login(@Body() body: UserLoginDto) {
    console.log('🚀 ~ file:user.controller method:login line:8 -----', body)
  }

  @Post('/user/createAdminUser', { summary: '创建管理员' })
  async createUser(@Body() body: CreateUserDto) {
    console.log(
      '🚀 ~ file:user.controller method:createUser line:8 -----',
      body
    )
  }

  @Post('/user/updateAdminUser', { summary: '更新管理员信息' })
  async updateUser(@Body() body: UserDto) {
    console.log(
      '🚀 ~ file:user.controller method:updateUser line:8 -----',
      body
    )
  }
}
