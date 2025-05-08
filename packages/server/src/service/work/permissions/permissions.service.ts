import { Inject, Provide } from '@midwayjs/core'
import { BasicService } from '@/basic/service/basic.service'
import { WorkPermissions, PrismaClient } from '@prisma/client'

@Provide()
export class WorkPermissionsService extends BasicService<WorkPermissions> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.workPermissions
  }
}
