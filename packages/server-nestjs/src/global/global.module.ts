import { Global, Module } from '@nestjs/common'
import { JwtConfigService } from '@/config/jwt.config'
import { PrismaService } from './services/prisma.service'

@Global()
@Module({
  imports: [],
  providers: [PrismaService, JwtConfigService],
  exports: [PrismaService, JwtConfigService],
})
export class GlobalModule {}
