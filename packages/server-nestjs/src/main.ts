import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from '@/app.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { ClientModule } from '@/modules/client/client.module'

import { setupSwagger } from '@/nestjs/swagger'

declare const module: any

async function bootstrap() {
  // 创建Fastify适配器并配置multipart支持
  const fastifyAdapter = new FastifyAdapter()

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  )

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
