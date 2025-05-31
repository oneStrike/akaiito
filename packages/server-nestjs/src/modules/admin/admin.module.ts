import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtConfigService } from '@/config/jwt.config'
import { AdminJwtAuthGuard } from './auth/admin-jwt-auth.guard'
import { AdminJwtService } from './auth/admin-jwt.service'
import { AdminJwtStrategy } from './auth/admin-jwt.strategy'
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
  controllers: [UserController],
  providers: [
    UserService,
    AdminJwtService,
    AdminJwtStrategy,
    AdminJwtAuthGuard,
  ],
  exports: [AdminJwtService, AdminJwtAuthGuard],
})
export class AdminModule {}
