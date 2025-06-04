import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { UploadService } from '../src/modules/shared/upload/upload.service'
import { UploadConfig } from '../src/config/upload.config'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { existsSync } from 'node:fs'

describe('UploadService - Directory Structure', () => {
  let service: UploadService
  let configService: ConfigService
  const testUploadDir = join(process.cwd(), 'test-uploads')

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              maxFileSize: 10 * 1024 * 1024,
              maxFiles: 5,
              allowedMimeTypes: ['image/jpeg', 'image/png', 'application/pdf'],
              allowedExtensions: ['.jpg', '.jpeg', '.png', '.pdf'],
              uploadDir: testUploadDir,
              preserveOriginalName: false,
            } as UploadConfig),
          },
        },
      ],
    }).compile()

    service = module.get<UploadService>(UploadService)
    configService = module.get<ConfigService>(ConfigService)
  })

  afterEach(async () => {
    // 清理测试文件
    if (existsSync(testUploadDir)) {
      await fs.rmdir(testUploadDir, { recursive: true })
    }
  })

  describe('文件目录结构测试', () => {
    it('应该根据日期、场景和文件类型创建正确的目录结构', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-image.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('test file content'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      const result = await service.uploadSingleFile(mockFile, 'user123', 'profile')

      // 验证返回结果
      expect(result).toBeDefined()
      expect(result.originalName).toBe('test-image.jpg')
      expect(result.size).toBe(1024)
      expect(result.mimeType).toBe('image/jpeg')

      // 验证文件路径包含正确的目录结构
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      
      const expectedPathPattern = join(testUploadDir, String(year), month, day, 'profile', 'image')
      expect(result.filePath).toContain(expectedPathPattern)

      // 验证文件确实被创建
      expect(existsSync(result.filePath)).toBe(true)
    })

    it('应该使用默认场景 "shared" 当没有提供场景参数时', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-document.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        size: 2048,
        buffer: Buffer.from('test pdf content'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      const result = await service.uploadSingleFile(mockFile, 'user456')

      // 验证使用了默认场景
      expect(result.filePath).toContain('shared')
      expect(result.filePath).toContain('document')
    })

    it('应该根据不同的MIME类型创建不同的文件类型目录', async () => {
      const testCases = [
        { mimetype: 'image/png', expectedType: 'image' },
        { mimetype: 'video/mp4', expectedType: 'video' },
        { mimetype: 'audio/mp3', expectedType: 'audio' },
        { mimetype: 'application/pdf', expectedType: 'document' },
        { mimetype: 'application/zip', expectedType: 'archive' },
        { mimetype: 'text/unknown', expectedType: 'other' },
      ]

      for (const testCase of testCases) {
        const mockFile: Express.Multer.File = {
          fieldname: 'file',
          originalname: `test.${testCase.expectedType}`,
          encoding: '7bit',
          mimetype: testCase.mimetype,
          size: 1024,
          buffer: Buffer.from('test content'),
          destination: '',
          filename: '',
          path: '',
          stream: null as any,
        }

        const result = await service.uploadSingleFile(mockFile, 'user789', 'test')
        expect(result.filePath).toContain(testCase.expectedType)
      }
    })

    it('应该为多文件上传创建相同的目录结构', async () => {
      const mockFiles: Express.Multer.File[] = [
        {
          fieldname: 'files',
          originalname: 'image1.jpg',
          encoding: '7bit',
          mimetype: 'image/jpeg',
          size: 1024,
          buffer: Buffer.from('image1 content'),
          destination: '',
          filename: '',
          path: '',
          stream: null as any,
        },
        {
          fieldname: 'files',
          originalname: 'image2.png',
          encoding: '7bit',
          mimetype: 'image/png',
          size: 2048,
          buffer: Buffer.from('image2 content'),
          destination: '',
          filename: '',
          path: '',
          stream: null as any,
        },
      ]

      const result = await service.uploadMultipleFiles(mockFiles, 'user999', 'gallery')

      expect(result.successFiles).toHaveLength(2)
      expect(result.failedFiles).toHaveLength(0)

      // 验证所有文件都在相同的场景目录下
      result.successFiles.forEach(file => {
        expect(file.filePath).toContain('gallery')
        expect(file.filePath).toContain('image')
      })
    })
  })
})