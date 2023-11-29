import {
  Configuration,
  App,
  IMidwayContainer,
  IMidwayLogger,
  Logger
} from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'
import * as captcha from '@midwayjs/captcha'
import { ReportMiddleware } from './middleware/report.middleware'
import { ExceptionFilter } from './filter/exception.filter'

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
  readonly logger: IMidwayLogger

  async onReady(container: IMidwayContainer) {
    this.registerPrisma(container)

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
  }

  private registerPrisma(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      log: [{ emit: 'event', level: 'query' }]
    })
    prisma.$connect()
    // 输出查询日志
    prisma.$on('query', (e) => {
      this.logger.info(
        'Query: %s , params: %s , duration: %d ms',
        e.query,
        e.params,
        e.duration
      )
    })
    // prisma.$on('query', (event) => {
    // console.log(event);
    // });
    container.registerObject('prisma', prisma)
  }
}
