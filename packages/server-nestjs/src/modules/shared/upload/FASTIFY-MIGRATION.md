# NestJS + Fastify 文件上传模块改造指南

## 概述

本文档详细说明了如何将 NestJS 的文件上传模块从 Express 兼容改造为完全支持 Fastify 的实现。

## 主要变更

### 1. 依赖更新

```bash
# 安装 Fastify multipart 插件
pnpm add @fastify/multipart
```

### 2. 应用启动配置 (main.ts)

```typescript
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

async function bootstrap() {
  // 创建Fastify适配器并配置multipart支持
  const fastifyAdapter = new FastifyAdapter()

  // 注册multipart插件以支持文件上传
  await fastifyAdapter.register(require('@fastify/multipart'), {
    limits: {
      fieldNameSize: 100, // 字段名最大长度
      fieldSize: 1024 * 1024, // 字段值最大大小 1MB
      fields: 20, // 最大字段数
      fileSize: 100 * 1024 * 1024, // 文件最大大小 100MB
      files: 50, // 最大文件数
      headerPairs: 2000 // 最大header对数
    },
    attachFieldsToBody: true, // 将字段附加到body
    throwFileSizeLimit: true, // 超出大小限制时抛出错误
    addToBody: true // 添加到请求体
  })

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter)
  // ... 其他配置
}
```

### 3. 上传配置更新 (fastify-upload.config.ts)

**主要变更：**
- 移除 `diskStorage`，改用 `memoryStorage`
- 简化配置，与 Fastify multipart 插件保持一致
- 保留文件过滤和验证逻辑

```typescript
import { FastifyMulterOptions } from '@nestjs/platform-fastify'
import { memoryStorage } from 'multer'

export const fastifyUploadConfig: FastifyMulterOptions = {
  // 使用内存存储，与Fastify multipart插件配合
  storage: memoryStorage(),

  // 文件大小限制（与main.ts中的multipart配置保持一致）
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 50, // 最大文件数
    fields: 20, // 最大字段数
    fieldNameSize: 100, // 字段名最大长度
    fieldSize: 1024 * 1024, // 字段值最大大小 1MB
  },

  // 保留文件过滤逻辑
  fileFilter: (req, file, cb) => {
    // 验证逻辑...
  }
}
```

### 4. 控制器使用方式

**无需变更！** 控制器代码保持不变：

```typescript
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-fastify'

@Controller('upload')
export class UploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file', getDynamicUploadConfig()))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadFileDto
  ) {
    // 文件处理逻辑保持不变
    // file.buffer 包含文件数据
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', undefined, getDynamicUploadConfig()))
  async uploadMultiple(
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    // 多文件处理逻辑保持不变
  }
}
```

## 关键改进

### 1. 性能优化

- **内存存储**: 使用 `memoryStorage()` 替代磁盘存储，减少 I/O 操作
- **流处理**: Fastify 原生支持流处理，提高大文件上传性能
- **并发处理**: Fastify 的异步架构提供更好的并发性能

### 2. 兼容性保证

- **API 不变**: 控制器和服务层 API 保持完全兼容
- **类型安全**: 继续使用 `Express.Multer.File` 类型定义
- **验证逻辑**: 文件验证和过滤逻辑完全保留

### 3. 配置统一

- **集中配置**: 在 `main.ts` 中统一配置 multipart 选项
- **动态限制**: 支持通过 `getDynamicUploadConfig()` 动态调整限制
- **错误处理**: 统一的错误处理和限制检查

## 使用示例

### 前端上传代码

```javascript
// 单文件上传
const formData = new FormData()
formData.append('file', fileInput.files[0])
formData.append('scene', 'avatar')

fetch('/api/upload/single', {
  method: 'POST',
  body: formData
})

// 多文件上传
const formData = new FormData()
for (let i = 0; i < fileInput.files.length; i++) {
  formData.append('files', fileInput.files[i])
}
formData.append('scene', 'gallery')

fetch('/api/upload/multiple', {
  method: 'POST',
  body: formData
})
```

### 原生 Fastify API 使用

如需更精细的控制，可以直接使用 Fastify 的 multipart API：

```typescript
@Post('native')
async uploadNative(request: FastifyRequest) {
  if (!request.isMultipart()) {
    throw new Error('请求必须是 multipart/form-data 格式')
  }

  const parts = request.parts()
  for await (const part of parts) {
    if (part.type === 'file') {
      const buffer = await part.toBuffer()
      // 处理文件数据
    } else {
      // 处理表单字段
      const value = part.value
    }
  }
}
```

## 注意事项

### 1. 内存使用

- 使用内存存储时，大文件会占用更多内存
- 建议根据服务器配置调整文件大小限制
- 对于超大文件，考虑使用流处理

### 2. 错误处理

- Fastify 会自动处理超出限制的请求
- 自定义错误处理需要在全局异常过滤器中处理

### 3. 类型定义

- 继续使用 `Express.Multer.File` 类型
- `file.buffer` 包含完整的文件数据
- `file.path` 在内存存储模式下为 undefined

## 迁移检查清单

- [x] 安装 `@fastify/multipart` 依赖
- [x] 更新 `main.ts` 注册 multipart 插件
- [x] 修改 `fastify-upload.config.ts` 使用内存存储
- [x] 确认控制器使用 `@nestjs/platform-fastify` 的拦截器
- [x] 测试单文件和多文件上传功能
- [x] 验证文件大小和类型限制
- [x] 检查错误处理和异常情况

## 性能对比

| 指标 | Express + Multer | Fastify + @fastify/multipart |
|------|------------------|-------------------------------|
| 内存使用 | 磁盘缓存 | 内存缓存 |
| 并发性能 | 中等 | 高 |
| 流处理 | 支持 | 原生优化 |
| 启动速度 | 中等 | 快 |
| 文件处理 | 同步 | 异步优化 |

## 故障排除

### 常见问题

1. **文件上传失败**
   - 检查是否正确注册了 multipart 插件
   - 确认文件大小是否超出限制

2. **类型错误**
   - 确保使用 `@nestjs/platform-fastify` 的拦截器
   - 检查 TypeScript 类型定义

3. **性能问题**
   - 调整内存限制配置
   - 考虑使用流处理大文件

通过以上改造，文件上传模块现在完全兼容 Fastify，并获得了更好的性能和并发处理能力。
