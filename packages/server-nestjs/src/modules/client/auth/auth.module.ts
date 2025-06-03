import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CryptoService } from '@/common/services/crypto.service'
import { JwtConfigService } from '@/config/jwt.config'
import { ClientJwtAuthGuard } from './client-jwt-auth.guard'
import { ClientJwtService } from './client-jwt.service'
import { ClientJwtStrategy } from './client-jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'client-jwt' }),
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => {
        return jwtConfigService.getClientJwtConfig()
      },
    }),
  ],
  providers: [
    CryptoService,
    ClientJwtService,
    ClientJwtStrategy,
    ClientJwtAuthGuard,
  ],
  exports: [ClientJwtService, CryptoService],
})
export class ClientAuthModule {}
