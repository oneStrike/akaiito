import * as process from 'node:process'
import { CacheModule } from '@nestjs/cache-manager'
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { LoggerModule } from '@/common/module/logger/logger.module'
import { MaxMindModule } from '@/common/module/maxmind/maxmind.module'
import maxmindConfig from '@/config/maxmind.config'
import uploadConfig from '@/config/upload.config'
import { AdminModule } from '@/modules/admin/admin.module'
import { RequestLogModule } from '@/modules/admin/request-log/request-log.module'
import { ClientModule } from '@/modules/client/client.module'
import { GuardsModule } from './common/guards/guards.module'
import { SmartJwtAuthGuard } from './common/guards/smart-jwt-auth.guard'
import { GlobalModule } from './global/global.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，其他模块可直接使用
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`], // 指定环境变量文件路径
      load: [uploadConfig, maxmindConfig], // 加载上传配置和MaxMind配置
      cache: true, // 缓存配置
    }),
    CacheModule.register({
      isGlobal: true,
      namespace: 'Akaiito',
    }),
    LoggerModule, // 添加日志模块
    GlobalModule,
    GuardsModule,
    MaxMindModule, // 导入MaxMindModule以提供MaxMindGeoIPService
    AdminModule,
    ClientModule,
    RequestLogModule, // 导入RequestLogModule以提供RequestLogService
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
          return new BadRequestException(
            errors.map((error) => `${error.property}数据格式校验失败`),
          )
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },

    {
      provide: APP_GUARD,
      useClass: SmartJwtAuthGuard,
    },
  ],
})
export class AppModule {}
