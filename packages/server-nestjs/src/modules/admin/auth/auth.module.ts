import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CryptoService } from '@/common/services/crypto.service'
import { JwtConfigService } from '@/config/jwt.config'
import { AuthController } from '@/modules/admin/auth/auth.controller'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'
import { AdminJwtService } from './admin-jwt.service'
import { AdminJwtStrategy } from './admin-jwt.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => {
        return jwtConfigService.getAdminJwtConfig()
      },
    }),
  ],
  providers: [
    CryptoService,
    AdminJwtService,
    AdminJwtStrategy,
    AdminJwtAuthGuard,
  ],
  exports: [AdminJwtService, CryptoService],
})
export class AdminAuthModule {}
