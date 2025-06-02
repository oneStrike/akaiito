import { Global, Module } from '@nestjs/common'
import { RsaService } from '@/common/services/rsa.service'
import { JwtConfigService } from '@/config/jwt.config'
import { JwtBlacklistService } from './services/jwt-blacklist.service'
import { PrismaService } from './services/prisma.service'

@Global()
@Module({
  imports: [],
  providers: [PrismaService, JwtConfigService, RsaService, JwtBlacklistService],
  exports: [PrismaService, JwtConfigService, RsaService, JwtBlacklistService],
})
export class GlobalModule {}
