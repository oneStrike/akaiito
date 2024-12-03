import { Inject, Singleton } from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'
import { ILogger, IMidwayContainer } from '@midwayjs/core'
import { withOptimize } from '@prisma/extension-optimize'
import { prismaExtends } from '@/prisma/extends'

@Singleton()
export class RegisterPrisma {
  @Inject()
  logger: ILogger

  register(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    })
      .$extends(withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY }))
      .$extends(prismaExtends)

    container.registerObject('prismaClient', prisma)
  }
}
