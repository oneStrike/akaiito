import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { Public } from '@/common/decorators/public.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import {
  AdminJwtPayload,
  AdminJwtService,
} from '@/modules/admin/auth/admin-jwt.service'
import { RefreshTokenDto } from '@/modules/admin/users/dto/refresh-token.dto'
import { UpdatePasswordDto } from '@/modules/admin/users/dto/update-password.dto'
import { UpdateUserDto } from '@/modules/admin/users/dto/update-user.dto'
import { UserRegisterDto } from '@/modules/admin/users/dto/user-register.dto'
import {
  LoginResponseDto,
  UserDto,
  UserLoginDto,
} from '@/modules/admin/users/dto/user.dto'
import { UserService } from '@/modules/admin/users/user.service'
import { CaptchaDto } from './dto/captcha.dto'

/**
 * 管理端用户控制器
 * 提供用户相关的 RESTful API 接口
 */
@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminJwtService: AdminJwtService,
  ) {}

  /**
   * 获取验证码接口
   * 返回生成的验证码信息
   * @returns 验证码数据对象
   */
  @Get('getCaptcha')
  @ApiDoc('获取验证码', CaptchaDto)
  @Public()
  getCaptcha() {
    return this.userService.getCaptcha()
  }

  /**
   * 用户登录接口
   * 验证用户凭据并返回用户信息和令牌
   * @param body 登录请求体，包含用户名和密码等信息
   * @returns 登录成功后的用户数据及访问令牌
   */
  @Post('login')
  @ApiDoc('管理员登录', LoginResponseDto)
  @Public()
  login(@Body() body: UserLoginDto) {
    return this.userService.login(body)
  }

  /**
   * 管理员登出接口
   * 将当前访问令牌添加到黑名单中
   * @param req 请求对象，包含授权头
   * @returns 登出结果
   */
  @Post('logout')
  @ApiDoc('管理员登出', {
    type: 'object',
    properties: { success: { type: 'boolean' } },
  })
  async logout(@Req() req: any) {
    try {
      // 从请求头中提取访问令牌
      const authHeader = req.headers.authorization
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { success: false, message: 'No token provided' }
      }

      const accessToken = authHeader.substring(7) // 去掉 'Bearer ' 前缀

      // 从请求中获取刷新令牌（如果有）
      const refreshToken = req.body?.refreshToken

      // 将令牌添加到黑名单
      const success = await this.adminJwtService.logout(
        accessToken,
        refreshToken,
      )

      return { success }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Logout failed' }
    }
  }

  /**
   * 用户注册接口
   * 创建新用户并返回注册结果
   * @param body 注册请求体，包含用户名、密码和手机号
   * @returns 注册成功后的用户数据
   */
  @Post('register')
  @ApiDoc('用户注册', UserDto)
  @Public()
  register(@Body() body: UserRegisterDto) {
    // 验证密码是否一致
    if (body.password !== body.confirmPassword) {
      throw new Error('两次输入的密码不一致')
    }
    return this.userService.register(body.username, body.password, body.mobile)
  }

  /**
   * 刷新访问令牌接口
   * 使用刷新令牌获取新的访问令牌
   * @param body 包含刷新令牌的请求体
   * @returns 新的访问令牌及有效期
   */
  @Post('refreshToken')
  @ApiDoc('刷新访问令牌', UserDto)
  @Public()
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.userService.refreshToken(body.refreshToken)
  }

  /**
   * 修改密码接口
   * 根据当前用户身份验证旧密码并更新为新密码
   * @param body 包含旧密码、新密码和确认密码的数据对象
   * @param user 当前登录用户的身份信息
   * @returns 修改密码后的用户信息
   */
  @Post('updatePassword')
  @ApiDoc('修改密码', UserDto)
  updatePassword(
    @Body() body: UpdatePasswordDto,
    @CurrentUser() user: AdminJwtPayload,
  ) {
    // 验证新密码是否一致
    if (body.newPassword !== body.confirmPassword) {
      throw new HttpException('新密码和确认密码不一致', HttpStatus.BAD_REQUEST)
    }
    return this.userService.updatePassword(
      Number.parseInt(user.sub),
      body.oldPassword,
      body.newPassword,
    )
  }

  /**
   * 更新用户信息接口
   * 根据当前用户身份更新其基本信息（如昵称、头像等）
   * @param body 包含要更新的用户信息的对象
   * @param user 当前登录用户的身份信息
   * @returns 更新后的用户信息
   */
  @Post('updateUserInfo')
  @ApiDoc('更新用户信息', UserDto)
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
  @Get('getUserInfo')
  @ApiDoc('获取当前用户信息', UserDto)
  getUserInfo(@CurrentUser() user: AdminJwtPayload) {
    return this.userService.getUserInfo(Number.parseInt(user.sub))
  }

  /**
   * 根据ID获取用户信息接口
   * 返回指定ID的用户详细信息
   * @param query 包含用户ID的查询参数对象
   * @returns 指定ID的用户完整信息
   */
  @Get('getUserById')
  @ApiDoc('根据ID获取用户信息', UserDto)
  getUserById(@Query() query: IdDto) {
    return this.userService.getUserInfo(query.id)
  }

  /**
   * 获取管理端用户分页列表接口
   * 返回按页码和每页数量分页的用户列表数据
   * @param query 分页查询参数对象，包含 pageIndex 和 pageSize
   * @returns 分页用户列表数据及总条数
   */
  @Get('getAdminUserPage')
  @ApiPageDoc('获取管理端用户分页列表', UserDto)
  @UseInterceptors(useClassSerializerInterceptor(UserDto))
  getUsers(@Query() query: PageDto) {
    return this.userService.getUsers(query.pageIndex, query.pageSize)
  }
}
