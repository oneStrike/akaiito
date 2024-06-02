import { ILogger, IMidwayContainer, Inject, Singleton } from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'

@Singleton()
export class RegisterPrisma {
  @Inject()
  logger: ILogger

  register(container: IMidwayContainer) {
    const prisma = new PrismaClient({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' }
      ]
    })

    container.registerObject('prismaClient', prisma)
  }
}
