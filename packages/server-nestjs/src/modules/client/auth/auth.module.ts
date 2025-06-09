import { Module } from '@nestjs/common'
import { JwtModule as NestjsJwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@/common/module/jwt/jwt.module'
import { JwtConfigService } from '@/config/jwt.config'
import { ClientJwtAuthGuard } from './client-jwt-auth.guard'
import { ClientJwtService } from './client-jwt.service'
import { ClientJwtStrategy } from './client-jwt.strategy'

@Module({
  imports: [
    JwtModule,
    PassportModule.register({ defaultStrategy: 'client-jwt' }),
    NestjsJwtModule.registerAsync({
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => {
        return jwtConfigService.getClientJwtConfig()
      },
    }),
  ],
  providers: [ClientJwtService, ClientJwtStrategy, ClientJwtAuthGuard],
  exports: [ClientJwtService],
})
export class ClientAuthModule {}
