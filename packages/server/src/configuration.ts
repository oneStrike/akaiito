import { RegisterDecoratorService } from '@/decorator/register.service'
import { ILogger, IMidwayContainer, MidwayWebRouterService } from '@midwayjs/core'
import { RegisterPrisma } from './prisma'
import { join } from 'node:path'
import * as busboy from '@midwayjs/busboy'
import * as captcha from '@midwayjs/captcha'
import { App, Configuration, Inject, Logger } from '@midwayjs/core'
import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'
import * as staticFile from '@midwayjs/static-file'
import * as validate from '@midwayjs/validate'
import { ExceptionFilter } from './filter/exception.filter'
import { AuthGuard } from './guard/auth.guard'
import { ReportMiddleware } from './middleware/report.middleware'
import * as security from '@midwayjs/security'
import * as jwt from '@midwayjs/jwt'
import * as cacheManager from '@midwayjs/cache-manager'
import * as axios from '@midwayjs/axios'

@Configuration({
  imports: [
    koa,
    jwt,
    axios,
    busboy,
    captcha,
    validate,
    security,
    staticFile,
    cacheManager,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application

  @Logger()
  logger: ILogger

  @Inject()
  registerPrisma: RegisterPrisma

  @Inject()
  decoratorService: RegisterDecoratorService

  @Inject()
  webRouterService: MidwayWebRouterService

  async onReady(container: IMidwayContainer) {
    this.registerPrisma.register(container)

    container.registerObject('router', await this.webRouterService.getFlattenRouterTable())

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
    this.app.useGuard(AuthGuard)
    this.decoratorService.register()
  }
}
