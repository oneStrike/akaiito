# 漫画章节管理模块 (WorkComicChapter Module)

## 概述

漫画章节管理模块提供了完整的漫画章节信息管理功能，包括章节的增删改查、发布状态管理、查看权限设置等核心业务功能。该模块严格按照 NestJS 11 规范开发，采用了现代化的架构设计和最佳实践。

## 功能特性

### 核心功能

- ✅ **章节信息管理**：创建、更新、删除章节信息
- ✅ **分页查询**：支持多条件筛选的分页查询
- ✅ **发布状态管理**：批量发布/取消发布章节
- ✅ **查看权限管理**：设置章节查看规则（公开/登录/会员/购买）
- ✅ **软删除**：支持软删除和恢复功能
- ✅ **内容管理**：支持JSON格式的图片内容存储
- ✅ **搜索功能**：支持按标题、漫画ID等字段搜索
- ✅ **排序功能**：支持章节号和自定义排序权重

### 高级功能

- ✅ **试读章节**：支持设置试读章节用于营销
- ✅ **付费章节**：支持设置购买金额的付费章节
- ✅ **统计信息**：阅读次数、点赞数、评论数统计
- ✅ **发布时间**：支持定时发布功能
- ✅ **缩略图**：章节封面图片管理

## 技术架构

### 目录结构

```
src/modules/admin/work/comic-chapter/
├── dto/
│   └── comic-chapter.dto.ts    # 数据传输对象定义
├── comic-chapter.constant.ts   # 常量和枚举定义
├── comic-chapter.controller.ts # 控制器层
├── comic-chapter.service.ts    # 服务层
├── comic-chapter.module.ts     # 模块定义
└── README.md                   # 文档说明
```

### 技术栈

- **框架**: NestJS 11.0.1
- **数据库**: Prisma ORM 6.10.1
- **验证**: class-validator + class-transformer
- **文档**: Swagger/OpenAPI
- **架构**: 分层架构 (Controller -> Service -> Repository)

## API 接口

### 基础 CRUD

| 方法 | 路径                                           | 描述             |
| ---- | ---------------------------------------------- | ---------------- |
| POST | `/admin/work/comic-chapter/create-comic-chapter` | 创建章节         |
| GET  | `/admin/work/comic-chapter/comic-chapter-page`   | 分页查询章节列表 |
| GET  | `/admin/work/comic-chapter/comic-chapter-detail` | 获取章节详情     |
| POST | `/admin/work/comic-chapter/update-comic-chapter` | 更新章节信息     |
| POST | `/admin/work/comic-chapter/delete-comic-chapter` | 软删除章节       |

### 批量操作

| 方法 | 路径                                                      | 描述             |
| ---- | --------------------------------------------------------- | ---------------- |
| POST | `/admin/work/comic-chapter/batch-update-chapter-publish-status` | 批量更新发布状态 |
| POST | `/admin/work/comic-chapter/batch-update-chapter-read-rule`      | 批量更新查看规则 |
| POST | `/admin/work/comic-chapter/batch-delete-comic-chapter`          | 批量软删除章节   |
| POST | `/admin/work/comic-chapter/restore-comic-chapter`               | 恢复软删除的章节 |

### 特殊功能

| 方法 | 路径                                              | 描述                 |
| ---- | ------------------------------------------------- | -------------------- |
| GET  | `/admin/work/comic-chapter/chapters-by-comic`    | 获取指定漫画的章节列表 |

## 数据模型

### 章节信息字段

```typescript
interface WorkComicChapter {
  id: number // 主键ID
  title: string // 章节标题
  subtitle?: string // 章节副标题
  isPublished: boolean // 发布状态
  comicId: number // 关联漫画ID
  chapterNumber: number // 章节序号
  sortOrder: number // 排序权重
  readRule: ChapterReadRuleEnum // 查看规则
  purchaseAmount: number // 购买金额
  contents: string // 漫画内容(JSON)
  isPreview: boolean // 是否试读章节
  publishAt?: Date // 发布时间
  thumbnail?: string // 缩略图
  viewCount: number // 阅读次数
  likeCount: number // 点赞数
  commentCount: number // 评论数
  remark?: string // 管理员备注
  createdAt: Date // 创建时间
  updatedAt: Date // 更新时间
  deletedAt?: Date // 软删除时间
}
```

### 枚举定义

```typescript
// 章节查看规则
enum ChapterReadRuleEnum {
  PUBLIC = 0, // 公开
  LOGIN = 1, // 登录
  VIP = 2, // 会员
  PURCHASE = 3, // 购买
}

// 章节发布状态
enum ChapterPublishStatusEnum {
  UNPUBLISHED = 0, // 未发布
  PUBLISHED = 1, // 已发布
}

// 章节类型
enum ChapterTypeEnum {
  NORMAL = 0, // 正常章节
  PREVIEW = 1, // 试读章节
}
```

## 使用示例

### 创建章节

```typescript
const createChapterDto: CreateComicChapterDto = {
  title: '第一话：开始的故事',
  subtitle: '主角的冒险开始了',
  comicId: 1,
  chapterNumber: 1.0,
  sortOrder: 100,
  readRule: ChapterReadRuleEnum.PUBLIC,
  contents: '["https://example.com/page1.jpg", "https://example.com/page2.jpg"]',
  isPreview: false,
  purchaseAmount: 0,
}

const result = await comicChapterService.createComicChapter(createChapterDto)
```

### 分页查询

```typescript
const queryDto: QueryComicChapterDto = {
  page: 1,
  pageSize: 20,
  comicId: 1,
  isPublished: true,
  title: '第一话',
}

const result = await comicChapterService.getComicChapterPage(queryDto)
```

### 批量操作

```typescript
// 批量发布章节
const updatePublishStatusDto: UpdateChapterPublishStatusDto = {
  ids: [1, 2, 3],
  isPublished: true,
}

const result = await comicChapterService.updateChapterPublishStatus(updatePublishStatusDto)

// 批量更新查看规则
const updateReadRuleDto: UpdateChapterReadRuleDto = {
  ids: [1, 2, 3],
  readRule: ChapterReadRuleEnum.VIP,
}

const result = await comicChapterService.updateChapterReadRule(updateReadRuleDto)
```

## 业务规则

### 数据验证

1. **章节号唯一性**：同一漫画下章节号必须唯一
2. **漫画关联性**：创建章节时必须关联有效的漫画
3. **内容格式**：漫画内容必须是有效的JSON数组格式
4. **购买金额**：付费章节的购买金额必须大于0
5. **发布时间**：发布章节时自动设置发布时间

### 业务约束

1. **软删除**：删除章节使用软删除，保留数据用于恢复
2. **排序规则**：章节按排序权重和章节号进行排序
3. **权限控制**：不同查看规则对应不同的访问权限
4. **试读限制**：试读章节通常免费，用于吸引读者

## 性能优化

### 数据库优化

- **索引策略**：在comicId、chapterNumber、isPublished等字段上建立索引
- **查询优化**：分页查询时排除大字段(contents)以提升性能
- **关联查询**：获取详情时包含漫画基本信息

### 缓存策略

- **热点数据**：可对热门章节进行缓存
- **列表缓存**：章节列表可进行短时间缓存
- **内容缓存**：章节内容可进行CDN缓存

## 扩展性

### 集成能力

- 服务已导出，可供其他模块使用
- 支持事务操作
- 可以与漫画模块、用户模块集成
- 支持缓存集成

### 扩展方向

- 支持章节评论功能
- 集成支付系统
- 添加章节统计分析
- 支持章节推荐算法

## 注意事项

1. **数据一致性**：删除章节前需要检查关联数据
2. **并发安全**：批量操作使用事务保证数据一致性
3. **性能考虑**：大量数据时注意分页大小限制
4. **错误处理**：所有业务异常都有友好的错误提示
5. **权限控制**：需要在上层添加适当的权限验证
6. **内容安全**：章节内容需要进行安全检查

## 后续规划

- [ ] 添加章节评论功能
- [ ] 集成支付系统
- [ ] 添加章节统计功能
- [ ] 支持章节推荐功能
- [ ] 添加章节版本管理
- [ ] 集成内容审核功能
- [ ] 支持章节导入导出
- [ ] 添加章节模板功能