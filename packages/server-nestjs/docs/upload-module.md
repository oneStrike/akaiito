# 文件上传模块使用指南

## 概述

本项目基于 NestJS 11 + Fastify 实现了高性能的文件上传功能，支持单文件和多文件上传。

## 功能特性

- ✅ 单文件上传
- ✅ 多文件上传
- ✅ 文件类型验证
- ✅ 文件大小限制
- ✅ 自动文件重命名（UUID）
- ✅ 静态文件服务
- ✅ Swagger API 文档

## API 接口

### 1. 单文件上传

**接口地址：** `POST /api/upload/single`

**请求类型：** `multipart/form-data`

**请求参数：**
- `file`: 上传的文件
- `description`: 文件描述（可选）

**响应示例：**
```json
{
  "success": true,
  "message": "文件上传成功",
  "data": {
    "filename": "uuid-original-filename.jpg",
    "path": "/path/to/uploads/uuid-original-filename.jpg",
    "size": 1024
  }
}
```

### 2. 多文件上传

**接口地址：** `POST /api/upload/multiple`

**请求类型：** `multipart/form-data`

**请求参数：**
- `files`: 上传的文件数组
- `description`: 文件描述（可选）

**响应示例：**
```json
{
  "success": true,
  "message": "文件上传成功",
  "data": [
    {
      "filename": "uuid-file1.jpg",
      "path": "/path/to/uploads/uuid-file1.jpg",
      "size": 1024
    },
    {
      "filename": "uuid-file2.png",
      "path": "/path/to/uploads/uuid-file2.png",
      "size": 2048
    }
  ]
}
```

## 配置说明

### 文件限制配置

在 `src/main.ts` 中配置：

```typescript
await fastifyAdapter.register(require('@fastify/multipart'), {
  limits: {
    fieldNameSize: 100, // 字段名大小限制
    fieldSize: 100,     // 字段值大小限制
    fields: 10,         // 非文件字段数量限制
    fileSize: 1000000,  // 文件大小限制 (1MB)
    files: 5,           // 文件数量限制
    headerPairs: 2000   // header键值对数量限制
  }
})
```

### 允许的文件类型

在 `src/modules/shared/upload.service.ts` 中配置：

```typescript
private readonly allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'text/plain'
]
```

### 文件大小限制

```typescript
private readonly maxFileSize = 5 * 1024 * 1024 // 5MB
```

## 前端使用示例

### JavaScript/TypeScript

```typescript
// 单文件上传
const uploadSingleFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('description', '文件描述')
  
  const response = await fetch('/api/upload/single', {
    method: 'POST',
    body: formData
  })
  
  return response.json()
}

// 多文件上传
const uploadMultipleFiles = async (files: FileList) => {
  const formData = new FormData()
  
  Array.from(files).forEach(file => {
    formData.append('files', file)
  })
  formData.append('description', '批量上传')
  
  const response = await fetch('/api/upload/multiple', {
    method: 'POST',
    body: formData
  })
  
  return response.json()
}
```

### Vue 3 示例

```vue
<template>
  <div>
    <!-- 单文件上传 -->
    <input 
      type="file" 
      @change="handleSingleUpload" 
      accept="image/*,application/pdf"
    >
    
    <!-- 多文件上传 -->
    <input 
      type="file" 
      multiple 
      @change="handleMultipleUpload"
      accept="image/*,application/pdf"
    >
  </div>
</template>

<script setup lang="ts">
const handleSingleUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      console.log('上传成功:', result)
    } catch (error) {
      console.error('上传失败:', error)
    }
  }
}

const handleMultipleUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  if (files && files.length > 0) {
    const formData = new FormData()
    
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })
    
    try {
      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()
      console.log('批量上传成功:', result)
    } catch (error) {
      console.error('批量上传失败:', error)
    }
  }
}
</script>
```

## 静态文件访问

上传的文件可以通过以下URL访问：

```
http://localhost:3000/uploads/filename
```

## 安全建议

1. **文件类型验证**：严格限制允许上传的文件类型
2. **文件大小限制**：设置合理的文件大小上限
3. **文件重命名**：使用UUID避免文件名冲突和路径遍历攻击
4. **病毒扫描**：生产环境建议集成病毒扫描功能
5. **存储位置**：考虑使用云存储服务（如阿里云OSS、AWS S3）

## 扩展功能

### 1. 图片压缩

可以集成 `sharp` 库实现图片压缩：

```bash
pnpm add sharp
pnpm add -D @types/sharp
```

### 2. 断点续传

对于大文件上传，可以实现断点续传功能。

### 3. 上传进度

前端可以监听上传进度事件。

## 故障排除

### 常见错误

1. **文件大小超出限制**
   - 检查 `maxFileSize` 配置
   - 检查 Fastify 的 `fileSize` 限制

2. **文件类型不支持**
   - 检查 `allowedMimeTypes` 配置
   - 确认前端发送的文件类型正确

3. **上传目录权限问题**
   - 确保应用有写入 `uploads` 目录的权限

4. **模块导入错误**
   - 确认所有依赖已正确安装
   - 检查模块导入路径