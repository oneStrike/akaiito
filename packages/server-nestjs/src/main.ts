import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClientModule } from '@/modules/client/client.module'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { AdminModule } from './modules/admin/admin.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 创建两个子应用，分别用于管理端和用户端
  app.select(AdminModule)
  app.select(ClientModule)
  // 设置路由前缀
  app.setGlobalPrefix('api')

  app.useGlobalFilters(new HttpExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('Akaiito')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  // @ts-expect-error ignore
  if (module.hot) {
    // @ts-expect-error ignore
    module.hot.accept()
    // @ts-expect-error ignore
    module.hot.dispose(() => app.close())
  }
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
