import {
  Configuration,
  App,
  ILogger,
  Logger,
  IMidwayContainer
} from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import { join } from 'path'
import * as captcha from '@midwayjs/captcha'
import { ReportMiddleware } from './middleware/report.middleware'
import { ExceptionFilter } from './filter/exception.filter'
import { registerPrisma } from './prisma/register'

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

  onReady(container: IMidwayContainer) {
    registerPrisma(container)

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
  }
}
