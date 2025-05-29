import { createKeyv } from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TransformInterceptor } from '@/common/interceptors/transform-interceptor'
import { AdminModule } from '@/modules/admin/admin.module'
import { ClientModule } from '@/modules/client/client.module'
import { GlobalModule } from './global/global.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，其他模块可直接使用
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'], // 指定环境变量文件路径
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => {
        const host = cfg.get<string>('REDIS_HOST') || '127.0.0.1'
        const port = cfg.get<number>('REDIS_PORT') || 6379
        const database = cfg.get<number>('REDIS_DB') || 0
        const redisOptions = {
          url: `redis://172.26.219.182:6379`, // use 'rediss' for TLS
        }
        return {
          store: createKeyv(redisOptions),
        }
      },
      inject: [ConfigService],
    }),
    GlobalModule,
    AdminModule,
    ClientModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // 将请求数据转换为目标类型（如从字符串转换为数字等）
        // 明确启用转换选项
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true, // 忽略 DTO 中没有定义的属性
        exceptionFactory: (errors) => {
          // 自定义错误处理逻辑
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
  ],
})
export class AppModule {}
