import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { CountDto } from '@/common/dto/batch.dto'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import {
  BaseNoticeDto,
  CreateNoticeDto,
  NoticePageResponseDto,
  QueryNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeStatusDto,
} from './dto/notice.dto'
import { ClientNoticeService } from './notice.service'

/**
 * 客户端通知控制器
 * 提供通知相关的API接口
 */
@ApiTags('客户端通知模块')
@Controller('admin/notice')
export class ClientNoticeController {
  constructor(private readonly noticeService: ClientNoticeService) {}

  /**
   * 创建通知
   */
  @Post('/create-notice')
  @ApiDoc({
    summary: '创建通知消息',
    model: IdDto,
  })
  async create(@Body() body: CreateNoticeDto) {
    return this.noticeService.createNotice(body)
  }

  /**
   * 分页查询通知列表
   */
  @Get('/notice-page')
  @ApiPageDoc({
    summary: '分页查询通知列表',
    model: NoticePageResponseDto,
  })
  async getPage(@Query() query: QueryNoticeDto) {
    return this.noticeService.findNoticePage(query)
  }

  /**
   * 根据ID查询通知详情
   */
  @Get('notice-detail')
  @ApiDoc({
    summary: '根据ID查询通知详情',
    model: BaseNoticeDto,
  })
  async findOne(@Query() query: IdDto) {
    return this.noticeService.findByUnique({ where: query })
  }

  /**
   * 更新通知
   */
  @Post('update-notice')
  @ApiDoc({
    summary: '更新通知消息',
    model: IdDto,
  })
  async update(@Body() body: UpdateNoticeDto) {
    return this.noticeService.updateNotice(body)
  }

  /**
   * 更新通知状态
   */
  @Post('batch-update-notice-status')
  @ApiDoc({
    summary: '批量更新通知状态',
    model: CountDto,
  })
  async updateStatus(@Body() body: UpdateNoticeStatusDto) {
    return this.noticeService.updateMany({
      where: { id: { in: body.ids } },
      data: { isPublished: body.isPublished },
    })
  }

  /**
   * 批量删除通知
   */
  @Post('batch-delete-notice')
  @ApiDoc({
    summary: '批量删除通知',
    model: CountDto,
  })
  async batchRemove(@Body() body: IdsDto) {
    return this.noticeService.softDeleteMany({ id: { in: body.ids } })
  }
}
