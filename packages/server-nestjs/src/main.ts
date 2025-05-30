import { NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from '@/app.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { ClientModule } from '@/modules/client/client.module'
import { setupSwagger } from '@/nestjs/swagger'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 使用Winston作为全局日志记录器
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.select(AdminModule)
  app.select(ClientModule)
  setupSwagger(app)

  // 记录应用启动日志
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  logger.log('应用程序启动中...', 'Bootstrap')

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  logger.log('应用程序已启动，监听端口: 3000', 'Bootstrap')
  logger.log(`环境: ${process.env.NODE_ENV || 'development'}`, 'Bootstrap')
}

bootstrap().catch((error) => {
  console.error('应用程序启动失败:', error)
  process.exit(1)
})
