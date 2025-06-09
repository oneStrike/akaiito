import { Module } from '@nestjs/common'
import { JwtModule as NestjsJwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@/common/module/jwt/jwt.module'
import { JwtConfigService } from '@/config/jwt.config'
import { AuthController } from '@/modules/admin/auth/auth.controller'
import { AdminJwtAuthGuard } from './admin-jwt-auth.guard'
import { AdminJwtService } from './admin-jwt.service'
import { AdminJwtStrategy } from './admin-jwt.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule,
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    NestjsJwtModule.registerAsync({
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => {
        return jwtConfigService.getAdminJwtConfig()
      },
    }),
  ],
  providers: [AdminJwtService, AdminJwtStrategy, AdminJwtAuthGuard],
  exports: [AdminJwtService],
})
export class AdminAuthModule {}
