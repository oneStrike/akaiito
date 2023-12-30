import {
  ILogger,
  IMidwayContainer,
  Inject,
  Provide,
  Scope,
  ScopeEnum
} from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
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
