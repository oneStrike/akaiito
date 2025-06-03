import { Global, Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { LoggerFactoryService } from '@/common/services/logger-factory.service'
import { CustomLoggerService } from '@/common/services/logger.service'
import { globalLoggerConfig } from '@/config/logger.config'

/**
 * 日志模块
 * 提供全局的日志服务
 */
@Global()
@Module({
  imports: [
    // 导入Winston模块，使用全局配置
    WinstonModule.forRoot(globalLoggerConfig),
  ],
  providers: [
    LoggerFactoryService,
    {
      provide: CustomLoggerService,
      useFactory: (loggerFactory: LoggerFactoryService) => {
        // 提供默认的全局日志服务
        return loggerFactory.createGlobalLogger('Global')
      },
      inject: [LoggerFactoryService],
    },
  ],
  exports: [LoggerFactoryService, CustomLoggerService, WinstonModule],
})
export class LoggerModule {}
