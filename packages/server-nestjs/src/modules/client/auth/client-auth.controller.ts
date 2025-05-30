import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { Public } from '@/common/decorators/public.decorator'
import {
  ClientLoginDto,
  ClientRegisterDto,
  RefreshTokenDto,
} from '../users/dto/user.dto'
import { ClientAuthService } from './client-auth.service'
import { ClientJwtAuthGuard } from './guards/client-jwt-auth.guard'

@ApiTags('客户端认证模块')
@Controller('client/auth')
export class ClientAuthController {
  constructor(private readonly clientAuthService: ClientAuthService) {}

  @Post('login')
  @Public()
  @ApiDoc('客户端用户登录', ClientLoginDto)
  async login(@Body() loginDto: ClientLoginDto) {
    return this.clientAuthService.login(loginDto)
  }

  @Post('register')
  @Public()
  @ApiDoc('客户端用户注册', ClientRegisterDto)
  async register(@Body() registerDto: ClientRegisterDto) {
    return this.clientAuthService.register(registerDto)
  }

  @Post('refresh')
  @Public()
  @ApiDoc('刷新令牌', RefreshTokenDto)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.clientAuthService.refreshToken(refreshTokenDto.refreshToken)
  }

  @Post('logout')
  @UseGuards(ClientJwtAuthGuard)
  @ApiDoc('客户端用户登出')
  async logout(@CurrentUser() user: any) {
    // 这里可以实现令牌黑名单逻辑
    return {
      message: '登出成功',
    }
  }

  @Post('profile')
  @UseGuards(ClientJwtAuthGuard)
  @ApiDoc('获取当前用户信息')
  async getProfile(@CurrentUser() user: any) {
    return {
      user,
    }
  }
}
