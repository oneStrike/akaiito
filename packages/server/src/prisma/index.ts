import { Inject, Singleton } from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'
import { ILogger, IMidwayContainer } from '@midwayjs/core'
import { PrismaPg } from '@prisma/adapter-pg'

@Singleton()
export class RegisterPrisma {
  @Inject()
  logger: ILogger

  register(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
      ],
    })

    container.registerObject('prismaClient', prisma)
  }
}
