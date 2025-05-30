import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { Public } from '@/common/decorators/public.decorator'
import { RefreshTokenDto, UserLoginDto } from '../users/dto/user.dto'
import { AdminAuthService } from './admin-auth.service'
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard'

@ApiTags('管理端认证模块')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @Public()
  @ApiDoc('管理员登录', UserLoginDto)
  async login(@Body() loginDto: UserLoginDto) {
    return this.adminAuthService.login(loginDto)
  }

  @Post('refresh')
  @Public()
  @ApiDoc('刷新令牌', RefreshTokenDto)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.adminAuthService.refreshToken(refreshTokenDto.refreshToken)
  }

  @Post('logout')
  @UseGuards(AdminJwtAuthGuard)
  @ApiDoc('管理员登出')
  async logout(@CurrentUser() user: any) {
    // 这里可以实现令牌黑名单逻辑
    return {
      message: '登出成功',
    }
  }

  @Post('profile')
  @UseGuards(AdminJwtAuthGuard)
  @ApiDoc('获取当前用户信息')
  async getProfile(@CurrentUser() user: any) {
    return {
      user,
    }
  }
}
