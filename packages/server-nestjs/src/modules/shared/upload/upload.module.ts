import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { createMulterConfig, UploadConfig } from '@/config/upload.config'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

/**
 * 文件上传模块
 */
@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uploadConfig = configService.get<UploadConfig>('upload')!
        return createMulterConfig({
          ...uploadConfig,
          allowedMimeTypes: uploadConfig.allowedMimeTypes.all,
          allowedExtensions: uploadConfig.allowedExtensions.all,
        })
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService], // 导出服务供其他模块使用
})
export class UploadModule {}
