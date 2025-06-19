/**
 * 通知模块导出文件
 * 统一导出通知模块的所有公共接口
 */

// 导出DTO
export {
  CreateNoticeDto,
  NoticeDto,
  QueryNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeStatusDto,
} from './dto/notice.dto'

// 导出控制器
export { ClientNoticeController } from './notice.controller'

// 导出模块
export { ClientNoticeModule } from './notice.module'

// 导出服务
export { ClientNoticeService } from './notice.service'
