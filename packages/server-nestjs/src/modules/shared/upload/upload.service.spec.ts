import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'
import { UploadService } from './upload.service'
import { promises as fs } from 'node:fs'
import { join } from 'node:path'

// Mock fs promises
jest.mock('node:fs', () => ({
  promises: {
    access: jest.fn(),
    mkdir: jest.fn(),
    writeFile: jest.fn(),
    readFile: jest.fn(),
    rename: jest.fn(),
    copyFile: jest.fn(),
    unlink: jest.fn(),
  },
}))

const mockFs = fs as jest.Mocked<typeof fs>

describe('UploadService', () => {
  let service: UploadService
  let configService: ConfigService

  const mockUploadConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    allowedMimeTypes: {
      all: ['image/jpeg', 'image/png', 'text/plain'],
      image: ['image/jpeg', 'image/png'],
    },
    allowedExtensions: {
      all: ['.jpg', '.jpeg', '.png', '.txt'],
      image: ['.jpg', '.jpeg', '.png'],
    },
    uploadDir: '/test/uploads',
    preserveOriginalName: false,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(mockUploadConfig),
          },
        },
      ],
    }).compile()

    service = module.get<UploadService>(UploadService)
    configService = module.get<ConfigService>(ConfigService)

    // Reset all mocks
    jest.clearAllMocks()
  })

  describe('uploadSingleFile', () => {
    it('应该成功上传有效的图片文件', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('\xFF\xD8\xFF\xE0'), // JPEG header
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      mockFs.access.mockRejectedValue(new Error('Directory not exists'))
      mockFs.mkdir.mockResolvedValue(undefined)
      mockFs.writeFile.mockResolvedValue(undefined)

      const result = await service.uploadSingleFile(mockFile, 'test')

      expect(result).toHaveProperty('fileName')
      expect(result).toHaveProperty('filePath')
      expect(result.mimeType).toBe('image/jpeg')
      expect(result.size).toBe(1024)
      expect(mockFs.writeFile).toHaveBeenCalled()
    })

    it('应该拒绝空文件', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'empty.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 0,
        buffer: Buffer.alloc(0),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        BadRequestException
      )
      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        '文件为空，请选择有效的文件'
      )
    })

    it('应该拒绝文件签名不匹配的文件', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'fake.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('\x89\x50\x4E\x47'), // PNG header but claiming to be JPEG
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        BadRequestException
      )
      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        /文件签名验证失败/
      )
    })

    it('应该拒绝包含恶意脚本的文件', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'malicious.txt',
        encoding: '7bit',
        mimetype: 'text/plain',
        size: 100,
        buffer: Buffer.from('<script>alert("xss")</script>'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        BadRequestException
      )
      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        '文件包含可疑内容，上传被拒绝'
      )
    })

    it('应该拒绝可疑文件名', async () => {
      const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'virus.exe',
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        size: 1024,
        buffer: Buffer.from('test content'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        BadRequestException
      )
      await expect(service.uploadSingleFile(mockFile)).rejects.toThrow(
        '文件名包含非法字符或可疑扩展名'
      )
    })
  })

  describe('moveFileOptimized', () => {
    it('应该优先使用rename移动文件', async () => {
      const sourcePath = '/tmp/source.txt'
      const targetPath = '/uploads/target.txt'

      mockFs.rename.mockResolvedValue(undefined)

      // 使用反射访问私有方法进行测试
      const moveFileOptimized = (service as any).moveFileOptimized.bind(service)
      await moveFileOptimized(sourcePath, targetPath)

      expect(mockFs.rename).toHaveBeenCalledWith(sourcePath, targetPath)
      expect(mockFs.copyFile).not.toHaveBeenCalled()
      expect(mockFs.unlink).not.toHaveBeenCalled()
    })

    it('当rename失败时应该使用copy+unlink', async () => {
      const sourcePath = '/tmp/source.txt'
      const targetPath = '/uploads/target.txt'

      mockFs.rename.mockRejectedValue(new Error('Cross-device link'))
      mockFs.copyFile.mockResolvedValue(undefined)
      mockFs.unlink.mockResolvedValue(undefined)

      const moveFileOptimized = (service as any).moveFileOptimized.bind(service)
      await moveFileOptimized(sourcePath, targetPath)

      expect(mockFs.rename).toHaveBeenCalledWith(sourcePath, targetPath)
      expect(mockFs.copyFile).toHaveBeenCalledWith(sourcePath, targetPath)
      expect(mockFs.unlink).toHaveBeenCalledWith(sourcePath)
    })

    it('当copy也失败时应该抛出错误', async () => {
      const sourcePath = '/tmp/source.txt'
      const targetPath = '/uploads/target.txt'

      mockFs.rename.mockRejectedValue(new Error('Cross-device link'))
      mockFs.copyFile.mockRejectedValue(new Error('Permission denied'))

      const moveFileOptimized = (service as any).moveFileOptimized.bind(service)

      await expect(moveFileOptimized(sourcePath, targetPath)).rejects.toThrow(
        BadRequestException
      )
      await expect(moveFileOptimized(sourcePath, targetPath)).rejects.toThrow(
        /文件移动失败/
      )
    })
  })

  describe('uploadMultipleFiles', () => {
    it('应该处理部分文件上传失败的情况', async () => {
      const validFile: Express.Multer.File = {
        fieldname: 'files',
        originalname: 'valid.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('\xFF\xD8\xFF\xE0'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      const invalidFile: Express.Multer.File = {
        fieldname: 'files',
        originalname: 'invalid.exe',
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        size: 1024,
        buffer: Buffer.from('test'),
        destination: '',
        filename: '',
        path: '',
        stream: null as any,
      }

      mockFs.access.mockRejectedValue(new Error('Directory not exists'))
      mockFs.mkdir.mockResolvedValue(undefined)
      mockFs.writeFile.mockResolvedValue(undefined)

      const result = await service.uploadMultipleFiles([validFile, invalidFile])

      expect(result.successFiles).toHaveLength(1)
      expect(result.failedFiles).toHaveLength(1)
      expect(result.failedFiles[0].originalName).toBe('invalid.exe')
      expect(result.failedFiles[0].error).toContain('文件名包含非法字符或可疑扩展名')
    })
  })
})
