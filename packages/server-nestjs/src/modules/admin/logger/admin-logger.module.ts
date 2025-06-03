import { Module } from '@nestjs/common'
import { LoggerFactoryService } from '@/common/services/logger-factory.service'

/**
 * Admin模块专用日志模块
 */
@Module({
  providers: [
    {
      provide: 'ADMIN_LOGGER',
      useFactory: (loggerFactory: LoggerFactoryService) => {
        return loggerFactory.createAdminLogger('AdminModule')
      },
      inject: [LoggerFactoryService],
    },
  ],
  exports: ['ADMIN_LOGGER'],
})
export class AdminLoggerModule {}
