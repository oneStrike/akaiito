import { CacheModule } from '@nestjs/cache-manager'
import { BadRequestException, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { TransformInterceptor } from '@/common/interceptors/transform-interceptor'
import { AdminModule } from '@/modules/admin/admin.module'
import { AdminJwtAuthGuard } from '@/modules/admin/auth/admin-jwt-auth.guard'
import { ClientJwtAuthGuard } from '@/modules/client/auth/client-jwt-auth.guard'
import { ClientModule } from '@/modules/client/client.module'
import { GlobalModule } from './global/global.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，其他模块可直接使用
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'], // 指定环境变量文件路径
    }),
    CacheModule.register({
      isGlobal: true,
      namespace: 'Akaiito',
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
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
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
      useClass: AdminJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ClientJwtAuthGuard,
    },
  ],
})
export class AppModule {}
