import { join } from 'node:path'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { ConfigService } from '@nestjs/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { UploadConfig } from '@/config/upload.config'

export async function setupMultipart(
  fastifyAdapter: FastifyAdapter,
  app: NestFastifyApplication,
) {
  const uploadConfig = app.get(ConfigService).get<UploadConfig>('upload')!

  // 注册静态文件服务
  await fastifyAdapter.register(fastifyStatic, {
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
  })

  // 注册multipart插件
  await fastifyAdapter.register(fastifyMultipart, {
    limits: {
      fieldNameSize: 100, // 字段名称最大长度
      fieldSize: 100 * 1024, // 字段值最大长度 (100KB)
      fields: 10, // 最大字段数量
      fileSize: uploadConfig.maxFileSize * 100, // 此处不做限制，使用uploadService做限制
      files: uploadConfig.maxFiles, // 最大文件数量
      parts: 1000, // 最大part数量
    },
  })
}
