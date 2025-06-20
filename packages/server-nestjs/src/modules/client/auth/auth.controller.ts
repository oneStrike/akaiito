import { Controller, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { RsaService } from '@/common/module/jwt/rsa.service'
import { ClientJwtService } from './client-jwt.service'

/**
 * 客户端认证控制器
 * 提供登出等认证相关接口
 */
@ApiTags('客户端认证模块')
@Controller('client/auth')
export class ClientAuthController {
  constructor(
    private readonly rsaService: RsaService,
    private readonly clientJwtService: ClientJwtService,
  ) {}

  /**
   * 客户端用户登出接口
   * 将当前访问令牌添加到黑名单中
   * @param req 请求对象，包含授权头
   * @returns 登出结果
   */
  @Post('logout')
  @ApiDoc({
    summary: '客户端用户登出接口',
    model: {
      type: 'object',
      properties: { success: { type: 'boolean' } },
    },
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
      const success = await this.clientJwtService.logout(
        accessToken,
        refreshToken,
      )

      return { success }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, message: 'Logout failed' }
    }
  }
}
