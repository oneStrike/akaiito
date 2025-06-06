import multipart from '@fastify/multipart'
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

  // 注册multipart插件以支持文件上传
  await fastifyAdapter.register(multipart, {
    limits: {
      fieldNameSize: 100, // 字段名最大长度
      fieldSize: 1024 * 1024, // 字段值最大大小 1MB
      fields: 20, // 最大字段数
      fileSize: 100 * 1024 * 1024, // 文件最大大小 100MB
      files: 50, // 最大文件数
      headerPairs: 2000, // 最大header对数
    },
    attachFieldsToBody: true, // 将字段附加到body
    throwFileSizeLimit: true, // 超出大小限制时抛出错误
    addToBody: true, // 添加到请求体
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
