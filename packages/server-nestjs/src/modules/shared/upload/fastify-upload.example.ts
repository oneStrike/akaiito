/**
 * Fastify 文件上传示例
 * 展示如何在NestJS + Fastify环境下正确处理文件上传
 */

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { getDynamicUploadConfig } from './fastify-upload.config'

@Controller('upload-example')
export class FastifyUploadExampleController {
  /**
   * 单文件上传示例
   * 使用 @nestjs/platform-fastify 的 FileInterceptor
   */
  @Post('single')
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log('上传的文件:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer ? '存在' : '不存在',
    })

    console.log('请求体:', body)

    return {
      success: true,
      message: '文件上传成功',
      file: {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    }
  }

  /**
   * 多文件上传示例
   * 使用 @nestjs/platform-fastify 的 FilesInterceptor
   */
  @Post('multiple')
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    console.log('上传的文件数量:', files.length)

    files.forEach((file, index) => {
      console.log(`文件 ${index + 1}:`, {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer ? '存在' : '不存在',
      })
    })

    console.log('请求体:', body)

    return {
      success: true,
      message: `成功上传 ${files.length} 个文件`,
      files: files.map((file) => ({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      })),
    }
  }

  /**
   * 原生 Fastify multipart 处理示例
   * 直接使用 FastifyRequest 处理 multipart 数据
   */
  @Post('native')
  async uploadNative(request: FastifyRequest) {
    try {
      // 检查是否为 multipart 请求
      if (!request.isMultipart()) {
        throw new Error('请求必须是 multipart/form-data 格式')
      }

      const parts = request.parts()
      const files: any[] = []
      const fields: Record<string, any> = {}

      for await (const part of parts) {
        if (part.type === 'file') {
          // 处理文件
          const buffer = await part.toBuffer()
          files.push({
            fieldname: part.fieldname,
            originalname: part.filename,
            mimetype: part.mimetype,
            size: buffer.length,
            buffer,
          })
        } else {
          // 处理普通字段
          fields[part.fieldname] = part.value
        }
      }

      return {
        success: true,
        message: '原生 Fastify multipart 处理成功',
        files,
        fields,
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }
}

/**
 * 使用说明:
 *
 * 1. 确保在 main.ts 中正确注册了 @fastify/multipart 插件
 * 2. 使用 @nestjs/platform-fastify 的 FileInterceptor 和 FilesInterceptor
 * 3. 文件数据会存储在内存中 (file.buffer)
 * 4. 可以通过 getDynamicUploadConfig 自定义上传限制
 * 5. 支持原生 Fastify multipart API 进行更精细的控制
 *
 * 前端上传示例:
 *
 * ```javascript
 * const formData = new FormData()
 * formData.append('file', fileInput.files[0])
 * formData.append('description', '文件描述')
 *
 * fetch('/api/upload/single', {
 *   method: 'POST',
 *   body: formData
 * })
 * ```
 */
