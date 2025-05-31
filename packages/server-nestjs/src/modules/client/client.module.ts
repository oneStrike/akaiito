import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtConfigService } from '@/config/jwt.config'
import { ClientJwtAuthGuard } from './auth/client-jwt-auth.guard'
import { ClientJwtService } from './auth/client-jwt.service'
import { ClientJwtStrategy } from './auth/client-jwt.strategy'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

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
  controllers: [UserController],
  providers: [
    UserService,
    ClientJwtService,
    ClientJwtStrategy,
    ClientJwtAuthGuard,
  ],
  exports: [ClientJwtService, ClientJwtAuthGuard],
})
export class ClientModule {}
