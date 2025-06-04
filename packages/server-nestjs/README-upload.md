# NestJS 文件上传功能

这是一个完整的 NestJS 文件上传解决方案，支持单文件上传、多文件上传、文件验证、安全措施和错误处理。

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm add multer @types/multer mime-types @types/mime-types uuid @types/uuid
```

### 2. 环境配置

复制 `.env.upload.example` 到 `.env` 并根据需要修改配置：

```bash
cp .env.upload.example .env
```

### 3. 模块集成

文件上传功能已经集成到 `SharedModule` 中，并在 `AppModule` 中导入。如果需要在其他模块中使用，只需导入 `SharedModule`：

```typescript
import { Module } from '@nestjs/common'
import { SharedModule } from '@/modules/shared/shared.module'

@Module({
  imports: [SharedModule],
  // ...
})
export class YourModule {}
```

## 📁 项目结构

```
src/
├── common/
│   ├── decorators/
│   │   └── upload.decorator.ts          # 文件上传装饰器
│   ├── dto/
│   │   └── upload.dto.ts                # 上传相关 DTO
│   ├── filters/
│   │   └── upload-exception.filter.ts   # 上传异常过滤器
│   └── interceptors/
│       └── upload-logging.interceptor.ts # 上传日志拦截器
├── config/
│   └── upload.config.ts                 # 上传配置
├── modules/
│   └── shared/
│       └── upload/
│           ├── upload.controller.ts     # 上传控制器
│           ├── upload.service.ts        # 上传服务
│           ├── upload.module.ts         # 上传模块
│           ├── upload.controller.spec.ts # 控制器测试
│           └── upload.service.spec.ts   # 服务测试
├── examples/
│   └── upload-example.controller.ts     # 使用示例
└── docs/
    └── upload-usage-examples.md         # 详细文档
```

## 🎯 核心功能

### 1. 单文件上传

```typescript
@Post('upload')
@SingleFileUpload()
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  return await this.uploadService.uploadSingleFile(file)
}
```

### 2. 多文件上传

```typescript
@Post('upload-multiple')
@MultipleFileUpload()
async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
  return await this.uploadService.uploadMultipleFiles(files)
}
```

### 3. 专用上传装饰器

```typescript
// 图片上传（仅支持图片格式）
@ImageUpload()

// 文档上传（支持 PDF、Word、Excel 等）
@DocumentUpload()

// 头像上传（小尺寸图片）
@AvatarUpload()

// 自定义配置
@SingleFileUpload({
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png'],
  allowedExtensions: ['.jpg', '.png']
})
```

## 🔧 配置选项

### 环境变量配置

```env
# 文件上传配置
UPLOAD_MAX_FILE_SIZE=10485760          # 最大文件大小（字节）
UPLOAD_MAX_FILES=5                     # 最大文件数量
UPLOAD_ALLOWED_MIME_TYPES=image/jpeg,image/png,application/pdf
UPLOAD_ALLOWED_EXTENSIONS=.jpg,.jpeg,.png,.pdf
UPLOAD_DIRECTORY=uploads               # 上传目录
UPLOAD_PRESERVE_FILENAME=false         # 是否保留原文件名

## 📁 目录结构

文件上传后会按照以下规则自动创建目录结构：

```
uploads/
├── 2025/
│   ├── 01/
│   │   ├── 15/
│   │   │   ├── shared/          # 默认场景
│   │   │   │   ├── image/       # 图片文件
│   │   │   │   ├── document/    # 文档文件
│   │   │   │   ├── video/       # 视频文件
│   │   │   │   ├── audio/       # 音频文件
│   │   │   │   ├── archive/     # 压缩文件
│   │   │   │   └── other/       # 其他文件
│   │   │   ├── profile/         # 用户头像场景
│   │   │   │   └── image/
│   │   │   ├── gallery/         # 相册场景
│   │   │   │   └── image/
│   │   │   └── document/        # 文档场景
│   │   │       └── document/
```

### 场景参数说明

- **scene**: 上传场景，用于区分不同的业务场景
- 如果不传递 `scene` 参数，默认使用 `shared`
- 常用场景示例：
  - `profile`: 用户头像
  - `gallery`: 相册图片
  - `document`: 文档资料
  - `avatar`: 头像图片
  - `attachment`: 附件文件

### 文件类型自动分类

系统会根据文件的 MIME 类型自动分类到对应目录：

- **image**: `image/*` 类型文件
- **video**: `video/*` 类型文件
- **audio**: `audio/*` 类型文件
- **document**: PDF、Word、Excel、PowerPoint、文本文件
- **archive**: ZIP、RAR、7Z、TAR 等压缩文件
- **other**: 其他未分类文件
```

### 代码配置

```typescript
// 在 upload.config.ts 中修改默认配置
export default registerAs('upload', () => ({
  maxFileSize: parseInt(process.env.UPLOAD_MAX_FILE_SIZE) || 10 * 1024 * 1024,
  maxFiles: parseInt(process.env.UPLOAD_MAX_FILES) || 5,
  // ...
}))
```

## 🛡️ 安全特性

### 1. 文件验证
- MIME 类型验证
- 文件扩展名验证
- 文件大小限制
- 文件内容验证

### 2. 安全措施
- 唯一文件名生成（防止冲突和目录遍历）
- 文件类型二次验证
- 上传目录权限控制
- 恶意文件检测

### 3. 错误处理
- 统一异常处理
- 详细错误信息
- 适当的 HTTP 状态码
- 错误日志记录

## 📊 日志和监控

### 1. 上传日志
```typescript
// 自动记录上传信息
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "message": "File upload completed",
  "context": "UploadLoggingInterceptor",
  "uploadInfo": {
    "fileCount": 1,
    "totalSize": 1048576,
    "duration": 150,
    "uploaderId": "user123",
    "files": [{
      "originalName": "document.pdf",
      "filename": "20240115_103000_abc123.pdf",
      "size": 1048576,
      "mimetype": "application/pdf"
    }]
  }
}
```

### 2. 性能监控
- 上传速度监控
- 文件大小统计
- 错误率统计
- 慢上传警告

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行上传相关测试
npm run test -- --testPathPattern=upload

# 运行测试覆盖率
npm run test:cov
```

### 测试文件
- `upload.service.spec.ts` - 服务单元测试
- `upload.controller.spec.ts` - 控制器端到端测试

## 📖 API 文档

启动服务后，访问 Swagger 文档：
```
http://localhost:3000/api
```

### 主要端点

| 方法 | 路径 | 描述 | 新增参数 |
|------|------|------|----------|
| POST | `/api/upload/single` | 单文件上传 | `scene`: 上传场景（可选） |
| POST | `/api/upload/multiple` | 多文件上传 | `scene`: 上传场景（可选） |
| GET | `/api/upload/info/:fileId` | 获取文件信息 | - |
| GET | `/api/upload/download/:fileId` | 下载文件 |
| GET | `/api/upload/preview/:fileId` | 预览文件 |
| DELETE | `/api/upload/:fileId` | 删除文件 |
| GET | `/api/upload/config` | 获取上传配置 |

## 🔄 使用示例

查看 `src/examples/upload-example.controller.ts` 获取完整的使用示例，包括：

- 基础单文件/多文件上传
- 图片上传处理
- 文档上传处理
- 头像上传处理
- 自定义配置上传
- 批量上传处理
- 上传统计信息
- 临时文件清理

## 🚨 常见问题

### 1. 文件上传失败

**问题**：文件上传返回 400 错误

**解决方案**：
- 检查文件大小是否超过限制
- 检查文件类型是否被允许
- 检查上传目录权限
- 查看错误日志获取详细信息

### 2. 文件无法访问

**问题**：上传成功但无法下载或预览

**解决方案**：
- 检查文件是否真实存在
- 检查文件路径配置
- 检查静态文件服务配置

### 3. 性能问题

**问题**：大文件上传速度慢

**解决方案**：
- 增加上传超时时间
- 考虑使用分片上传
- 优化服务器配置
- 使用 CDN 或云存储

## 🔮 扩展功能

### 1. 云存储集成

```typescript
// 可以扩展 UploadService 支持云存储
export class CloudUploadService extends UploadService {
  async uploadToCloud(file: Express.Multer.File) {
    // 上传到 AWS S3、阿里云 OSS 等
  }
}
```

### 2. 图片处理

```typescript
// 集成 Sharp 进行图片处理
import sharp from 'sharp'

export class ImageProcessingService {
  async resizeImage(buffer: Buffer, width: number, height: number) {
    return await sharp(buffer)
      .resize(width, height)
      .jpeg({ quality: 80 })
      .toBuffer()
  }
}
```

### 3. 文件预览

```typescript
// 集成文档预览功能
export class PreviewService {
  async generatePreview(filePath: string, fileType: string) {
    // 生成文档预览图
  }
}
```

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请查看：
1. [详细文档](./docs/upload-usage-examples.md)
2. [使用示例](./src/examples/upload-example.controller.ts)
3. [测试用例](./src/modules/shared/upload/*.spec.ts)
