import { BasicIdDTO, BasicIdStatusDTO } from '@/basic/dto/basic.dto'
import { Context } from '@midwayjs/koa'
import { CreateUserDTO, RefreshAccessTokenDTO, UpdateUserPwd, UserDTO, UserLoginDTO, UserPageDTO } from './dto/user.dto'
import { UserService } from '@/service/adminUser/user.service'
import { UserInfo } from '@/decorator/userinfo.decorator'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { CtxAttrEnum } from '@/enum/ctxAttr'

@Controller('/admin/user', {
  tagName: '管理员',
  description: '管理平台的用户管理',
})
export class UserController {
  @Inject()
  userService: UserService

  @Inject()
  ctx: Context

  @Post('/login', { summary: '登录' })
  async login(@Body() body: UserLoginDTO) {
    return this.userService.login(body)
  }

  @Post('/createAdminUser', { summary: '创建管理员' })
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body)
  }

  @Get('/getUserInfo', { summary: '获取管理员信息' })
  async getUserInfo(@Query() query: { id?: number }) {
    const adminUserinfo = this.ctx.getAttr(CtxAttrEnum.ADMIN_USER_INFO) as any
    const id = Number(query.id || adminUserinfo.userId)
    return this.userService.findUnique({ where: { id } })
  }

  @Get('/getUserPage', { summary: '获取管理员列表' })
  async getUserPage(@Query() query: UserPageDTO) {
    return this.userService.findPage({
      where: query,
      like: {
        username: 'contains',
        mobile: 'startsWith',
      },
      omit: {
        password: true,
      },
    })
  }

  @Post('/updateAdminUserInfo', { summary: '更新用户信息' })
  @UserInfo()
  async updateUser(@Body() body: UserDTO) {
    const user = this.ctx.getAttr(CtxAttrEnum.ADMIN_USER_INFO) as UserDTO
    console.log(user, body)
    return this.userService.updateUserInfo(body, user, 'info')
  }

  @Post('/deleteAdminUser', { summary: '删除管理员' })
  @UserInfo()
  async deleteAdminUser(@Body() body: BasicIdDTO) {
    const user = this.ctx.getAttr(CtxAttrEnum.ADMIN_USER_INFO) as UserDTO
    return this.userService.deleteAdminUser(body, user)
  }

  @Post('/updateAdminUserPassword', { summary: '修改密码' })
  @UserInfo()
  async updateAdminUserPassword(@Body() body: UpdateUserPwd) {
    const user = this.ctx.getAttr(CtxAttrEnum.ADMIN_USER_INFO) as UserDTO
    return this.userService.updateUserPwd(body, user)
  }

  @Post('/updateAdminUserStatus', { summary: '启用或者禁用管理员' })
  @UserInfo()
  async updateUserStatus(@Body() body: BasicIdStatusDTO) {
    const user = this.ctx.getAttr(CtxAttrEnum.ADMIN_USER_INFO) as UserDTO
    return this.userService.updateUserInfo(body, user)
  }

  @Post('/refreshAccessToken', { summary: '刷新accessToken' })
  async refreshAccessToken(@Body() body: RefreshAccessTokenDTO) {
    return this.userService.refreshAccessToken(body)
  }
}
