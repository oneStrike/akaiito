import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtBlacklistService } from '@/common/module/jwt/jwt-blacklist.service'
import { RsaService } from '@/common/module/jwt/rsa.service'
import { JwtConfigService } from '@/config/jwt.config'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [JwtConfigService, RsaService, JwtBlacklistService],
  exports: [JwtConfigService, RsaService, JwtBlacklistService],
})
export class JwtModule {}
