import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientAuthController } from './client-auth.controller'
import { ClientAuthService } from './client-auth.service'
import { ClientJwtStrategy } from './strategies/client-jwt.strategy'
import { ClientJwtAuthGuard } from './guards/client-jwt-auth.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ClientAuthController],
  providers: [ClientAuthService, ClientJwtStrategy, ClientJwtAuthGuard],
  exports: [ClientAuthService, ClientJwtAuthGuard],
})
export class ClientAuthModule {}
