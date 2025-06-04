# 文件上传场景使用示例

本文档展示如何使用新的场景参数功能，实现按日期、场景和文件类型的分层目录结构。

## 📋 目录结构说明

文件上传后会自动创建如下目录结构：

```
uploads/年份/月份/日期/场景/文件类型/文件名
```

例如：`uploads/2025/01/15/profile/image/uuid_timestamp.jpg`

## 🎯 使用示例

### 1. 用户头像上传

```bash
# 上传用户头像
curl -X POST \
  'http://localhost:3000/api/upload/single?scene=profile&uploaderId=user123' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@avatar.jpg'
```

**目录结构**：`uploads/2025/01/15/profile/image/`

### 2. 相册图片上传

```bash
# 上传相册图片
curl -X POST \
  'http://localhost:3000/api/upload/multiple?scene=gallery&uploaderId=user456' \
  -H 'Content-Type: multipart/form-data' \
  -F 'files=@photo1.jpg' \
  -F 'files=@photo2.png'
```

**目录结构**：`uploads/2025/01/15/gallery/image/`

### 3. 文档资料上传

```bash
# 上传文档
curl -X POST \
  'http://localhost:3000/api/upload/single?scene=document&uploaderId=user789' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@report.pdf'
```

**目录结构**：`uploads/2025/01/15/document/document/`

### 4. 默认场景上传

```bash
# 不指定场景，使用默认的 shared
curl -X POST \
  'http://localhost:3000/api/upload/single?uploaderId=user999' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@file.txt'
```

**目录结构**：`uploads/2025/01/15/shared/document/`

## 🔧 前端集成示例

### Vue.js 示例

```vue
<template>
  <div>
    <!-- 头像上传 -->
    <input
      type="file"
      @change="uploadAvatar"
      accept="image/*"
    />

    <!-- 文档上传 -->
    <input
      type="file"
      @change="uploadDocument"
      accept=".pdf,.doc,.docx"
    />

    <!-- 多文件上传 -->
    <input
      type="file"
      @change="uploadGallery"
      multiple
      accept="image/*"
    />
  </div>
</template>

<script setup>
import axios from 'axios'

const uploadAvatar = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('/api/upload/single', formData, {
      params: {
        scene: 'profile',
        uploaderId: 'current-user-id'
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('头像上传成功:', response.data)
    // 文件保存在: uploads/2025/01/15/profile/image/
  } catch (error) {
    console.error('上传失败:', error)
  }
}

const uploadDocument = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('/api/upload/single', formData, {
      params: {
        scene: 'document',
        uploaderId: 'current-user-id'
      }
    })

    console.log('文档上传成功:', response.data)
    // 文件保存在: uploads/2025/01/15/document/document/
  } catch (error) {
    console.error('上传失败:', error)
  }
}

const uploadGallery = async (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  const formData = new FormData()
  files.forEach(file => {
    formData.append('files', file)
  })

  try {
    const response = await axios.post('/api/upload/multiple', formData, {
      params: {
        scene: 'gallery',
        uploaderId: 'current-user-id'
      }
    })

    console.log('相册上传成功:', response.data)
    // 文件保存在: uploads/2025/01/15/gallery/image/
  } catch (error) {
    console.error('上传失败:', error)
  }
}
</script>
```

### React 示例

```jsx
import React from 'react'
import axios from 'axios'

const FileUpload = () => {
  const handleUpload = async (file, scene) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload/single', formData, {
        params: {
          scene,
          uploaderId: 'current-user-id'
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(`${scene} 上传成功:`, response.data)
      return response.data
    } catch (error) {
      console.error('上传失败:', error)
      throw error
    }
  }

  return (
    <div>
      {/* 头像上传 */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          if (file) handleUpload(file, 'profile')
        }}
      />

      {/* 文档上传 */}
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0]
          if (file) handleUpload(file, 'document')
        }}
      />
    </div>
  )
}

export default FileUpload
```

## 📊 文件类型自动分类

系统会根据文件的 MIME 类型自动分类：

| MIME 类型 | 分类目录 | 示例文件 |
|-----------|----------|----------|
| `image/*` | `image` | .jpg, .png, .gif, .webp |
| `video/*` | `video` | .mp4, .avi, .mov |
| `audio/*` | `audio` | .mp3, .wav, .flac |
| `application/pdf` | `document` | .pdf |
| `application/*word*` | `document` | .doc, .docx |
| `application/*excel*` | `document` | .xls, .xlsx |
| `text/*` | `document` | .txt, .md |
| `application/*zip*` | `archive` | .zip, .rar, .7z |
| 其他 | `other` | 未分类文件 |

## 🎨 常用场景建议

| 场景名称 | 用途 | 建议文件类型 |
|----------|------|-------------|
| `profile` | 用户头像 | 图片 |
| `avatar` | 头像图片 | 图片 |
| `gallery` | 相册/图库 | 图片 |
| `document` | 文档资料 | PDF、Word、Excel |
| `attachment` | 附件文件 | 任意类型 |
| `media` | 媒体文件 | 视频、音频 |
| `backup` | 备份文件 | 压缩包 |
| `temp` | 临时文件 | 任意类型 |
| `shared` | 共享文件（默认） | 任意类型 |

## 🔍 响应示例

### 单文件上传响应

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "originalName": "avatar.jpg",
  "fileName": "550e8400-e29b-41d4-a716-446655440000_1705123456789.jpg",
  "filePath": "uploads/2025/01/15/profile/image/550e8400-e29b-41d4-a716-446655440000_1705123456789.jpg",
  "size": 102400,
  "mimeType": "image/jpeg",
  "extension": ".jpg",
  "uploadTime": "2025-01-15T10:30:56.789Z"
}
```

### 多文件上传响应

```json
{
  "successFiles": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "originalName": "photo1.jpg",
      "fileName": "550e8400-e29b-41d4-a716-446655440001_1705123456789.jpg",
      "filePath": "uploads/2025/01/15/gallery/image/550e8400-e29b-41d4-a716-446655440001_1705123456789.jpg",
      "size": 204800,
      "mimeType": "image/jpeg",
      "extension": ".jpg",
      "uploadTime": "2025-01-15T10:30:56.789Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "originalName": "photo2.png",
      "fileName": "550e8400-e29b-41d4-a716-446655440002_1705123456790.png",
      "filePath": "uploads/2025/01/15/gallery/image/550e8400-e29b-41d4-a716-446655440002_1705123456790.png",
      "size": 153600,
      "mimeType": "image/png",
      "extension": ".png",
      "uploadTime": "2025-01-15T10:30:56.790Z"
    }
  ],
  "failedFiles": [],
  "summary": {
    "total": 2,
    "success": 2,
    "failed": 0
  }
}
```

## ⚠️ 注意事项

1. **场景参数验证**：建议在前端对场景参数进行验证，确保使用合理的场景名称
2. **目录权限**：确保应用有足够的权限在指定目录下创建子目录
3. **存储空间**：按日期分层可能会创建大量目录，注意监控存储空间使用情况
4. **清理策略**：建议定期清理过期的临时文件和目录
5. **备份策略**：重要文件建议定期备份，目录结构有助于按时间范围进行备份
