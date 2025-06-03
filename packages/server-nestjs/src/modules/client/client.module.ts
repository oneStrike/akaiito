import { Module } from '@nestjs/common'
import { ClientAuthModule } from './auth/auth.module'
import { ClientLoggerModule } from './logger/client-logger.module'
import { ClientUserModule } from './users/user.module'

@Module({
  imports: [ClientAuthModule, ClientUserModule, ClientLoggerModule],
  controllers: [],
})
export class ClientModule {}
