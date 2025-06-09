import { Module } from '@nestjs/common'
import { LoggerFactoryService } from '@/common/module/logger/logger-factory.service'

/**
 * Client模块专用日志模块
 */
@Module({
  providers: [
    {
      provide: 'CLIENT_LOGGER',
      useFactory: (loggerFactory: LoggerFactoryService) => {
        return loggerFactory.createClientLogger('ClientModule')
      },
      inject: [LoggerFactoryService],
    },
  ],
  exports: ['CLIENT_LOGGER'],
})
export class ClientLoggerModule {}
