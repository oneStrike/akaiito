import { Configuration, App, Config, IMidwayContainer } from '@midwayjs/core'
import * as koa from '@midwayjs/koa'
import * as validate from '@midwayjs/validate'
import * as info from '@midwayjs/info'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'
import * as captcha from '@midwayjs/captcha'
import { ReportMiddleware } from './middleware/report.middleware'
import type { IterateObject } from '@akaiito/typings'
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

  @Config('prisma')
  private prismaConfig: IterateObject

  async onReady(container: IMidwayContainer) {
    this.registerPrisma(container)

    this.app.useMiddleware([ReportMiddleware])
    this.app.useFilter([ExceptionFilter])
  }

  private registerPrisma(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      // log: [{ emit: 'event', level: 'query' }],
      datasources: { db: { url: this.prismaConfig.url } }
    })
    prisma.$connect()
    // prisma.$on('query', (event) => {
    // console.log(event);
    // });
    container.registerObject('prisma', prisma)
  }
}
