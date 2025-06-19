import { Module } from '@nestjs/common'
import { ClientNoticeController } from './notice.controller'
import { ClientNoticeService } from './notice.service'

/**
 * 客户端通知模块
 * 提供通知相关的功能模块
 */
@Module({
  controllers: [ClientNoticeController],
  providers: [ClientNoticeService],
  exports: [ClientNoticeService], // 导出服务供其他模块使用
})
export class ClientNoticeModule {}
