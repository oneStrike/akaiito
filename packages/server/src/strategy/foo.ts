import { Post, Inject, Controller, Get, InjectClient } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { JwtPassportMiddleware } from '@/middleware/jwt.middleware'
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager'
import { JwtService } from '@/basic/service/jwt.service'

@Controller('/')
export class JwtController {
  @Inject()
  jwt: JwtService

  @Inject()
  ctx: Context

  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.state.user)
    return this.ctx.state.user
  }

  @Get('/jwt')
  async genJwt() {
    return await this.jwt.sign({ msg: 'hello' })
  }
}
