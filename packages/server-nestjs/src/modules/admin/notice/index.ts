/**
 * 通知模块导出文件
 * 统一导出通知模块的所有公共接口
 */

// 导出DTO
export {
  BatchDeleteNoticeDto,
  CreateNoticeDto,
  NoticeDto,
  QueryNoticeDto,
  ReadNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeStatusDto,
} from './dto/notice.dto'

// 导出常量
export {
  NoticePriorityEnum,
  NoticePriorityMap,
  NoticeStatusEnum,
  NoticeStatusMap,
  NoticeTypeEnum,
  NoticeTypeMap,
  PlatformEnum,
  PlatformMap,
} from './notice.constant'

// 导出控制器
export { NoticeController } from './notice.controller'

// 导出模块
export { NoticeModule } from './notice.module'

// 导出服务
export { NoticeService } from './notice.service'
