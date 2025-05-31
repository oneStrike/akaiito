import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtConfigService } from '@/config/jwt.config'
import { ClientJwtPayload } from './client-jwt.service'

/**
 * ClientJwtStrategy 类
 * 实现基于 JWT 的客户端用户认证策略
 * 使用 passport-jwt 库提供的 Strategy 类
 */
@Injectable()
export class ClientJwtStrategy extends PassportStrategy(Strategy, 'client-jwt') {
  /**
   * 构造函数
   * @param jwtConfigService JWT 配置服务，用于获取 JWT 密钥
   */
  constructor(private jwtConfigService: JwtConfigService) {
    const config = jwtConfigService.getClientJwtConfig() // 获取客户端 JWT 配置
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: config.secret, // 使用配置中的密钥
    })
  }

  /**
   * 验证 JWT 负载
   * 该方法在 JWT 被成功解码后调用
   * @param payload JWT 负载
   * @returns 验证通过的用户信息
   * @throws UnauthorizedException 如果角色不是 'client'
   */
  async validate(payload: ClientJwtPayload) {
    // 确保角色为 'client'
    if (payload.role !== 'client') {
      throw new UnauthorizedException('Invalid client token')
    }

    // 返回验证通过的用户信息，将被添加到请求对象中
    return payload
  }
}
