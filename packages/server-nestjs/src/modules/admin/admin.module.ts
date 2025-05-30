import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { AdminAuthModule } from './auth/admin-auth.module'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'
import { LoggerService } from '../../common/services/logger.service'
import { adminLoggerConfig } from '../../config/logger.config'

@Module({
  imports: [
    AdminAuthModule,
    WinstonModule.forRoot(adminLoggerConfig),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'ADMIN_LOGGER',
      useFactory: () => {
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
