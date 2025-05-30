import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { LoggerService } from '@/common/services/logger.service'
import { adminLoggerConfig } from '@/config/logger.config'
import { AdminAuthModule } from './auth/admin-auth.module'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [AdminAuthModule, WinstonModule.forRoot(adminLoggerConfig)],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'ADMIN_LOGGER',
      useFactory: () => {
        // eslint-disable-next-line ts/no-require-imports
        const winston = require('winston')
        return winston.createLogger(adminLoggerConfig)
      },
    },
    {
      provide: 'AdminLoggerService',
      useFactory: (logger) => new LoggerService(logger),
      inject: ['ADMIN_LOGGER'],
    },
  ],
  exports: ['AdminLoggerService'],
})
export class AdminModule {}
