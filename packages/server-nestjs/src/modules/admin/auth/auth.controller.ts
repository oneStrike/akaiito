import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { Public } from '@/common/decorators/public.decorator'
import { RsaService } from '@/common/module/jwt/rsa.service'
import { RsaPublicKeyDto } from './dto/rsa-public-key.dto'

/**
 * 管理端认证控制器
 * 提供获取RSA公钥等认证相关接口
 */
@ApiTags('管理端认证模块')
@Controller('admin/auth')
export class AuthController {
  constructor(private readonly rsaService: RsaService) {}

  /**
   * 获取Admin专用RSA公钥
   * 前端可以使用此公钥对管理员敏感数据进行加密
   * @returns Admin RSA公钥
   */
  @Get('/publicKey')
  @ApiDoc({
    summary: '获取Admin专用RSA公钥',
    model: RsaPublicKeyDto,
  })
  @Public()
  getAdminPublicKey(): RsaPublicKeyDto {
    return {
      publicKey: this.rsaService.getAdminPublicKey(),
    }
  }
}
