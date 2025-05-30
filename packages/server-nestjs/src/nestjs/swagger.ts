import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication<any>) {
  // 创建并处理客户端文档
  const clientConfig = new DocumentBuilder()
    .setTitle('客户端 API')
    .setDescription('客户端认证与业务接口文档')
    .setVersion('1.0')
    .build()

  const clientDocument = SwaggerModule.createDocument(app, clientConfig)

  // 自动移除管理后台接口
  Object.keys(clientDocument.paths).forEach((path) => {
    if (path.startsWith('/admin')) {
      delete clientDocument.paths[path]
    }
  })
  SwaggerModule.setup('api/client', app, clientDocument)

  // 👇 创建管理后台文档
  const adminConfig = new DocumentBuilder()
    .setTitle('管理后台 API')
    .setDescription('管理后台认证与业务接口文档')
    .setVersion('1.0')
    .build()

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {})
  // 自动移除客户端接口
  Object.keys(adminDocument.paths).forEach((path) => {
    if (path.startsWith('/client')) {
      delete adminDocument.paths[path]
    }
  })
  SwaggerModule.setup('api/admin', app, adminDocument)
}
