import { Body, Controller, Get, Inject, Post } from '@midwayjs/core'
import { WorkPermissionsService } from '@/service/work/permissions/permissions.service'
import { CreateWorkPermissionsDTO } from './dto/permissions.dto'

@Controller('admin/work/permissions', { description: '作品权限' })
export class WorkPermissionsController {
  @Inject()
  permissionsService: WorkPermissionsService

  @Get('/getWorkPermissions', { summary: '获取作品相关权限' })
  async getWorkPermissions(@Body() body: { workId: number }) {
    return await this.permissionsService.findUnique({
      where: { workId: body.workId },
    })
  }

  @Post('/createWorkPermissions', { summary: '创建作品相关权限' })
  @Post('/updateWorkPermissions', { summary: '更新作品相关权限' })
  async createPermissions(@Body() body: CreateWorkPermissionsDTO) {
    return await this.permissionsService.upsert({
      where: { workId: body.workId },
      create: body,
      update: body,
    })
  }
  @Post('/deleteWorkPermissions', { summary: '删除作品相关权限' })
  async deletePermissions(@Body() body: { workId: number }) {
    return await this.permissionsService.delete({
      where: { workId: body.workId },
    })
  }
}
