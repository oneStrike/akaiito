import type {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { join } from 'node:path'
import process from 'node:process'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { ConfigService } from '@nestjs/config'
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
    throwFileSizeLimit: true, // 启用文件大小限制异常抛出
    limits: {
      fieldNameSize: 100, // 字段名称最大长度
      fieldSize: 100 * 1024, // 字段值最大长度 (100KB)
      fields: 10, // 最大字段数量
      files: uploadConfig.maxFiles, // 最大文件数量
      fileSize: uploadConfig.maxFileSize, // 全局文件大小限制
      parts: 1000, // 最大part数量
    },
  })
}
