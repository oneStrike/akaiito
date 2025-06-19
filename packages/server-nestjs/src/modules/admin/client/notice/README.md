# 客户端通知模块 (Notice Module)

## 概述

客户端通知模块提供完整的通知管理功能，支持多平台（小程序、H5、APP）的通知发布、管理和展示。

## 功能特性

### 核心功能
- ✅ 通知的增删改查（CRUD）
- ✅ 多平台支持（小程序、H5、APP）
- ✅ 通知状态管理（未发布、已发布、已下线）
- ✅ 优先级和置顶功能
- ✅ 弹窗通知支持
- ✅ 阅读次数统计
- ✅ 软删除机制
- ✅ 批量操作
- ✅ 时间范围控制

### 性能优化
- 🚀 数据库索引优化
- 🚀 分页查询优化
- 🚀 事务并行查询
- 🚀 原子性操作
- 🚀 查询字段选择优化

## 数据库模型

### ClientNotice 表结构

| 字段名 | 类型 | 说明 | 索引 |
|--------|------|------|------|
| id | Int | 主键ID | ✅ |
| title | String(100) | 通知标题 | |
| content | Text | 通知内容 | |
| type | SmallInt | 通知类型 (1-4) | ✅ |
| priority | SmallInt | 优先级 (1-4) | ✅ |
| startTime | DateTime | 发布开始时间 | ✅ |
| endTime | DateTime | 发布结束时间 | ✅ |
| pageCode | String(50) | 关联页面代码 | |
| backgroundImage | String(200) | 背景图片URL | |
| status | SmallInt | 发布状态 (0-2) | ✅ |
| enableApplet | Boolean | 启用小程序 | |
| enableWeb | Boolean | 启用H5 | |
| enableApp | Boolean | 启用APP | |
| isTop | Boolean | 是否置顶 | ✅ |
| isPopup | Boolean | 是否弹窗 | |
| sortOrder | Int | 排序权重 | ✅ |
| viewCount | Int | 阅读次数 | |
| createdAt | DateTime | 创建时间 | ✅ |
| updatedAt | DateTime | 更新时间 | |
| deletedAt | DateTime | 软删除时间 | |

### 索引优化

```sql
-- 查询已发布且在有效期内的通知
@@index([status, startTime, endTime])

-- 按类型和状态查询
@@index([type, status])

-- 排序相关字段
@@index([priority, isTop, sortOrder])

-- 按创建时间查询
@@index([createdAt])
```

## API 接口

### 基础路径
```
/client/notice
```

### 接口列表

#### 1. 创建通知
```http
POST /client/notice
Authorization: Bearer <token>
```

**请求体：**
```json
{
  "title": "系统维护通知",
  "content": "系统将于今晚进行维护升级...",
  "type": 1,
  "priority": 2,
  "startTime": "2024-01-01T00:00:00.000Z",
  "endTime": "2024-12-31T23:59:59.999Z",
  "enableApplet": true,
  "enableWeb": true,
  "enableApp": true,
  "isTop": false,
  "isPopup": false
}
```

#### 2. 分页查询通知
```http
GET /client/notice?pageSize=15&pageIndex=0&type=1&status=1
Authorization: Bearer <token>
```

**查询参数：**
- `pageSize`: 页面大小 (默认15，最大100)
- `pageIndex`: 页码 (从0开始)
- `title`: 标题模糊搜索
- `type`: 通知类型 (1-4)
- `priority`: 优先级 (1-4)
- `status`: 发布状态 (0-2)
- `isTop`: 是否置顶
- `isPopup`: 是否弹窗
- `startDate`: 开始时间
- `endDate`: 结束时间

#### 3. 获取有效通知
```http
GET /client/notice/active?platform=web
```

**查询参数：**
- `platform`: 平台类型 (`applet` | `web` | `app`)

#### 4. 获取弹窗通知
```http
GET /client/notice/popup?platform=web
```

#### 5. 获取通知详情
```http
GET /client/notice/:id
```

#### 6. 更新通知
```http
PATCH /client/notice/:id
Authorization: Bearer <token>
```

#### 7. 更新通知状态
```http
PATCH /client/notice/:id/status
Authorization: Bearer <token>
```

**请求体：**
```json
{
  "status": 1
}
```

#### 8. 增加阅读次数
```http
POST /client/notice/:id/read
```

#### 9. 删除通知
```http
DELETE /client/notice/:id
Authorization: Bearer <token>
```

#### 10. 批量删除通知
```http
DELETE /client/notice/batch
Authorization: Bearer <token>
```

**请求体：**
```json
{
  "ids": [1, 2, 3]
}
```

#### 11. 获取统计信息
```http
GET /client/notice/statistics
Authorization: Bearer <token>
```

**响应：**
```json
{
  "total": 100,
  "published": 80,
  "unpublished": 15,
  "offline": 5
}
```

## 枚举常量

### 通知类型 (NoticeTypeEnum)
- `1`: 系统通知
- `2`: 活动公告
- `3`: 维护通知
- `4`: 更新公告

### 优先级 (NoticePriorityEnum)
- `1`: 低
- `2`: 中
- `3`: 高
- `4`: 紧急

### 发布状态 (NoticeStatusEnum)
- `0`: 未发布
- `1`: 已发布
- `2`: 已下线

### 平台类型 (PlatformEnum)
- `applet`: 小程序
- `web`: H5网页
- `app`: 移动应用

## 使用示例

### 1. 在其他模块中使用

```typescript
import { NoticeService, NoticeTypeEnum } from '@/modules/client/notice'

@Injectable()
export class SomeService {
  constructor(private readonly noticeService: NoticeService) {}

  async getSystemNotices() {
    return this.noticeService.findMany({
      type: NoticeTypeEnum.SYSTEM,
      status: 1,
      pageSize: 10,
      pageIndex: 0,
    })
  }
}
```

### 2. 前端调用示例

```typescript
// 获取有效通知列表
const notices = await api.get('/client/notice/active?platform=web')

// 创建通知
const newNotice = await api.post('/client/notice', {
  title: '新通知',
  content: '通知内容',
  type: 1,
  priority: 2,
})

// 标记通知已读
const readResult = await api.post(`/client/notice/${noticeId}/read`)
```

## 性能优化建议

### 1. 查询优化
- 使用索引字段进行查询
- 避免全表扫描
- 合理使用分页

### 2. 缓存策略
- 活跃通知列表缓存 5 分钟
- 通知详情缓存 10 分钟
- 统计信息缓存 1 小时

### 3. 数据库优化
- 定期清理软删除的数据
- 监控慢查询
- 合理设置连接池

## 注意事项

1. **时间范围验证**：创建和更新通知时会验证开始时间不能大于等于结束时间
2. **软删除**：删除操作使用软删除，不会物理删除数据
3. **权限控制**：管理类接口需要JWT认证
4. **批量操作限制**：批量删除最多支持100条记录
5. **平台兼容性**：通知支持多平台独立控制显示

## 扩展功能

### 可扩展的功能点
- 通知模板管理
- 定时发布功能
- 通知推送集成
- 用户通知偏好设置
- 通知阅读状态跟踪
- 通知分类管理
- 富文本内容支持
- 多语言支持