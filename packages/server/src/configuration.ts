import {
  Configuration,
  App,
  ILogger,
  Logger,
  IMidwayContainer,
  Inject,
  MidwayDecoratorService,
  MidwayWebRouterService
} from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import { join } from 'path'
import * as captcha from '@midwayjs/captcha'
import * as upload from '@midwayjs/upload'
import * as staticFile from '@midwayjs/static-file'
import { ReportMiddleware } from './middleware/report.middleware'
import { JwtMiddleware } from './middleware/jwt.middleware'
import { ExceptionFilter } from './filter/exception.filter'
import { RegisterPrisma } from './prisma'
import {
  getUserInfoHandler,
  USERINFO_KEY
} from './decorator/userinfo.decorator'

@Configuration({
  imports: [
    koa,
    upload,
    captcha,
    validate,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local']
    }
  ],
  importConfigs: [join(__dirname, './config')]
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application

  @Logger()
  logger: ILogger

  @Inject()
  registerPrisma: RegisterPrisma

  @Inject()
  decoratorService: MidwayDecoratorService

  @Inject()
  webRouterService: MidwayWebRouterService

  async onReady(container: IMidwayContainer) {
    this.registerPrisma.register(container)

    container.registerObject(
      'router',
      await this.webRouterService.getFlattenRouterTable()
    )

    this.app.useMiddleware([ReportMiddleware, JwtMiddleware])
    this.app.useFilter([ExceptionFilter])

    this.decoratorService.registerMethodHandler(
      USERINFO_KEY,
      getUserInfoHandler
    )
  }
}
