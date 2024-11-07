import { Post, Inject, Controller, Get } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'
import { JwtPassportMiddleware } from '@/middleware/jwt.middleware'
import * as fs from 'fs'
import { join } from 'path'

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
    console.log(__dirname)
    const privateKey = fs.readFileSync(
      join(__dirname, 'ecc-private-key.pem'),
      'utf8',
    )

    return {
      t: this.jwt.decodeSync(
        this.jwt.signSync({ msg: 'Hello Midway' }, privateKey, {
          algorithm: 'ES256',
        }),
      ),
    }
  }
}
