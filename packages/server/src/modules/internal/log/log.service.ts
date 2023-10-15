import { Provide } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { PrismaClient } from '@prisma/client'

@Provide()
export class LogService {
  async recordLogs(context: Context) {
    const prisma = new PrismaClient()
    const { path, method, header } = context
    console.log(path, method, header)

    await prisma.adminLog.create({
      data: {
        method,
        path,
        userAgent: header['user-agent']
      }
    })
  }
}
