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
              return new Date(new Date(model.createdAt).getTime() + 8 * 60 * 60 * 1000)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19)
            },
          },
          updatedAt: {
            // @ts-expect-error ignore
            needs: { updatedAt: true },
            compute(model) {
              return new Date(new Date(model.updatedAt).getTime() + 8 * 60 * 60 * 1000)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19)
            },
          },
          publishAt: {
            // @ts-expect-error ignore
            needs: { publishAt: true },
            compute(model) {
              if (!model.publishAt) {
                return model.publishAt
              }
              return new Date(new Date(model.publishAt).getTime() + 8 * 60 * 60 * 1000)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19)
            },
          },
          lastUpdated: {
            // @ts-expect-error ignore
            needs: { lastUpdated: true },
            compute(model) {
              if (!model.lastUpdated) {
                return model.lastUpdated
              }
              return new Date(new Date(model.lastUpdated).getTime() + 8 * 60 * 60 * 1000)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19)
            },
          },
        },
      },
    })

    container.registerObject('prismaClient', prisma)
  }
}
