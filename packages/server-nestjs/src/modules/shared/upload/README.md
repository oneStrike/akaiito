# 文件上传模块

基于 NestJS 11 和 Fastify 框架构建的高性能、安全的文件上传模块。

## 功能特性

### 🚀 性能优化
- **流传输支持**：采用 Fastify 流传输技术，提升大文件上传性能
- **并发控制**：支持多文件并发上传，可配置并发数量
- **内存优化**：避免大文件占用过多内存
- **分块传输**：支持文件分块上传，提高传输效率

### 🔒 安全保障
- **文件类型验证**：支持 MIME 类型和扩展名双重验证
- **文件内容检测**：通过魔数（Magic Numbers）验证文件真实类型
- **危险文件拦截**：自动拦截可执行文件和脚本文件
- **文件大小限制**：可配置单文件和总文件大小限制
- **文件名安全**：自动处理特殊字符，生成安全的文件名
- **哈希校验**：支持文件完整性校验

### 📊 监控与日志
- **实时监控**：提供上传进度、错误率等实时数据
- **性能统计**：记录上传速度、成功率等性能指标
- **详细日志**：完整的上传过程日志记录
- **项目维度统计**：按项目分类统计上传数据

### 📁 智能存储
- **目录结构**：按照 `项目/年/月/日/场景/类型` 自动生成目录
- **文件分类**：自动识别并分类存储不同类型文件
- **重复文件处理**：支持文件去重和覆盖策略
- **存储统计**：提供存储空间使用情况统计

## 目录结构

```
src/modules/shared/upload/
├── upload.module.ts              # 上传模块定义
├── upload.controller.ts          # 控制器，提供 REST API
├── upload.service.ts             # 核心业务逻辑
├── upload.dto.ts                 # 数据传输对象
├── upload.config.ts              # 配置文件
├── fastify-upload.config.ts      # Fastify 上传配置
├── file-validation.service.ts    # 文件验证服务
├── storage.service.ts            # 存储服务
└── README.md                     # 说明文档
```

## API 接口

### 单文件上传

```http
POST /upload/single
Content-Type: multipart/form-data

{
  "file": "<binary>",
  "project": "admin",
  "scene": "avatar"
}
```

**响应示例：**
```json
{
  "success": true,
  "message": "文件上传成功",
  "data": {
    "id": "upload_1234567890",
    "filename": "avatar.jpg",
    "originalName": "my-avatar.jpg",
    "size": 1024000,
    "mimeType": "image/jpeg",
    "url": "/public/admin/uploads/2025/01/15/avatar/images/avatar.jpg",
    "path": "public/admin/uploads/2025/01/15/avatar/images/avatar.jpg",
    "hash": "sha256:abc123...",
    "uploadTime": "2025-01-15T10:30:00.000Z"
  }
}
```

### 多文件上传

```http
POST /upload/multiple
Content-Type: multipart/form-data

{
  "files": ["<binary>", "<binary>"],
  "project": "admin",
  "scene": "gallery"
}
```

### 获取上传统计

```http
GET /upload/stats
```

### 获取实时监控数据

```http
GET /upload/metrics/realtime
```

### 健康检查

```http
GET /upload/health
```

## 配置说明

### 环境变量配置

复制 `.env.upload.example` 文件为 `.env` 并根据需要修改：

```bash
# 基础配置
UPLOAD_BASE_DIR=public                    # 上传基础目录
PUBLIC_BASE_URL=/public                   # 公共访问 URL 前缀
UPLOAD_TEMP_DIR=./temp                    # 临时文件目录

# 文件限制
UPLOAD_MAX_FILE_SIZE=104857600            # 最大文件大小（100MB）
UPLOAD_MAX_FILES=50                       # 最大文件数量
UPLOAD_MAX_FILENAME_LENGTH=255            # 最大文件名长度

# 性能配置
UPLOAD_ENABLE_STREAMING=true              # 启用流传输
UPLOAD_CHUNK_SIZE=1048576                 # 分块大小（1MB）
UPLOAD_CONCURRENT_UPLOADS=10              # 并发上传数

# 安全配置
UPLOAD_ENABLE_VIRUS_SCAN=false           # 启用病毒扫描
UPLOAD_ENABLE_CONTENT_VALIDATION=true    # 启用内容验证
UPLOAD_ENABLE_HASH_CHECK=true            # 启用哈希校验

# 监控配置
UPLOAD_ENABLE_METRICS=true               # 启用监控
UPLOAD_METRICS_HISTORY_SIZE=10000        # 监控历史记录数量

# 清理配置
UPLOAD_ENABLE_AUTO_CLEANUP=false         # 启用自动清理
UPLOAD_CLEANUP_INTERVAL=24               # 清理间隔（小时）
UPLOAD_MAX_FILE_AGE=30                   # 文件最大保留天数
```

### 支持的文件类型

#### 图片类型
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)
- BMP (.bmp)
- TIFF (.tiff)

#### 文档类型
- PDF (.pdf)
- Word (.doc, .docx)
- Excel (.xls, .xlsx)
- PowerPoint (.ppt, .pptx)
- 文本文件 (.txt, .csv)

#### 视频类型
- MP4 (.mp4)
- AVI (.avi)
- MOV (.mov)
- WMV (.wmv)
- FLV (.flv)
- WebM (.webm)
- MKV (.mkv)

#### 音频类型
- MP3 (.mp3)
- WAV (.wav)
- OGG (.ogg)
- AAC (.aac)
- FLAC (.flac)

#### 压缩文件
- ZIP (.zip)
- RAR (.rar)
- 7Z (.7z)
- GZIP (.gz)

## 存储目录结构

文件将按照以下规则存储：

```
public/
├── admin/                    # 管理后台项目
│   └── uploads/
│       └── 2025/
│           └── 01/
│               └── 15/
│                   ├── avatar/
│                   │   └── images/
│                   ├── gallery/
│                   │   ├── images/
│                   │   └── videos/
│                   └── shared/
│                       └── documents/
├── app/                      # 移动应用项目
└── client/                   # 客户端项目
```

- `public`：公共访问目录
- `admin/app/client`：子项目标识
- `2025/01/15`：上传日期（年/月/日）
- `avatar/gallery/shared`：上传场景
- `images/videos/documents/audios/others`：文件类型

## 使用示例

### 前端上传示例

```javascript
// 单文件上传
const uploadSingle = async (file, project = 'admin', scene = 'shared') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('project', project)
  formData.append('scene', scene)

  const response = await fetch('/upload/single', {
    method: 'POST',
    body: formData
  })

  return await response.json()
}

// 多文件上传
const uploadMultiple = async (files, project = 'admin', scene = 'gallery') => {
  const formData = new FormData()
  files.forEach(file => formData.append('files', file))
  formData.append('project', project)
  formData.append('scene', scene)

  const response = await fetch('/upload/multiple', {
    method: 'POST',
    body: formData
  })

  return await response.json()
}
```

### 后端服务调用

```typescript
import { UploadService } from './upload.service'

@Injectable()
export class MyService {
  constructor(private readonly uploadService: UploadService) {}

  async handleFileUpload(file: Express.Multer.File) {
    return await this.uploadService.uploadSingle(
      file,
      'admin',
      'documents',
      {
        clientIp: '127.0.0.1',
        userAgent: 'Mozilla/5.0...'
      }
    )
  }

  async getUploadStats() {
    return await this.uploadService.getUploadStats()
  }
}
```

## 监控与统计

### 实时监控指标
- 当前活跃上传数
- 每分钟上传数
- 错误率
- 平均上传速度

### 性能统计
- 总上传次数
- 总上传大小
- 平均文件大小
- 成功率
- 平均上传时间

### 项目维度统计
- 各项目上传量对比
- 各场景使用情况
- 文件类型分布

## 错误处理

模块提供详细的错误信息和状态码：

- `400 Bad Request`：请求参数错误、文件验证失败
- `413 Payload Too Large`：文件大小超出限制
- `415 Unsupported Media Type`：不支持的文件类型
- `500 Internal Server Error`：服务器内部错误

## 性能优化建议

1. **启用流传输**：设置 `UPLOAD_ENABLE_STREAMING=true`
2. **调整分块大小**：根据网络环境调整 `UPLOAD_CHUNK_SIZE`
3. **合理设置并发数**：根据服务器性能调整 `UPLOAD_CONCURRENT_UPLOADS`
4. **启用文件压缩**：对于支持的文件类型启用压缩
5. **使用 CDN**：将上传的文件托管到 CDN 服务

## 安全注意事项

1. **文件类型验证**：始终验证文件的真实类型
2. **文件大小限制**：设置合理的文件大小限制
3. **访问权限控制**：对上传的文件设置适当的访问权限
4. **定期清理**：定期清理临时文件和过期文件
5. **病毒扫描**：在生产环境中考虑启用病毒扫描

## 故障排除

### 常见问题

1. **上传失败**
   - 检查文件大小是否超出限制
   - 检查文件类型是否被支持
   - 检查磁盘空间是否充足

2. **性能问题**
   - 调整分块大小和并发数
   - 检查服务器资源使用情况
   - 考虑启用流传输

3. **权限问题**
   - 检查上传目录的写入权限
   - 检查临时目录的访问权限

### 日志查看

上传模块会记录详细的日志信息，可以通过以下方式查看：

```bash
# 查看上传日志
tail -f logs/upload.log

# 查看错误日志
tail -f logs/error.log
```

## 更新日志

### v1.0.0
- 初始版本发布
- 支持单文件和多文件上传
- 集成 Fastify 流传输
- 完整的安全验证机制
- 实时监控和统计功能
