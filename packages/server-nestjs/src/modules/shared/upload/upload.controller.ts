import { createReadStream, existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import {
  FileDeleteDto,
  FileInfoDto,
  FileUploadResponseDto,
  MultipleFileUploadResponseDto,
  UploadConfigResponseDto,
} from '@/common/dto/upload.dto'
import { createMulterConfig, UploadConfig } from '@/config/upload.config'
import { UploadService } from './upload.service'

/**
 * 文件上传控制器
 */
@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name)
  private readonly uploadConfig: UploadConfig

  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {
    this.uploadConfig = this.configService.get<UploadConfig>('upload')!
  }

  /**
   * 单文件上传
   */
  @Post('single')
  @ApiOperation({ summary: '单文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'uploaderId', required: false, description: '上传者ID' })
  @ApiQuery({ name: 'scene', required: false, description: '上传场景，如果不传默认为shared' })
  @ApiResponse({
    status: 200,
    description: '上传成功',
    type: FileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: '上传失败' })
  @UseInterceptors(
    FileInterceptor(
      'file',
      createMulterConfig({
        maxFileSize: 10 * 1024 * 1024, // 临时配置，实际从配置服务获取
        maxFiles: 1,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
        uploadDir: join(process.cwd(), 'uploads'),
        preserveOriginalName: false,
      }),
    ),
  )
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploaderId') uploaderId?: string,
    @Query('scene') scene?: string,
  ): Promise<FileUploadResponseDto> {
    if (!file) {
      throw new BadRequestException('请选择要上传的文件')
    }

    this.logger.log(`接收到单文件上传请求: ${file.originalname}, 场景: ${scene || 'shared'}`)
    return await this.uploadService.uploadSingleFile(file, uploaderId, scene)
  }

  /**
   * 多文件上传
   */
  @Post('multiple')
  @ApiOperation({ summary: '多文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'uploaderId', required: false, description: '上传者ID' })
  @ApiQuery({ name: 'scene', required: false, description: '上传场景，如果不传默认为shared' })
  @ApiResponse({
    status: 200,
    description: '上传完成',
    type: MultipleFileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: '上传失败' })
  @UseInterceptors(
    FilesInterceptor(
      'files',
      5,
      createMulterConfig({
        maxFileSize: 10 * 1024 * 1024,
        maxFiles: 5,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
        uploadDir: join(process.cwd(), 'uploads'),
        preserveOriginalName: false,
      }),
    ),
  )
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('uploaderId') uploaderId?: string,
    @Query('scene') scene?: string,
  ): Promise<MultipleFileUploadResponseDto> {
    if (!files || files.length === 0) {
      throw new BadRequestException('请选择要上传的文件')
    }

    this.logger.log(`接收到多文件上传请求，文件数量: ${files.length}, 场景: ${scene || 'shared'}`)
    return await this.uploadService.uploadMultipleFiles(files, uploaderId, scene)
  }

  /**
   * 获取文件信息
   */
  @Get('info/:fileId')
  @ApiOperation({ summary: '获取文件信息' })
  @ApiParam({ name: 'fileId', description: '文件ID' })
  @ApiResponse({ status: 200, description: '获取成功', type: FileInfoDto })
  @ApiResponse({ status: 404, description: '文件不存在' })
  async getFileInfo(@Param('fileId') fileId: string): Promise<FileInfoDto> {
    const fileInfo = await this.uploadService.getFileInfo(fileId)
    if (!fileInfo) {
      throw new NotFoundException('文件不存在')
    }
    return fileInfo
  }

  /**
   * 下载文件
   */
  @Get('file/:fileId')
  @ApiOperation({ summary: '下载文件' })
  @ApiParam({ name: 'fileId', description: '文件ID' })
  @ApiResponse({ status: 200, description: '下载成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  async downloadFile(
    @Param('fileId') fileId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const fileInfo = await this.uploadService.getFileInfo(fileId)
    if (!fileInfo) {
      throw new NotFoundException('文件不存在')
    }

    // 构建文件路径
    const filePath = join(
      this.uploadConfig.uploadDir,
      `${fileId}_${Date.now()}${fileInfo.originalName.substring(fileInfo.originalName.lastIndexOf('.'))}`,
    ) // 简化路径构建

    // 实际应该从存储的文件信息中获取正确的文件路径
    // 这里需要根据实际的文件存储逻辑调整
    const actualFilePath = join(
      this.uploadConfig.uploadDir,
      fileInfo.originalName,
    ) // 临时简化

    if (!existsSync(actualFilePath)) {
      throw new NotFoundException('文件不存在')
    }

    const file = createReadStream(actualFilePath)

    // 设置响应头
    res.set({
      'Content-Type': fileInfo.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileInfo.originalName)}"`,
    })

    this.logger.log(`文件下载: ${fileInfo.originalName}`)
    return new StreamableFile(file)
  }

  /**
   * 预览文件（仅支持图片和PDF）
   */
  @Get('preview/:fileId')
  @ApiOperation({ summary: '预览文件' })
  @ApiParam({ name: 'fileId', description: '文件ID' })
  @ApiResponse({ status: 200, description: '预览成功' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  async previewFile(
    @Param('fileId') fileId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const fileInfo = await this.uploadService.getFileInfo(fileId)
    if (!fileInfo) {
      throw new NotFoundException('文件不存在')
    }

    // 检查文件类型是否支持预览
    const previewableMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
    ]

    if (!previewableMimeTypes.includes(fileInfo.mimeType)) {
      throw new BadRequestException('该文件类型不支持预览')
    }

    const filePath = join(this.uploadConfig.uploadDir, fileInfo.originalName) // 临时简化

    if (!existsSync(filePath)) {
      throw new NotFoundException('文件不存在')
    }

    const file = createReadStream(filePath)

    // 设置响应头
    res.set({
      'Content-Type': fileInfo.mimeType,
      'Content-Disposition': 'inline',
    })

    this.logger.log(`文件预览: ${fileInfo.originalName}`)
    return new StreamableFile(file)
  }

  /**
   * 删除文件
   */
  @Delete('files')
  @ApiOperation({ summary: '批量删除文件' })
  @ApiResponse({ status: 200, description: '删除完成' })
  async deleteFiles(@Body() deleteDto: FileDeleteDto): Promise<{
    message: string
    deletedCount: number
    errors: string[]
  }> {
    this.logger.log(`接收到文件删除请求，文件数量: ${deleteDto.fileIds.length}`)

    const result = await this.uploadService.deleteFiles(deleteDto.fileIds)

    return {
      message: `删除完成，成功: ${result.deletedCount}, 失败: ${result.errors.length}`,
      deletedCount: result.deletedCount,
      errors: result.errors,
    }
  }

  /**
   * 获取上传配置
   */
  @Get('config')
  @ApiOperation({ summary: '获取上传配置' })
  @ApiResponse({
    status: 200,
    description: '获取成功',
    type: UploadConfigResponseDto,
  })
  getUploadConfig(): UploadConfigResponseDto {
    return this.uploadService.getUploadConfig()
  }

  /**
   * 健康检查
   */
  @Get('health')
  @ApiOperation({ summary: '上传服务健康检查' })
  @ApiResponse({ status: 200, description: '服务正常' })
  healthCheck(): { status: string; timestamp: string; config: any } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      config: {
        maxFileSize: this.uploadConfig.maxFileSize,
        maxFiles: this.uploadConfig.maxFiles,
        uploadDir: this.uploadConfig.uploadDir,
      },
    }
  }
}
