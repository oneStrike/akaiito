import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from '@/modules/admin/admin.module';
import { ClientModule } from '@/modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局模块，其他模块可直接使用
      envFilePath: '.env', // 指定环境变量文件路径
    }),
    AdminModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
