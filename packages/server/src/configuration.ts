import type { DecoratorService } from '@/basic/service/decorator.service'
import type { ILogger, IMidwayContainer, MidwayWebRouterService } from '@midwayjs/core'
import type { RegisterPrisma } from './prisma'
import { join } from 'node:path'
import * as busboy from '@midwayjs/busboy'
import * as captcha from '@midwayjs/captcha'
import {
  App,
  Configuration,
  Inject,
  Logger,
} from '@midwayjs/core'
import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'
import * as staticFile from '@midwayjs/static-file'
import * as validate from '@midwayjs/validate'
import { ExceptionFilter } from './filter/exception.filter'
import { AuthGuard } from './guard/auth.guard'
import { ReportMiddleware } from './middleware/report.middleware'

@Configuration({
  imports: [
    koa,
    busboy,
    captcha,
    validate,
    staticFile,
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
  decoratorService: DecoratorService

  @Inject()
  webRouterService: MidwayWebRouterService

  async onReady(container: IMidwayContainer) {
    this.registerPrisma.register(container)

    container.registerObject(
      'router',
      await this.webRouterService.getFlattenRouterTable(),
    )

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
    this.app.useGuard(AuthGuard)
    this.decoratorService.register()
  }
}
