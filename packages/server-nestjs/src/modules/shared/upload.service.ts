import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'
import { BadRequestException, Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

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

  constructor() {
    this.ensureUploadDirectory()
  }

  private ensureUploadDirectory() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true })
    }
  }

  async uploadSingleFile(
    data: any,
  ): Promise<{ filename: string; path: string; size: number }> {
    const file = await data.file()

    // 验证文件类型
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('不支持的文件类型')
    }

    // 验证文件大小
    if (file.file.bytesRead > this.maxFileSize) {
      throw new BadRequestException('文件大小超出限制')
    }

    const filename = `${uuidv4()}-${file.filename}`
    const filepath = join(this.uploadPath, filename)

    await pump(file.file, createWriteStream(filepath))

    return {
      filename,
      path: filepath,
      size: file.file.bytesRead,
    }
  }

  async uploadMultipleFiles(
    data: any,
  ): Promise<Array<{ filename: string; path: string; size: number }>> {
    const files = data.files()
    const results = []

    for await (const file of files) {
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
