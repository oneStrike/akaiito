import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import {
  FileFastifyInterceptor,
  FilesFastifyInterceptor,
} from 'fastify-file-interceptor'
import {
  UploadFileDto,
  UploadMultipleFilesDto,
  UploadMultipleFilesResponseDto,
  UploadSingleFileResponseDto,
} from './dto/upload.dto'
import uploadConfig from './upload.config'
import { UploadService } from './upload.service'

/**
 * 文件上传控制器
 * 基于 Fastify 优化，支持流传输和高性能文件处理
 */
@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @Inject(uploadConfig.KEY)
    private readonly config: ConfigType<typeof uploadConfig>,
  ) {}

  /**
   * 单文件上传
   */
  @Post('single')
  @UseInterceptors(FileFastifyInterceptor('file'))
  @ApiOperation({ summary: '单文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单文件上传',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: '上传成功',
    type: UploadSingleFileResponseDto,
  })
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadFileDto,
    @Req() request: FastifyRequest,
  ): Promise<UploadSingleFileResponseDto> {
    if (!file) {
      throw new HttpException('请选择要上传的文件', HttpStatus.BAD_REQUEST)
    }

    // 获取客户端信息
    const clientIp = request.ip || 'unknown'
    const userAgent = request.headers['user-agent'] || 'unknown'

    return await this.uploadService.uploadSingleFile(
      file,
      uploadDto,
      userAgent,
      clientIp,
    )
  }

  /**
   * 多文件上传
   */
  @Post('multiple')
  @UseInterceptors(FilesFastifyInterceptor('files'))
  @ApiOperation({ summary: '多文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: UploadMultipleFilesDto,
  })
  @ApiResponse({
    status: 200,
    description: '上传成功',
    type: UploadMultipleFilesResponseDto,
  })
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() uploadDto: UploadMultipleFilesDto,
    @Req() request: FastifyRequest,
  ): Promise<UploadMultipleFilesResponseDto> {
    if (!files || files.length === 0) {
      throw new HttpException('请选择要上传的文件', HttpStatus.BAD_REQUEST)
    }

    // 获取客户端信息
    const clientIp = request.ip || 'unknown'
    const userAgent = request.headers['user-agent'] || 'unknown'

    return await this.uploadService.uploadMultipleFiles(
      files,
      uploadDto,
      userAgent,
      clientIp,
    )
  }

  /**
   * 获取上传统计信息
   */
  @Get('stats')
  @ApiOperation({
    summary: '获取上传统计',
    description: '获取文件上传的存储信息',
  })
  @ApiResponse({
    status: 200,
    description: '统计信息获取成功',
    schema: {
      type: 'object',
      properties: {
        storage: {
          type: 'object',
          description: '存储统计',
        },
      },
    },
  })
  async getUploadStats() {
    return await this.uploadService.getUploadStats()
  }

  /**
   * 获取存储统计
   */
  @Get('storage/stats')
  @ApiOperation({
    summary: '获取存储统计',
    description: '获取文件存储的统计信息',
  })
  @ApiResponse({
    status: 200,
    description: '存储统计获取成功',
  })
  async getStorageStats() {
    return await this.uploadService.getStorageStats()
  }

  /**
   * 清理过期文件
   */
  @Post('cleanup')
  @ApiOperation({
    summary: '清理过期文件',
    description: '清理指定天数之前的文件',
  })
  @ApiQuery({
    name: 'maxAge',
    required: false,
    description: '文件最大保留天数',
    example: 30,
  })
  @ApiResponse({
    status: 200,
    description: '清理任务已启动',
  })
  async cleanupExpiredFiles(@Query('maxAge') maxAge?: number) {
    const maxAgeMs = maxAge ? maxAge * 24 * 60 * 60 * 1000 : undefined
    await this.uploadService.cleanupExpiredFiles(maxAgeMs)
    return {
      success: true,
      message: '清理任务已启动',
      maxAge: maxAge || 30,
    }
  }

  /**
   * 健康检查
   */
  @Get('health')
  @ApiOperation({
    summary: '健康检查',
    description: '检查上传服务的健康状态',
  })
  @ApiResponse({
    status: 200,
    description: '服务健康',
  })
  healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'upload-service',
      version: '1.0.0',
      config: {
        maxFileSize: this.config.maxFileSize,
        maxFiles: this.config.maxFiles,
        enableStreaming: this.config.enableStreaming,
      },
    }
  }

  /**
   * 获取客户端 IP 地址
   */
  private getClientIp(request: FastifyRequest): string {
    // 优先从代理头获取真实 IP
    const forwarded = request.headers['x-forwarded-for'] as string
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }

    const realIp = request.headers['x-real-ip'] as string
    if (realIp) {
      return realIp
    }

    // 从连接信息获取
    return request.ip || request.socket?.remoteAddress || 'unknown'
  }
}
