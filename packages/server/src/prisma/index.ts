import { Inject, Singleton } from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'
import { ILogger, IMidwayContainer } from '@midwayjs/core'

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
    }).$extends({
      result: {
        $allModels: {
          createdAt: {
            // @ts-expect-error ignore
            needs: { createdAt: true },
            compute(model) {
              const utcDate = new Date(model.createdAt)
              const beijingTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000)
              return beijingTime.toISOString().replace('T', ' ').substring(0, 19)
            },
          },
          updatedAt: {
            // @ts-expect-error ignore
            needs: { updatedAt: true },
            compute(model) {
              const utcDate = new Date(model.updatedAt)
              const beijingTime = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000)
              return beijingTime.toISOString().replace('T', ' ').substring(0, 19)
            },
          },
        },
      },
    })

    container.registerObject('prismaClient', prisma)
  }
}
