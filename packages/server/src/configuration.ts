import {
  Configuration,
  App,
  ILogger,
  Logger,
  IMidwayContainer,
  Inject
} from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import { join } from 'path'
import * as captcha from '@midwayjs/captcha'
import { ReportMiddleware } from './middleware/report.middleware'
import { ExceptionFilter } from './filter/exception.filter'
import { RegisterPrisma } from './prisma'

@Configuration({
  imports: [
    koa,
    captcha,
    validate,
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

  onReady(container: IMidwayContainer) {
    this.registerPrisma.register(container)

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
  }
}
