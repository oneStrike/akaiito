import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
@Global()
export class GlobalModule {}
