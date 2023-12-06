import { IMidwayContainer } from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client/extension'
import { exists, find, softDeletion } from './modules'

export const registerPrisma = (container: IMidwayContainer) => {
  const prisma = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' }
    ]
  }).$extends({
    name: 'exists',
    model: {
      $allModels: {
        async exists<T>(
          this: T,
          where: Prisma.Args<T, 'findFirst'>['where']
        ): Promise<boolean> {
          if (!where) return false
          const context = Prisma.getExtensionContext(this)
          return await exists(context, where)
        },
        async find<T>(
          this: T,
          where: Prisma.Args<T, 'findMany'>['where'],
          timeSerialize = true
        ): Promise<T> {
          const context = Prisma.getExtensionContext(this)
          return await find(context, where, timeSerialize)
        },
        async softDeletion<T>(
          this: T,
          where: Prisma.Args<T, 'findMany'>['where']
        ): Promise<T> {
          const context = Prisma.getExtensionContext(this)
          return await softDeletion(context, where)
        }
      }
    }
  })

  container.registerObject('prismaClient', prisma)
}
