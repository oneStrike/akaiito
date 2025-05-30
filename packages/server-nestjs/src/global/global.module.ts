import { Global, Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { PrismaService } from './services/prisma.service'
import { LoggerService } from '../common/services/logger.service'
import { globalLoggerConfig } from '../config/logger.config'

@Global()
@Module({
  imports: [
    WinstonModule.forRoot(globalLoggerConfig),
  ],
  providers: [PrismaService, LoggerService],
  exports: [PrismaService, LoggerService, WinstonModule],
})
export class GlobalModule {}
