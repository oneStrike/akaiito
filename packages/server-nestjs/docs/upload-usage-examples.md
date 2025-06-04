# NestJS 文件上传功能使用指南

本文档提供了 NestJS 文件上传功能的详细使用说明和示例代码。

## 目录

- [快速开始](#快速开始)
- [API 接口](#api-接口)
- [装饰器使用](#装饰器使用)
- [配置说明](#配置说明)
- [错误处理](#错误处理)
- [安全措施](#安全措施)
- [测试示例](#测试示例)

## 快速开始

### 1. 环境配置

复制 `.env.upload.example` 文件为 `.env` 并根据需要修改配置：

```bash
cp .env.upload.example .env
```

### 2. 启动服务

```bash
npm run start:dev
```

### 3. 测试上传

使用 curl 测试单文件上传：

```bash
curl -X POST \
  http://localhost:3000/api/upload/single \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/your/file.jpg'
```

## API 接口

### 单文件上传

**POST** `/api/upload/single`

**请求参数：**
- `file`: 文件（必需）
- `uploaderId`: 上传者ID（可选）

**响应示例：**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "originalName": "example.jpg",
  "fileName": "550e8400-e29b-41d4-a716-446655440000_1640995200000.jpg",
  "filePath": "/uploads/550e8400-e29b-41d4-a716-446655440000_1640995200000.jpg",
  "size": 1048576,
  "mimeType": "image/jpeg",
  "extension": ".jpg",
  "uploadTime": "2023-12-01T10:00:00.000Z",
  "url": "/api/upload/file/550e8400-e29b-41d4-a716-446655440000"
}
```

### 多文件上传

**POST** `/api/upload/multiple`

**请求参数：**
- `files`: 文件数组（必需，最多5个）
- `uploaderId`: 上传者ID（可选）

**响应示例：**
```json
{
  "successFiles": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "originalName": "example1.jpg",
      "fileName": "550e8400-e29b-41d4-a716-446655440000_1640995200000.jpg",
      "size": 1048576,
      "mimeType": "image/jpeg",
      "extension": ".jpg",
      "uploadTime": "2023-12-01T10:00:00.000Z",
      "url": "/api/upload/file/550e8400-e29b-41d4-a716-446655440000"
    }
  ],
  "failedFiles": [
    {
      "originalName": "invalid.exe",
      "error": "不支持的文件类型: application/exe (.exe)"
    }
  ],
  "totalFiles": 2,
  "successCount": 1,
  "failedCount": 1
}
```

### 获取文件信息

**GET** `/api/upload/info/:fileId`

**响应示例：**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "originalName": "example.jpg",
  "size": 1048576,
  "mimeType": "image/jpeg",
  "uploadTime": "2023-12-01T10:00:00.000Z",
  "status": "active",
  "uploaderId": "user123"
}
```

### 下载文件

**GET** `/api/upload/file/:fileId`

返回文件流，浏览器会下载文件。

### 预览文件

**GET** `/api/upload/preview/:fileId`

返回文件流，浏览器会直接显示文件（仅支持图片和PDF）。

### 删除文件

**DELETE** `/api/upload/files`

**请求体：**
```json
{
  "fileIds": ["file-id-1", "file-id-2"]
}
```

**响应示例：**
```json
{
  "message": "删除完成，成功: 2, 失败: 0",
  "deletedCount": 2,
  "errors": []
}
```

### 获取上传配置

**GET** `/api/upload/config`

**响应示例：**
```json
{
  "maxFileSize": 10485760,
  "maxFiles": 5,
  "allowedMimeTypes": ["image/jpeg", "image/png", "application/pdf"],
  "allowedExtensions": [".jpg", ".jpeg", ".png", ".pdf"]
}
```

## 装饰器使用

### 在控制器中使用预定义装饰器

```typescript
import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common'
import {
  SingleFileUpload,
  MultipleFileUpload,
  ImageUpload,
  DocumentUpload,
  AvatarUpload,
} from '@/common/decorators/upload.decorator'

@Controller('example')
export class ExampleController {
  // 单文件上传
  @Post('upload')
  @SingleFileUpload()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // 处理文件
    return { message: '上传成功', file: file.filename }
  }

  // 多文件上传
  @Post('upload-multiple')
  @MultipleFileUpload({ maxFiles: 3 })
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    // 处理多个文件
    return { message: '上传成功', count: files.length }
  }

  // 图片上传
  @Post('upload-image')
  @ImageUpload()
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // 处理图片文件
    return { message: '图片上传成功' }
  }

  // 文档上传
  @Post('upload-document')
  @DocumentUpload()
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    // 处理文档文件
    return { message: '文档上传成功' }
  }

  // 头像上传
  @Post('upload-avatar')
  @AvatarUpload()
  async uploadAvatar(@UploadedFile() avatar: Express.Multer.File) {
    // 处理头像文件
    return { message: '头像上传成功' }
  }
}
```

### 自定义装饰器配置

```typescript
@Post('custom-upload')
@SingleFileUpload({
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png'],
  allowedExtensions: ['.jpg', '.jpeg', '.png'],
  enableLogging: true,
})
async customUpload(@UploadedFile() file: Express.Multer.File) {
  return { message: '自定义上传成功' }
}
```

## 配置说明

### 环境变量配置

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `UPLOAD_MAX_FILE_SIZE` | 最大文件大小（字节） | 10485760 (10MB) |
| `UPLOAD_MAX_FILES` | 最大文件数量 | 5 |
| `UPLOAD_ALLOWED_MIME_TYPES` | 允许的MIME类型 | image/jpeg,image/png,... |
| `UPLOAD_ALLOWED_EXTENSIONS` | 允许的文件扩展名 | .jpg,.jpeg,.png,... |
| `UPLOAD_DIR` | 上传目录 | uploads |
| `UPLOAD_PRESERVE_ORIGINAL_NAME` | 是否保留原始文件名 | false |

### 代码配置

```typescript
import { createMulterConfig } from '@/config/upload.config'

const customConfig = createMulterConfig({
  maxFileSize: 20 * 1024 * 1024, // 20MB
  maxFiles: 10,
  allowedMimeTypes: ['image/*', 'application/pdf'],
  allowedExtensions: ['.jpg', '.png', '.pdf'],
  uploadDir: '/custom/upload/path',
  preserveOriginalName: true,
})
```

## 错误处理

### 常见错误类型

1. **文件大小超限**
   ```json
   {
     "statusCode": 400,
     "error": "Upload Error",
     "message": "文件大小超出限制",
     "details": {
       "code": "FILE_TOO_LARGE",
       "maxSize": "10MB"
     }
   }
   ```

2. **文件类型不支持**
   ```json
   {
     "statusCode": 400,
     "error": "Unsupported File Type",
     "message": "不支持的文件类型: application/exe (.exe)",
     "details": {
       "code": "UNSUPPORTED_FILE_TYPE"
     }
   }
   ```

3. **文件数量超限**
   ```json
   {
     "statusCode": 400,
     "error": "Upload Error",
     "message": "文件数量超出限制",
     "details": {
       "code": "TOO_MANY_FILES",
       "maxCount": 5
     }
   }
   ```

### 自定义错误处理

```typescript
import { UseFilters } from '@nestjs/common'
import { UploadExceptionFilter } from '@/common/filters/upload-exception.filter'

@Controller('upload')
@UseFilters(UploadExceptionFilter)
export class UploadController {
  // 控制器方法
}
```

## 安全措施

### 1. 文件类型验证

- MIME类型检查
- 文件扩展名验证
- 文件头部魔数验证

### 2. 文件大小限制

- 单文件大小限制
- 总文件大小限制
- 文件数量限制

### 3. 文件名安全

- 生成唯一文件名
- 防止目录遍历攻击
- 避免文件名冲突

### 4. 存储安全

- 文件存储在安全目录
- 适当的文件权限设置
- 定期清理临时文件

## 测试示例

### 单元测试

```typescript
import { Test } from '@nestjs/testing'
import { UploadService } from './upload.service'

describe('UploadService', () => {
  let service: UploadService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UploadService],
    }).compile()

    service = module.get<UploadService>(UploadService)
  })

  it('应该成功上传文件', async () => {
    const mockFile: Express.Multer.File = {
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
      size: 1024,
      buffer: Buffer.from('test'),
      // ... 其他属性
    }

    const result = await service.uploadSingleFile(mockFile)
    expect(result.originalName).toBe('test.jpg')
  })
})
```

### 集成测试

```typescript
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('Upload (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/upload/single (POST)', () => {
    return request(app.getHttpServer())
      .post('/upload/single')
      .attach('file', 'test/fixtures/test.jpg')
      .expect(201)
      .expect((res) => {
        expect(res.body.originalName).toBe('test.jpg')
      })
  })
})
```

## 性能优化

### 1. 异步处理

```typescript
// 使用队列处理大文件上传
import { Queue } from 'bull'

@Injectable()
export class UploadService {
  constructor(@InjectQueue('file-processing') private fileQueue: Queue) {}

  async uploadLargeFile(file: Express.Multer.File) {
    // 先保存文件
    const fileInfo = await this.saveFile(file)

    // 异步处理文件（如压缩、转换格式等）
    await this.fileQueue.add('process-file', { fileId: fileInfo.id })

    return fileInfo
  }
}
```

### 2. 文件压缩

```typescript
import * as sharp from 'sharp'

async processImage(filePath: string) {
  await sharp(filePath)
    .resize(800, 600)
    .jpeg({ quality: 80 })
    .toFile(filePath.replace('.jpg', '_compressed.jpg'))
}
```

### 3. CDN 集成

```typescript
// 上传到云存储服务
import { S3 } from 'aws-sdk'

@Injectable()
export class CloudUploadService {
  private s3 = new S3()

  async uploadToCloud(file: Express.Multer.File) {
    const uploadParams = {
      Bucket: 'your-bucket',
      Key: `uploads/${file.filename}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    }

    const result = await this.s3.upload(uploadParams).promise()
    return result.Location
  }
}
```

## 监控和日志

### 1. 上传日志

所有文件上传操作都会自动记录日志，包括：
- 上传时间
- 文件信息
- 上传者信息
- 性能指标
- 错误信息

### 2. 性能监控

```typescript
// 自动记录性能指标
{
  "fileCount": 1,
  "totalSize": "5.2MB",
  "duration": "1200ms",
  "uploadSpeed": "4.3MB/s"
}
```

### 3. 健康检查

**GET** `/api/upload/health`

```json
{
  "status": "ok",
  "timestamp": "2023-12-01T10:00:00.000Z",
  "config": {
    "maxFileSize": 10485760,
    "maxFiles": 5,
    "uploadDir": "/app/uploads"
  }
}
```

## 故障排除

### 常见问题

1. **上传目录权限问题**
   ```bash
   chmod 755 uploads/
   chown -R node:node uploads/
   ```

2. **文件大小限制**
   - 检查 Nginx 配置：`client_max_body_size`
   - 检查 Node.js 配置：`UPLOAD_MAX_FILE_SIZE`

3. **内存使用过高**
   - 使用流式处理大文件
   - 配置合适的文件大小限制

### 调试模式

```bash
# 启用详细日志
DEBUG=upload:* npm run start:dev
```

## 总结

本文档提供了 NestJS 文件上传功能的完整使用指南，包括：

- ✅ 单文件和多文件上传
- ✅ 文件类型和大小验证
- ✅ 安全措施和错误处理
- ✅ 装饰器简化开发
- ✅ 完整的测试覆盖
- ✅ 性能监控和日志记录
- ✅ 详细的配置选项

通过这些功能，您可以快速构建安全、可靠的文件上传服务。
