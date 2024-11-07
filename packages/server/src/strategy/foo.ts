import { Post, Inject, Controller, Get } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'
import { JwtPassportMiddleware } from '@/middleware/jwt.middleware'

@Controller('/')
export class JwtController {
  @Inject()
  jwt: JwtService

  @Inject()
  ctx: Context

  @Post('/passport/jwt', { middleware: [JwtPassportMiddleware] })
  async jwtPassport() {
    console.log('jwt user: ', this.ctx.state.user)
    return this.ctx.state.user
  }

  @Get('/jwt')
  @Post('/jwt')
  async genJwt() {
    this.ctx.rotateCsrfSecret()
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    }
  }
}
