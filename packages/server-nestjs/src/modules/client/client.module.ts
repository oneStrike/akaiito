import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import { LoggerService } from '@/common/services/logger.service'
import { clientLoggerConfig } from '@/config/logger.config'
import { ClientAuthModule } from './auth/client-auth.module'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [ClientAuthModule, WinstonModule.forRoot(clientLoggerConfig)],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'CLIENT_LOGGER',
      useFactory: () => {
        // eslint-disable-next-line ts/no-require-imports
        const winston = require('winston')
        return winston.createLogger(clientLoggerConfig)
      },
    },
    {
      provide: 'ClientLoggerService',
      useFactory: (logger) => new LoggerService(logger),
      inject: ['CLIENT_LOGGER'],
    },
  ],
  exports: ['ClientLoggerService'],
})
export class ClientModule {}
