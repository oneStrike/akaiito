import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export interface JwtPayload {
  sub: number
  username: string
  type: 'admin' | 'client'
  iat?: number
  exp?: number
}

@Injectable()
export abstract class JwtStrategyBase extends PassportStrategy(Strategy) {
  protected constructor(
    protected configService: ConfigService,
    strategyName?: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret')!,
      passReqToCallback: false,
      ...(strategyName ? { name: strategyName } : {}),
    })
  }

  abstract validate(payload: JwtPayload): Promise<any>
}
