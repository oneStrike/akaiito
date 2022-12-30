import { Configuration, App, Logger } from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import * as passport from '@midwayjs/passport'
import * as jwt from '@midwayjs/jwt'
import * as cache from '@midwayjs/cache'
import * as captcha from '@midwayjs/captcha'
import * as sequlize from '@midwayjs/sequelize'
import * as upload from '@midwayjs/upload'
import * as staticFile from '@midwayjs/static-file'
import * as crossDomain from '@midwayjs/cross-domain'
import { join } from 'path'
import { ExceptionFilter } from './filter/exception.filter'
import { ResponseMiddleware } from './middleware/response.middleware'
import { JwtGuard } from './guard/jwt.guard'
import { IMidwayLogger } from '@midwayjs/logger'
import { SerializeMiddleware } from './middleware/serialize.middleware'

@Configuration({
  imports: [
    koa,
    validate,
    passport,
    jwt,
    cache,
    captcha,
    sequlize,
    upload,
    staticFile,
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local', 'prod']
    }
  ],
  importConfigs: [join(__dirname, './config')]
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application

  @Logger()
  readonly logger: IMidwayLogger

  async onReady() {
    this.app.useFilter([ExceptionFilter])
    this.app.useMiddleware([SerializeMiddleware, ResponseMiddleware])
    this.app.useGuard([JwtGuard])
  }
}
