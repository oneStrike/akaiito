import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClientModule } from '@/modules/client/client.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 创建两个子应用，分别用于管理端和用户端
  app.select(AdminModule);
  app.select(ClientModule);
  // 设置路由前缀
  app.setGlobalPrefix('api');

  // 全局配置ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换类型
      whitelist: true, // 过滤掉DTO中未定义的属性
      forbidNonWhitelisted: true, // 当存在非白名单属性时抛出错误
      disableErrorMessages: false, // 在生产环境可设为true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Akaiito')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // @ts-expect-error ignore
  if (module.hot) {
    // @ts-expect-error ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    module.hot.accept();
    // @ts-expect-error ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
