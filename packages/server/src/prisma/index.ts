import {
  ILogger,
  IMidwayContainer,
  Inject,
  Provide,
  Scope,
  ScopeEnum
} from '@midwayjs/core'
import { PrismaClient } from '@prisma/client'
import * as extendModules from './modules'

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

    prisma.$on('query', (e) => {
      this.logger.info(
        'Query: %s , params: %s , duration: %d ms',
        e.query,
        e.params,
        e.duration
      )
    })

    const extendPrisma = prisma.$extends({
      name: 'exists',
      model: {
        $allModels: {
          ...extendModules
        }
      }
    })

    container.registerObject('prismaClient', extendPrisma)
  }
}
