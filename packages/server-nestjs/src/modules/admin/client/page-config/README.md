# ClientPageConfig 模块

客户端页面配置管理模块，用于管理系统中各个页面的配置信息，包括页面权限、状态、访问统计等功能。

## 功能特性

### 核心功能
- ✅ 页面配置的增删改查
- ✅ 页面状态管理（启用/禁用/开发中/维护中）
- ✅ 页面权限级别控制（公开/用户/管理员/VIP）
- ✅ 页面访问次数统计
- ✅ 软删除和恢复功能
- ✅ 批量操作支持
- ✅ 页面与通知的关联管理

### 数据模型
```prisma
model ClientPageConfig {
  id          Int              @id @default(autoincrement())
  pageCode    String           @unique @db.VarChar(50)   // 页面编码
  pagePath    String           @unique @db.VarChar(200)  // 页面路径
  pageName    String           @db.VarChar(100)          // 页面名称
  pageTitle   String           @db.VarChar(200)          // 页面标题
  pageRule    PageRuleEnum     @default(PUBLIC)          // 页面权限级别
  status      PageStatusEnum   @default(ENABLED)         // 页面状态
  description String?          @db.VarChar(500)          // 页面描述
  sortOrder   Int              @default(0)               // 排序
  viewCount   Int              @default(0)               // 访问次数
  createdAt   DateTime         @default(now())           // 创建时间
  updatedAt   DateTime         @updatedAt                // 更新时间
  deletedAt   DateTime?                                  // 删除时间
  notices     ClientNotice[]                             // 关联的通知
}
```

## API 接口

### 管理端接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/admin/page-config/create` | 创建页面配置 |
| GET | `/admin/page-config/page` | 分页查询页面配置列表 |
| GET | `/admin/page-config/active` | 获取启用的页面配置列表 |
| GET | `/admin/page-config/detail/:id` | 根据ID查询页面配置详情 |
| GET | `/admin/page-config/code/:pageCode` | 根据页面编码查询详情 |
| POST | `/admin/page-config/update` | 更新页面配置 |
| POST | `/admin/page-config/update-status` | 更新页面配置状态 |
| POST | `/admin/page-config/batch-update-status` | 批量更新页面配置状态 |
| POST | `/admin/page-config/increment-view` | 增加页面访问次数 |
| POST | `/admin/page-config/delete` | 软删除页面配置 |
| POST | `/admin/page-config/batch-delete` | 批量软删除页面配置 |
| POST | `/admin/page-config/restore` | 恢复已删除的页面配置 |
| POST | `/admin/page-config/force-delete` | 永久删除页面配置 |
| GET | `/admin/page-config/statistics` | 获取页面配置统计信息 |

## 数据传输对象 (DTO)

### CreateClientPageConfigDto
创建页面配置的数据传输对象
```typescript
{
  pageCode: string      // 页面编码（必填，唯一）
  pagePath: string      // 页面路径（必填，唯一）
  pageName: string      // 页面名称（必填）
  pageTitle: string     // 页面标题（必填）
  pageRule?: PageRuleEnum    // 页面权限级别（可选，默认PUBLIC）
  status?: PageStatusEnum    // 页面状态（可选，默认ENABLED）
  description?: string       // 页面描述（可选）
  sortOrder?: number         // 排序（可选，默认0）
}
```

### UpdateClientPageConfigDto
更新页面配置的数据传输对象
```typescript
{
  id: number           // 页面配置ID（必填）
  pageCode?: string    // 页面编码（可选）
  pagePath?: string    // 页面路径（可选）
  pageName?: string    // 页面名称（可选）
  pageTitle?: string   // 页面标题（可选）
  pageRule?: PageRuleEnum    // 页面权限级别（可选）
  status?: PageStatusEnum    // 页面状态（可选）
  description?: string       // 页面描述（可选）
  sortOrder?: number         // 排序（可选）
}
```

### QueryClientPageConfigDto
查询页面配置的数据传输对象
```typescript
{
  pageName?: string         // 页面名称（模糊搜索）
  pageCode?: string         // 页面编码（精确匹配）
  pageRule?: PageRuleEnum   // 页面权限级别
  status?: PageStatusEnum   // 页面状态
  page?: number            // 页码
  pageSize?: number        // 每页数量
}
```

## 枚举定义

### PageRuleEnum - 页面权限级别
```typescript
enum PageRuleEnum {
  PUBLIC = 'PUBLIC',      // 公开页面 - 无需登录即可访问
  USER = 'USER',          // 用户页面 - 需要登录才能访问
  ADMIN = 'ADMIN',        // 管理员页面 - 需要管理员权限才能访问
  VIP = 'VIP',            // VIP页面 - 需要VIP权限才能访问
}
```

### PageStatusEnum - 页面状态
```typescript
enum PageStatusEnum {
  ENABLED = 'ENABLED',        // 启用 - 页面正常可用
  DISABLED = 'DISABLED',      // 禁用 - 页面暂时不可用
  DEVELOPING = 'DEVELOPING',  // 开发中 - 页面正在开发中
  MAINTENANCE = 'MAINTENANCE', // 维护中 - 页面正在维护中
}
```

## 业务逻辑

### 页面配置创建
1. 验证页面编码唯一性
2. 验证页面路径唯一性
3. 设置默认值（权限级别、状态、排序等）
4. 创建页面配置记录

### 页面配置查询
1. 支持按页面名称模糊搜索
2. 支持按页面编码精确匹配
3. 支持按权限级别和状态过滤
4. 支持分页查询
5. 默认按排序和创建时间排序

### 页面配置更新
1. 验证页面配置存在性
2. 如果更新页面编码，验证新编码唯一性
3. 如果更新页面路径，验证新路径唯一性
4. 更新指定字段

### 访问次数统计
1. 验证页面存在且启用
2. 原子性增加访问次数
3. 返回更新后的访问次数

### 软删除机制
1. 支持单个和批量软删除
2. 支持恢复已删除的页面配置
3. 支持永久删除

## 使用示例

### 创建页面配置
```typescript
const createDto: CreateClientPageConfigDto = {
  pageCode: 'home',
  pagePath: '/home',
  pageName: '首页',
  pageTitle: '系统首页',
  pageRule: PageRuleEnum.PUBLIC,
  status: PageStatusEnum.ENABLED,
  description: '系统主页面',
  sortOrder: 1
}

const result = await pageConfigService.createPageConfig(createDto)
```

### 查询页面配置
```typescript
const queryDto: QueryClientPageConfigDto = {
  pageName: '首页',
  status: PageStatusEnum.ENABLED,
  page: 1,
  pageSize: 10
}

const result = await pageConfigService.findPageConfigPage(queryDto)
```

### 增加访问次数
```typescript
const result = await pageConfigService.incrementViewCount('home')
```

## 注意事项

1. **唯一性约束**：页面编码和页面路径必须唯一
2. **软删除**：删除操作默认为软删除，可以恢复
3. **权限控制**：根据页面权限级别控制访问权限
4. **状态管理**：只有启用状态的页面才能正常访问
5. **关联数据**：删除页面配置时需要考虑关联的通知数据
6. **性能优化**：访问次数更新使用原子操作避免并发问题

## 扩展功能

- 页面配置缓存机制
- 页面访问日志记录
- 页面性能监控
- 页面A/B测试支持
- 页面个性化配置