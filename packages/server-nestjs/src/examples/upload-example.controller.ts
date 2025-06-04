import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UploadedFiles,
  Query,
  Body,
  Param,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  SingleFileUpload,
  MultipleFileUpload,
  ImageUpload,
  DocumentUpload,
  AvatarUpload,
} from '@/common/decorators/upload.decorator'
import { UploadService } from '@/modules/shared/upload/upload.service'
import {
  FileUploadResponseDto,
  MultipleFileUploadResponseDto,
  FileDeleteDto,
} from '@/common/dto/upload.dto'

/**
 * 文件上传示例控制器
 * 展示如何在实际项目中使用文件上传功能
 */
@ApiTags('文件上传示例')
@Controller('examples/upload')
export class UploadExampleController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 基础单文件上传示例
   */
  @Post('basic-single')
  @ApiOperation({ summary: '基础单文件上传示例' })
  @ApiResponse({ status: 200, description: '上传成功', type: FileUploadResponseDto })
  @SingleFileUpload()
  async basicSingleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploaderId') uploaderId?: string,
    @Query('scene') scene?: string,
  ): Promise<FileUploadResponseDto> {
    return await this.uploadService.uploadSingleFile(file, uploaderId, scene)
  }

  /**
   * 基础多文件上传示例
   */
  @Post('basic-multiple')
  @ApiOperation({ summary: '基础多文件上传示例' })
  @ApiResponse({ status: 200, description: '上传完成', type: MultipleFileUploadResponseDto })
  @MultipleFileUpload()
  async basicMultipleUpload(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('uploaderId') uploaderId?: string,
    @Query('scene') scene?: string,
  ): Promise<MultipleFileUploadResponseDto> {
    return await this.uploadService.uploadMultipleFiles(files, uploaderId, scene)
  }

  /**
   * 图片上传示例
   */
  @Post('image')
  @ApiOperation({ summary: '图片上传示例（仅支持图片格式）' })
  @ApiResponse({ status: 200, description: '图片上传成功', type: FileUploadResponseDto })
  @ImageUpload()
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploaderId') uploaderId?: string,
  ): Promise<{
    message: string
    fileInfo: FileUploadResponseDto
    imageMetadata: {
      dimensions?: string
      format: string
      size: string
    }
  }> {
    const fileInfo = await this.uploadService.uploadSingleFile(file, uploaderId, 'image')

    // 可以在这里添加图片处理逻辑，如获取图片尺寸、生成缩略图等
    const imageMetadata = {
      format: file.mimetype,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      // dimensions: '800x600', // 可以使用 sharp 库获取实际尺寸
    }

    return {
      message: '图片上传成功',
      fileInfo,
      imageMetadata,
    }
  }

  /**
   * 文档上传示例
   */
  @Post('document')
  @ApiOperation({ summary: '文档上传示例（支持PDF、Word、Excel等）' })
  @ApiResponse({ status: 200, description: '文档上传成功', type: FileUploadResponseDto })
  @DocumentUpload()
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploaderId') uploaderId?: string,
    @Query('category') category?: string,
  ): Promise<{
    message: string
    fileInfo: FileUploadResponseDto
    documentInfo: {
      category: string
      type: string
      size: string
      pages?: number
    }
  }> {
    const fileInfo = await this.uploadService.uploadSingleFile(file, uploaderId, 'document')

    // 可以在这里添加文档处理逻辑，如提取文档信息、生成预览等
    const documentInfo = {
      category: category || '未分类',
      type: this.getDocumentType(file.mimetype),
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      // pages: 10, // 可以使用 pdf-parse 等库获取页数
    }

    return {
      message: '文档上传成功',
      fileInfo,
      documentInfo,
    }
  }

  /**
   * 头像上传示例
   */
  @Post('avatar')
  @ApiOperation({ summary: '用户头像上传示例' })
  @ApiResponse({ status: 200, description: '头像上传成功' })
  @AvatarUpload()
  async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Query('userId') userId: string,
  ): Promise<{
    message: string
    avatarUrl: string
    thumbnailUrl: string
  }> {
    const fileInfo = await this.uploadService.uploadSingleFile(avatar, userId, 'avatar')

    // 在实际项目中，这里可以：
    // 1. 生成不同尺寸的头像
    // 2. 更新用户头像信息到数据库
    // 3. 删除旧头像文件

    return {
      message: '头像上传成功',
      avatarUrl: fileInfo.url,
      thumbnailUrl: `${fileInfo.url}?size=thumbnail`, // 示例缩略图URL
    }
  }

  /**
   * 自定义配置上传示例
   */
  @Post('custom')
  @ApiOperation({ summary: '自定义配置上传示例' })
  @SingleFileUpload({
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png'],
    allowedExtensions: ['.jpg', '.jpeg', '.png'],
    enableLogging: true,
  })
  async customUpload(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploaderId') uploaderId?: string,
  ): Promise<{
    message: string
    fileInfo: FileUploadResponseDto
    customProcessing: {
      processed: boolean
      processingTime: number
    }
  }> {
    const startTime = Date.now()
    const fileInfo = await this.uploadService.uploadSingleFile(file, uploaderId, 'custom')

    // 自定义处理逻辑
    await this.customFileProcessing(fileInfo)

    const processingTime = Date.now() - startTime

    return {
      message: '自定义上传处理完成',
      fileInfo,
      customProcessing: {
        processed: true,
        processingTime,
      },
    }
  }

  /**
   * 批量上传示例
   */
  @Post('batch')
  @ApiOperation({ summary: '批量文件上传示例' })
  @MultipleFileUpload({ maxFiles: 10 })
  async batchUpload(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('uploaderId') uploaderId?: string,
    @Query('batchName') batchName?: string,
  ): Promise<{
    message: string
    batchInfo: {
      batchId: string
      batchName: string
      totalFiles: number
      totalSize: string
    }
    uploadResult: MultipleFileUploadResponseDto
  }> {
    const uploadResult = await this.uploadService.uploadMultipleFiles(files, uploaderId, 'batch')

    const totalSize = files.reduce((sum, file) => sum + file.size, 0)
    const batchId = `batch_${Date.now()}`

    // 在实际项目中，可以将批次信息保存到数据库
    const batchInfo = {
      batchId,
      batchName: batchName || `批次_${new Date().toLocaleDateString()}`,
      totalFiles: files.length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
    }

    return {
      message: '批量上传完成',
      batchInfo,
      uploadResult,
    }
  }

  /**
   * 获取上传统计信息
   */
  @Get('stats')
  @ApiOperation({ summary: '获取上传统计信息' })
  async getUploadStats(@Query('uploaderId') uploaderId?: string): Promise<{
    totalFiles: number
    totalSize: string
    fileTypes: Record<string, number>
    recentUploads: number
  }> {
    // 这里应该从数据库获取实际统计信息
    // 目前返回模拟数据
    return {
      totalFiles: 156,
      totalSize: '2.3GB',
      fileTypes: {
        'image/jpeg': 89,
        'image/png': 34,
        'application/pdf': 23,
        'text/plain': 10,
      },
      recentUploads: 12, // 最近24小时
    }
  }

  /**
   * 清理临时文件
   */
  @Post('cleanup')
  @ApiOperation({ summary: '清理临时文件示例' })
  async cleanupTempFiles(): Promise<{
    message: string
    cleanedFiles: number
    freedSpace: string
  }> {
    // 在实际项目中，这里应该实现清理逻辑
    // 例如删除超过一定时间的临时文件

    return {
      message: '临时文件清理完成',
      cleanedFiles: 23,
      freedSpace: '156MB',
    }
  }

  /**
   * 获取文档类型
   */
  private getDocumentType(mimeType: string): string {
    const typeMap: Record<string, string> = {
      'application/pdf': 'PDF文档',
      'application/msword': 'Word文档',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word文档',
      'application/vnd.ms-excel': 'Excel表格',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel表格',
      'text/plain': '文本文件',
    }

    return typeMap[mimeType] || '未知文档类型'
  }

  /**
   * 自定义文件处理
   */
  private async customFileProcessing(fileInfo: FileUploadResponseDto): Promise<void> {
    // 模拟文件处理过程
    await new Promise(resolve => setTimeout(resolve, 100))

    // 在实际项目中，这里可以：
    // 1. 图片压缩和格式转换
    // 2. 文档内容提取和索引
    // 3. 病毒扫描
    // 4. 生成缩略图
    // 5. 上传到云存储
  }
}
