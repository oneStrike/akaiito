import { join } from 'node:path'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
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

  // 注册multipart插件
  await fastifyAdapter.register(fastifyMultipart, {})

  // 注册静态文件服务
  await fastifyAdapter.register(fastifyStatic, {
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  })

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
