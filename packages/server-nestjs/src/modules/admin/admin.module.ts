import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { CryptoService } from '@/common/services/crypto.service'
import { JwtConfigService } from '@/config/jwt.config'
import { AdminJwtAuthGuard } from './auth/admin-jwt-auth.guard'
import { AdminJwtService } from './auth/admin-jwt.service'
import { AdminJwtStrategy } from './auth/admin-jwt.strategy'
import { AuthController } from './auth/auth.controller'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.registerAsync({
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => {
        return jwtConfigService.getAdminJwtConfig()
      },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    CryptoService,
    AdminJwtService,
    AdminJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AdminJwtAuthGuard,
    },
  ],
  exports: [AdminJwtService],
})
export class AdminModule {}
