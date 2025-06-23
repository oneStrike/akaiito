# 作者管理模块 (WorkAuthor Module)

## 概述

作者管理模块提供了完整的作者信息管理功能，包括作者的增删改查、状态管理、推荐设置等核心业务功能。该模块严格按照 NestJS
11 规范开发，采用了现代化的架构设计和最佳实践。

## 功能特性

### 核心功能

- ✅ **作者信息管理**：创建、更新、删除作者信息
- ✅ **分页查询**：支持多条件筛选的分页查询
- ✅ **状态管理**：批量启用/禁用作者
- ✅ **推荐管理**：设置推荐作者用于前台展示
- ✅ **软删除**：支持软删除和恢复功能
- ✅ **统计信息**：提供作者相关的统计数据
- ✅ **搜索功能**：支持按姓名、描述等字段搜索
- ✅ **角色筛选**：按作者身份角色筛选（作家、插画家等）

### 高级功能

- ✅ **冗余字段维护**：自动维护作品数量、粉丝数量等统计字段
- ✅ **评分计算**：自动计算和更新作者平均评分
- ✅ **关联查询**：查询作者详情时包含关联作品信息
- ✅ **数据验证**：完整的输入数据验证和业务规则检查
- ✅ **错误处理**：友好的错误提示和异常处理

## 技术架构

### 目录结构

```
src/modules/admin/work/author/
├── dto/
│   └── author.dto.ts          # 数据传输对象定义
├── author.constant.ts         # 常量和枚举定义
├── author.controller.ts       # 控制器层
├── author.service.ts          # 服务层
├── author.module.ts           # 模块定义
└── README.md                  # 文档说明
```

### 技术栈

- **框架**: NestJS 11.0.1
- **ORM**: Prisma 6.10.1
- **验证**: class-validator + class-transformer
- **文档**: Swagger/OpenAPI
- **架构**: 继承 BaseRepositoryService 基础服务

## API 接口

### 基础 CRUD

| 方法   | 路径                            | 描述             |
| ------ | ------------------------------- | ---------------- |
| POST   | `/admin/work/author/create`     | 创建作者         |
| GET    | `/admin/work/author/page`       | 分页查询作者列表 |
| GET    | `/admin/work/author/detail/:id` | 获取作者详情     |
| PUT    | `/admin/work/author/update`     | 更新作者信息     |
| DELETE | `/admin/work/author/delete/:id` | 软删除作者       |

### 批量操作

| 方法   | 路径                              | 描述             |
| ------ | --------------------------------- | ---------------- |
| PUT    | `/admin/work/author/status`       | 批量更新作者状态 |
| PUT    | `/admin/work/author/featured`     | 批量更新推荐状态 |
| DELETE | `/admin/work/author/batch-delete` | 批量软删除作者   |
| PUT    | `/admin/work/author/restore/:id`  | 恢复软删除的作者 |

### 查询和统计

| 方法 | 路径                               | 描述             |
| ---- | ---------------------------------- | ---------------- |
| GET  | `/admin/work/author/stats`         | 获取作者统计信息 |
| GET  | `/admin/work/author/by-role/:role` | 根据角色查询作者 |
| GET  | `/admin/work/author/search`        | 搜索作者         |
| GET  | `/admin/work/author/featured`      | 获取推荐作者列表 |

### 维护操作

| 方法 | 路径                                        | 描述             |
| ---- | ------------------------------------------- | ---------------- |
| PUT  | `/admin/work/author/update-works-count/:id` | 更新作者作品数量 |
| PUT  | `/admin/work/author/update-rating/:id`      | 更新作者平均评分 |

## 数据模型

### 作者信息字段

```typescript
interface WorkAuthor {
  id: number // 主键ID
  name: string // 作者姓名
  avatar?: string // 作者头像URL
  description?: string // 作者描述
  isEnabled: boolean // 启用状态
  roles?: number // 身份角色（位运算）
  nationality?: string // 国籍
  gender: AuthorGenderEnum // 性别
  socialLinks?: string // 社交媒体链接（JSON）
  remark?: string // 管理员备注
  createdAt: Date // 创建时间
  updatedAt: Date // 更新时间
  worksCount: number // 作品数量
  followersCount: number // 粉丝数量
  rating?: number // 平均评分
  featured: boolean // 是否推荐
  deletedAt?: Date // 软删除时间
}
```

### 枚举定义

```typescript
// 作者身份角色（位运算）
enum AuthorRoleEnum {
  WRITER = 1, // 作家
  ILLUSTRATOR = 2, // 插画家
  CARTOONIST = 4, // 漫画家
  MODEL = 8, // 模特
}

// 作者性别
enum AuthorGenderEnum {
  UNKNOWN = 0, // 未知
  MALE = 1, // 男性
  FEMALE = 2, // 女性
  OTHER = 3, // 其他
}
```

## 使用示例

### 创建作者

```typescript
const createAuthorDto: CreateAuthorDto = {
  name: '村上春树',
  avatar: 'https://example.com/avatar.jpg',
  description: '日本著名小说家，代表作有《挪威的森林》等',
  isEnabled: true,
  roles: AuthorRoleEnum.WRITER,
  nationality: '日本',
  gender: AuthorGenderEnum.MALE,
  socialLinks: JSON.stringify({
    twitter: '@haruki_murakami',
    instagram: '@murakami_official',
  }),
  featured: true,
}

const result = await authorService.createAuthor(createAuthorDto)
```

### 分页查询

```typescript
const queryDto: QueryAuthorDto = {
  pageIndex: 1,
  pageSize: 20,
  name: '村上', // 模糊搜索
  isEnabled: true, // 只查询启用的作者
  gender: AuthorGenderEnum.MALE,
  featured: true, // 只查询推荐作者
}

const result = await authorService.getAuthorPage(queryDto)
```

### 批量操作

```typescript
// 批量启用作者
const updateStatusDto: UpdateAuthorStatusDto = {
  ids: [1, 2, 3],
  isEnabled: true,
}

const result = await authorService.updateAuthorStatus(updateStatusDto)
```

## 业务规则

### 数据验证

1. **作者姓名**：必填，不能重复
2. **社交媒体链接**：必须是有效的 JSON 格式
3. **评分范围**：0-5 分
4. **角色值**：使用位运算，支持多角色组合

### 业务约束

1. **删除限制**：有关联作品的作者不能删除
2. **状态管理**：禁用的作者不会在前台显示
3. **推荐限制**：只有启用的作者才能设为推荐
4. **软删除**：删除的作者可以恢复

### 冗余字段维护

1. **作品数量**：自动统计关联的有效作品数
2. **平均评分**：基于所有作品的平均评分计算
3. **粉丝数量**：需要其他模块维护

## 性能优化

### 数据库索引

- `isEnabled`: 按状态查询优化
- `roles`: 按角色查询优化
- `nationality`: 按国籍查询优化
- `gender`: 按性别查询优化
- `name`: 支持模糊搜索优化
- `createdAt`: 按创建时间排序优化
- `deletedAt`: 软删除筛选优化

### 查询优化

- 分页查询使用合理的默认排序
- 详情查询包含必要的关联数据
- 统计查询使用并发执行
- 搜索功能支持多字段匹配

## 扩展性

### 模块扩展

- 可以轻松添加新的查询条件
- 支持添加新的业务方法
- 可以扩展关联查询
- 支持添加新的统计维度

### 集成能力

- 服务已导出，可供其他模块使用
- 支持事务操作
- 可以与其他作品模块集成
- 支持缓存集成

## 注意事项

1. **数据一致性**：删除作者前需要检查关联数据
2. **并发安全**：批量操作使用事务保证数据一致性
3. **性能考虑**：大量数据时注意分页大小限制
4. **错误处理**：所有业务异常都有友好的错误提示
5. **权限控制**：需要在上层添加适当的权限验证

## 后续规划

- [ ] 添加作者关注功能
- [ ] 集成评分系统
- [ ] 添加作者标签功能
- [ ] 支持作者认证功能
- [ ] 添加作者收入统计
- [ ] 集成消息通知功能
