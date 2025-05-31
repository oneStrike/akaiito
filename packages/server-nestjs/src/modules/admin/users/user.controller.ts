import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { Public } from '@/common/decorators/public.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import { AdminJwtPayload } from '@/modules/admin/auth/admin-jwt.service'
import { RefreshTokenDto } from '@/modules/admin/users/dto/refresh-token.dto'
import { UpdatePasswordDto } from '@/modules/admin/users/dto/update-password.dto'
import { UpdateUserDto } from '@/modules/admin/users/dto/update-user.dto'
import { UserRegisterDto } from '@/modules/admin/users/dto/user-register.dto'
import { UserDto, UserLoginDto } from '@/modules/admin/users/dto/user.dto'
import { UserService } from '@/modules/admin/users/user.service'
import { CaptchaDto } from './dto/captcha.dto'

@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getCaptcha')
  @ApiDoc('获取验证码', CaptchaDto)
  @Public()
  getCaptcha() {
    return this.userService.getCaptcha()
  }

  @Post('login')
  @ApiDoc('用户登录', UserDto)
  @Public()
  login(@Body() body: UserLoginDto) {
    return this.userService.login(body)
  }

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

  @Post('refreshToken')
  @ApiDoc('刷新访问令牌', UserDto)
  @Public()
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.userService.refreshToken(body.refreshToken)
  }

  @Post('updatePassword')
  @ApiDoc('修改密码', UserDto)
  updatePassword(
    @Body() body: UpdatePasswordDto,
    @CurrentUser() user: AdminJwtPayload,
  ) {
    // 验证新密码是否一致
    if (body.newPassword !== body.confirmPassword) {
      throw new Error('两次输入的新密码不一致')
    }
    return this.userService.updatePassword(
      Number.parseInt(user.sub),
      body.oldPassword,
      body.newPassword,
    )
  }

  @Post('updateUserInfo')
  @ApiDoc('更新用户信息', UserDto)
  updateUserInfo(
    @Body() body: UpdateUserDto,
    @CurrentUser() user: AdminJwtPayload,
  ) {
    return this.userService.updateUserInfo(Number.parseInt(user.sub), body)
  }

  @Get('getUserInfo')
  @ApiDoc('获取当前用户信息', UserDto)
  getUserInfo(@CurrentUser() user: AdminJwtPayload) {
    return this.userService.getUserInfo(Number.parseInt(user.sub))
  }

  @Get('getUserById')
  @ApiDoc('根据ID获取用户信息', UserDto)
  getUserById(@Query() query: IdDto) {
    return this.userService.getUserInfo(query.id)
  }

  @Get('getAdminUserPage')
  @ApiPageDoc('获取管理端用户分页列表', UserDto)
  @UseInterceptors(useClassSerializerInterceptor(UserDto))
  getUsers(@Query() query: PageDto) {
    return this.userService.getUsers(query.pageIndex, query.pageSize)
  }
}
