import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'; // 确保路径指向 Prisma 生成的客户端目录

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  // ✅ 在构造函数中正确初始化适配器
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL, // 确保 .env 文件中包含正确格式的 PostgreSQL 连接字符串
    });

    // 🚀 通过 super 传递适配器配置
    super({ adapter });
  }

  async onModuleInit() {
    if (this.isConnected) {
      this.logger.warn('Already connected to the database');
      return;
    }

    try {
      // ✅ 使用继承自 PrismaClient 的 $connect 方法
      await this.$connect();
      this.isConnected = true;
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      this.logger.error(
        `Failed to connect to the database: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }

  async onApplicationShutdown() {
    if (this.isConnected) {
      try {
        await this.$disconnect();
        this.isConnected = false;
        this.logger.log('Successfully disconnected from the database');
      } catch (error) {
        this.logger.error(
          `Failed to disconnect from the database: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }
  }
}
