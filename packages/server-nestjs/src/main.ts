import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { ClientModule } from '@/modules/client/client.module'
import { setupSwagger } from '@/nestjs/swagger'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.select(AdminModule)
  app.select(ClientModule)

  app.setGlobalPrefix('api')

  setupSwagger(app)

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap().catch((error) => {
  console.error('应用程序启动失败:', error)
  process.exit(1)
})
