import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

/**
 * 文件上传日志拦截器
 * 记录文件上传的详细信息和性能数据
 */
@Injectable()
export class UploadLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(UploadLoggingInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const { method, url, ip } = request
    const userAgent = request.get('User-Agent') || ''
    const startTime = Date.now()

    // 获取上传文件信息
    const files = this.extractFileInfo(request)
    const uploaderId = request.query.uploaderId as string

    // 记录上传开始日志
    this.logger.log(`文件上传开始: ${method} ${url}`, {
      ip,
      userAgent,
      uploaderId,
      fileCount: files.length,
      files: files.map((f) => ({
        originalName: f.originalname,
        size: f.size,
        mimeType: f.mimetype,
      })),
    })

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - startTime

        // 记录成功日志
        this.logger.log(`文件上传成功: ${method} ${url} - ${duration}ms`, {
          ip,
          userAgent,
          uploaderId,
          duration,
          fileCount: files.length,
          totalSize: files.reduce((sum, f) => sum + f.size, 0),
          response: this.sanitizeResponse(response),
        })

        // 记录性能指标
        this.logPerformanceMetrics(files, duration)
      }),
      catchError((error) => {
        const duration = Date.now() - startTime

        // 记录错误日志
        this.logger.error(`文件上传失败: ${method} ${url} - ${duration}ms`, {
          ip,
          userAgent,
          uploaderId,
          duration,
          fileCount: files.length,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          files: files.map((f) => ({
            originalName: f.originalname,
            size: f.size,
            mimeType: f.mimetype,
          })),
        })

        throw error
      }),
    )
  }

  /**
   * 提取文件信息
   */
  private extractFileInfo(request: Request): Express.Multer.File[] {
    const files: Express.Multer.File[] = []

    // 单文件上传
    if (request.file) {
      files.push(request.file)
    }

    // 多文件上传
    if (request.files) {
      if (Array.isArray(request.files)) {
        files.push(...request.files)
      } else {
        // 处理字段名映射的文件对象
        Object.values(request.files).forEach((fileArray) => {
          if (Array.isArray(fileArray)) {
            files.push(...fileArray)
          } else {
            files.push(fileArray)
          }
        })
      }
    }

    return files
  }

  /**
   * 清理响应数据（移除敏感信息）
   */
  private sanitizeResponse(response: any): any {
    if (!response) return null

    // 如果是单文件响应
    if (response.id && response.fileName) {
      return {
        id: response.id,
        originalName: response.originalName,
        size: response.size,
        mimeType: response.mimeType,
      }
    }

    // 如果是多文件响应
    if (response.successFiles && response.failedFiles) {
      return {
        totalFiles: response.totalFiles,
        successCount: response.successCount,
        failedCount: response.failedCount,
        successFiles: response.successFiles.map((f: any) => ({
          id: f.id,
          originalName: f.originalName,
          size: f.size,
          mimeType: f.mimeType,
        })),
        failedFiles: response.failedFiles,
      }
    }

    return response
  }

  /**
   * 记录性能指标
   */
  private logPerformanceMetrics(
    files: Express.Multer.File[],
    duration: number,
  ): void {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0)
    const avgFileSize = files.length > 0 ? totalSize / files.length : 0
    const uploadSpeed =
      totalSize > 0 ? totalSize / 1024 / 1024 / (duration / 1000) : 0 // MB/s

    this.logger.log('文件上传性能指标', {
      fileCount: files.length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      avgFileSize: `${(avgFileSize / 1024 / 1024).toFixed(2)}MB`,
      duration: `${duration}ms`,
      uploadSpeed: `${uploadSpeed.toFixed(2)}MB/s`,
      fileTypes: [...new Set(files.map((f) => f.mimetype))],
    })

    // 性能警告
    if (duration > 30000) {
      // 超过30秒
      this.logger.warn(`文件上传耗时过长: ${duration}ms`)
    }

    if (uploadSpeed < 0.1) {
      // 小于0.1MB/s
      this.logger.warn(`文件上传速度过慢: ${uploadSpeed.toFixed(2)}MB/s`)
    }
  }
}
