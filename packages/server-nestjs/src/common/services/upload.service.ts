import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { UploadConfig } from '@/config/upload.config'

const pump = promisify(pipeline)

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads')
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
  ]

  private readonly maxFileSize = 5 * 1024 * 1024 // 5MB

  constructor(private configService: ConfigService) {}

  private getUploadConfig(): UploadConfig {
    // 获取 'upload' 命名空间下的配置
    return this.configService.get<UploadConfig>('upload')!
  }

  private ensureUploadDirectory() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true })
    }
  }

  async uploadMultipleFiles(
    data: any,
  ): Promise<Array<{ filename: string; path: string; size: number }>> {
    const files = data.files()
    const results: any[] = []
    const config = this.getUploadConfig()
    console.log(config)
    for await (const file of files) {
      console.log(file.fields.scene.value)
      // 验证文件类型和大小
      if (!this.allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`文件 ${file.filename} 类型不支持`)
      }

      if (file.file.bytesRead > this.maxFileSize) {
        throw new BadRequestException(`文件 ${file.filename} 大小超出限制`)
      }

      const filename = `${uuidv4()}-${file.filename}`
      const filepath = join(this.uploadPath, filename)

      await pump(file.file, createWriteStream(filepath))

      results.push({
        filename,
        path: filepath,
        size: file.file.bytesRead,
      })
    }

    return results
  }
}
