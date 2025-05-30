import { Global, Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { loggerFactory } from '@/common/factories/logger.factory'
import { LoggerService } from '@/common/services/logger.service'
import { globalLoggerConfig } from '@/config/logger.config'
import { PrismaService } from './services/prisma.service'

@Global()
@Module({
  imports: [WinstonModule.forRoot(globalLoggerConfig)],
  providers: [PrismaService, loggerFactory, LoggerService],
  exports: [PrismaService, LoggerService, WinstonModule],
})
export class GlobalModule {}
