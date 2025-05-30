import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload, JwtStrategy } from '@/common/strategies/jwt.strategy'
import { PrismaService } from '@/global/services/prisma.service'

@Injectable()
export class AdminJwtStrategy extends JwtStrategy {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    console.log(configService.get('JWT_SECRET'))
    super(configService, 'admin-jwt')
  }

  async validate(payload: JwtPayload) {
    // 验证用户类型
    if (payload.type !== 'admin') {
      throw new UnauthorizedException('无效的用户类型')
    }

    // 查询用户是否存在且状态正常
    const user = await this.prisma.adminUser.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        username: true,
        avatar: true,
        mobile: true,
        status: true,
        isRoot: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    if (!user.status) {
      throw new UnauthorizedException('用户已被禁用')
    }

    return user
  }
}
