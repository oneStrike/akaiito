import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { Public } from '@/common/decorators/public.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { AdminJwtPayload } from '@/modules/admin/auth/admin-jwt.service'
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
  TokenDto,
} from '@/modules/admin/users/dto/token.dto'
import {
  LoginResponseDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
  UserLoginDto,
  UserPageDto,
  UserRegisterDto,
} from '@/modules/admin/users/dto/user.dto'
import { AdminUserService } from '@/modules/admin/users/user.service'
import { CaptchaDto } from './dto/captcha.dto'

/**
 * 管理端用户控制器
 * 提供用户相关的 RESTful API 接口
 */
@ApiTags('管理端用户模块')
@Controller('admin/user')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  /**
   * 获取验证码接口
   */
  @Get('get-captcha')
  @ApiDoc({
    summary: '获取验证码',
    model: CaptchaDto,
  })
  @Public()
  getCaptcha() {
    return this.userService.getCaptcha()
  }

  /**
   * 用户登录接口
   */
  @Post('user-login')
  @ApiDoc({
    summary: '管理员登录',
    model: LoginResponseDto,
  })
  @Public()
  login(@Body() body: UserLoginDto, @Req() req: FastifyRequest) {
    return this.userService.login(body, req)
  }

  /**
   * 管理员登出接口
   */
  @Post('user-logout')
  @ApiDoc({
    summary: '管理员登出',
    model: {
      type: 'boolean',
    },
  })
  async logout(@Body() body: TokenDto) {
    return this.userService.logout(body)
  }

  /**
   * 用户注册接口
   */
  @Post('user-register')
  @ApiDoc({
    summary: '用户注册',
    model: IdDto,
  })
  @Public()
  register(@Body() body: UserRegisterDto) {
    return this.userService.register(body)
  }

  /**
   * 刷新访问令牌接口
   * 使用刷新令牌获取新的访问令牌
   * @param body 包含刷新令牌的请求体
   * @returns 新的访问令牌及有效期
   */
  @Post('user-refresh-token')
  @ApiDoc({
    summary: '刷新访问令牌',
    model: RefreshTokenResponseDto,
  })
  @Public()
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.userService.refreshToken(body.refreshToken)
  }

  /**
   * 修改密码接口
   */
  @Post('user-update-password')
  @ApiDoc({
    summary: '修改密码',
    model: UserDto,
  })
  updatePassword(
    @Body() body: UpdatePasswordDto,
    @CurrentUser() user: AdminJwtPayload,
    @Req() req: FastifyRequest,
  ) {
    return this.userService.updatePassword(Number.parseInt(user.sub), body, req)
  }

  /**
   * 更新用户信息接口
   * 根据当前用户身份更新其基本信息（如昵称、头像等）
   * @param body 包含要更新的用户信息的对象
   * @param user 当前登录用户的身份信息
   * @returns 更新后的用户信息
   */
  @Post('user-update-info')
  @ApiDoc({
    summary: '更新用户信息',
    model: UserDto,
  })
  updateUserInfo(
    @Body() body: UpdateUserDto,
    @CurrentUser() user: AdminJwtPayload,
  ) {
    return this.userService.updateUserInfo(Number.parseInt(user.sub), body)
  }

  /**
   * 获取当前用户信息接口
   * 返回当前登录用户的详细信息
   * @param user 当前登录用户的身份信息
   * @returns 当前用户的完整信息
   */
  @Get('user-Info')
  @ApiDoc({
    summary: '获取当前用户信息',
    model: UserDto,
  })
  getUserInfo(@CurrentUser() user: AdminJwtPayload) {
    return this.userService.getUserInfo(Number.parseInt(user.sub))
  }

  /**
   * 根据ID获取用户信息接口
   * 返回指定ID的用户详细信息
   * @param query 包含用户ID的查询参数对象
   * @returns 指定ID的用户完整信息
   */
  @Get('user-info-by-id')
  @ApiDoc({
    summary: '根据ID获取用户信息',
    model: UserDto,
  })
  getUserById(@Query() query: IdDto) {
    return this.userService.getUserInfo(query.id)
  }

  /**
   * 获取管理端用户分页列表接口
   */
  @Get('user-page')
  @ApiPageDoc({
    summary: '获取管理端用户分页列表',
    model: UserDto,
  })
  getUsers(@Query() query: UserPageDto) {
    return this.userService.getUsers(query)
  }

  @Post('user-delete')
  @ApiDoc({
    summary: '删除用户',
    model: IdDto,
  })
  async deleteUser(@Body() query: IdDto) {
    return this.userService.delete({ where: { id: query.id } })
  }
}
