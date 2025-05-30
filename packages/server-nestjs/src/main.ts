import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { ClientModule } from '@/modules/client/client.module'
import { setupSwagger } from '@/nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.select(ClientModule)
  app.select(AdminModule)
  setupSwagger(app)
  await app.listen(3000)
}

bootstrap()
