import { PrismaClient } from '@prisma/client'
import { Provide } from '@midwayjs/core'
import { Prisma } from '@prisma/client/extension'
import { exists, find, softDeletion } from './modules'

@Provide()
export class AkaiitoPrisma extends PrismaClient {
  prisma

  constructor() {
    super()
    this.prisma = new PrismaClient().$extends({
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
    return this.prisma
  }
}
