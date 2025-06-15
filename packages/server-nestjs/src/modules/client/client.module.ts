import { Module } from '@nestjs/common'
import { ClientAuthModule } from './auth/auth.module'
import { ClientLoggerModule } from './logger/client-logger.module'
import { ClientRequestLogModule } from './request-log/client-request-log.module'
import { ClientUserModule } from './users/user.module'

@Module({
  imports: [
    ClientAuthModule,
    ClientUserModule,
    ClientLoggerModule,
    ClientRequestLogModule,
  ],
  controllers: [],
})
export class ClientModule {}
