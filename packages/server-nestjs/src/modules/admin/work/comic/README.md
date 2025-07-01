# 漫画管理模块 (Comic Module)

## 概述

漫画管理模块提供了完整的漫画内容管理功能，包括漫画的创建、编辑、查询、状态管理等核心业务逻辑。

## 功能特性

### 📚 基础管理
- **漫画创建**: 支持创建新的漫画作品，包含完整的元数据信息
- **漫画编辑**: 支持更新漫画的各种属性和内容信息
- **漫画查询**: 提供多维度的查询和筛选功能
- **软删除**: 支持漫画的软删除和恢复操作

### 🎯 状态管理
- **发布状态**: 草稿、已发布、已下架、审核中、审核失败
- **连载状态**: 连载中、已完结、暂停连载、已停更
- **运营标记**: 推荐、热门、新作等运营标识

### 📊 统计功能
- **阅读统计**: 总阅读次数、章节阅读数汇总
- **互动统计**: 收藏数、点赞数、评论数
- **评分系统**: 用户评分和平均评分计算
- **章节统计**: 总章节数、已发布章节数

### 🔍 SEO优化
- **SEO字段**: 标题、描述、关键词优化
- **URL别名**: 支持自定义SEO友好的URL
- **标签系统**: 支持多标签分类和搜索

## API 接口

### 基础CRUD操作

```typescript
// 创建漫画
POST /admin/work/comic

// 分页查询漫画列表
GET /admin/work/comic

// 获取漫画详情
GET /admin/work/comic/:id

// 更新漫画信息
PATCH /admin/work/comic/:id

// 软删除漫画
DELETE /admin/work/comic/:id
```

### 批量操作

```typescript
// 批量更新发布状态
PATCH /admin/work/comic/batch/status

// 批量更新推荐状态
PATCH /admin/work/comic/batch/recommended

// 批量更新热门状态
PATCH /admin/work/comic/batch/hot

// 批量更新新作状态
PATCH /admin/work/comic/batch/new
```

### 统计和互动

```typescript
// 更新统计数据
PATCH /admin/work/comic/:id/stats

// 更新评分
PATCH /admin/work/comic/:id/rating

// 增加收藏数
PATCH /admin/work/comic/:id/favorite

// 增加点赞数
PATCH /admin/work/comic/:id/like

// 增加评论数
PATCH /admin/work/comic/:id/comment
```

## 数据模型

### 核心字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | number | 漫画ID |
| name | string | 漫画名称 |
| alias | string | 漫画别名 |
| cover | string | 封面图片URL |
| thumbnail | string | 缩略图URL |
| description | text | 漫画简介 |
| detailDescription | text | 详细描述 |

### 状态字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| publishStatus | enum | 发布状态 |
| serialStatus | enum | 连载状态 |
| isFinished | boolean | 是否完结 |
| isRecommended | boolean | 是否推荐 |
| isHot | boolean | 是否热门 |
| isNew | boolean | 是否新作 |

### 统计字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| totalChapters | number | 总章节数 |
| publishedChapters | number | 已发布章节数 |
| totalViews | number | 总阅读次数 |
| favoriteCount | number | 收藏数 |
| commentCount | number | 评论数 |
| likeCount | number | 点赞数 |
| rating | number | 平均评分 |
| ratingCount | number | 评分人数 |

### SEO字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| seoTitle | string | SEO标题 |
| seoDescription | string | SEO描述 |
| seoKeywords | string | SEO关键词 |
| slug | string | URL别名 |
| tags | string | 标签(JSON格式) |

## 技术架构

### 服务层 (Service)
- **WorkComicService**: 继承自 `BaseRepositoryService`
- 提供完整的业务逻辑实现
- 支持软删除和数据验证
- 包含统计数据维护功能

### 控制器层 (Controller)
- **WorkComicController**: RESTful API接口
- 完整的CRUD操作支持
- 批量操作接口
- 统计和互动接口

### 数据传输对象 (DTO)
- **CreateComicDto**: 创建漫画数据验证
- **UpdateComicDto**: 更新漫画数据验证
- **QueryComicDto**: 查询条件验证
- **批量操作DTO**: 各种批量操作的数据验证

## 使用示例

### 创建漫画

```typescript
const createComicDto = {
  name: '进击的巨人',
  alias: 'Attack on Titan,進撃の巨人',
  cover: 'https://example.com/cover.jpg',
  description: '这是一部关于巨人的漫画...',
  language: 'zh-CN',
  region: 'CN',
  ageRating: 'PG13',
  publishStatus: ComicPublishStatusEnum.PUBLISHED,
  serialStatus: ComicSerialStatusEnum.COMPLETED,
  readRule: ComicReadRuleEnum.FREE,
  tags: '["热血","冒险","战斗"]'
}

const comic = await comicService.createComic(createComicDto)
```

### 查询漫画

```typescript
const queryDto = {
  name: '进击',
  publishStatus: ComicPublishStatusEnum.PUBLISHED,
  isRecommended: true,
  pageIndex: 0,
  pageSize: 20
}

const result = await comicService.getComicPage(queryDto)
```

### 批量更新状态

```typescript
const updateStatusDto = {
  ids: [1, 2, 3],
  publishStatus: ComicPublishStatusEnum.PUBLISHED
}

const result = await comicService.updateComicStatus(updateStatusDto)
```

## 目录结构

```
comic/
├── README.md                 # 模块说明文档
├── comic.constant.ts         # 常量和枚举定义
├── comic.controller.ts       # 控制器层
├── comic.service.ts          # 服务层
├── comic.module.ts           # 模块定义
└── dto/
    └── comic.dto.ts          # 数据传输对象
```

## 注意事项

1. **数据验证**: 所有输入数据都经过严格的验证
2. **唯一性约束**: 漫画名称和URL别名必须唯一
3. **软删除**: 删除操作为软删除，数据可恢复
4. **关联检查**: 删除漫画前会检查是否有关联章节
5. **统计维护**: 统计数据需要定期更新维护
6. **标签格式**: 标签必须为有效的JSON数组格式

## 扩展功能

- 支持与作者模块的关联管理
- 支持与分类模块的关联管理
- 支持与章节模块的关联管理
- 提供丰富的查询和筛选条件
- 支持批量操作提高管理效率