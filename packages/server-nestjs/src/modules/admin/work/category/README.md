# 分类管理模块 (WorkCategory)

基于 NestJS 11 构建的分类管理模块，提供完整的分类信息管理功能。

## 功能特性

### 基础功能

- **分类信息管理**: 创建、查询、更新、删除分类信息
- **分页查询**: 支持条件筛选的分页查询
- **状态管理**: 启用/禁用分类状态
- **排序管理**: 自定义分类显示顺序
- **应用类型**: 支持多种应用类型（漫画、小说等）

### 高级功能

- **名称唯一性**: 确保分类名称在同一应用类型下唯一
- **关联检查**: 删除前检查是否有关联作品
- **人气管理**: 分类人气值统计和更新
- **作品计数**: 自动维护分类下的作品数量
- **搜索功能**: 支持分类名称模糊搜索
- **热门分类**: 获取人气最高的分类列表
- **统计信息**: 提供分类相关的统计数据

## 技术架构

### 目录结构

```
category/
├── category.constant.ts    # 常量和枚举定义
├── dto/
│   └── category.dto.ts     # 数据传输对象
├── category.service.ts     # 业务逻辑层
├── category.controller.ts  # 控制器层
├── category.module.ts      # 模块定义
└── README.md              # 文档说明
```

### 技术栈

- **框架**: NestJS 11
- **数据库**: Prisma ORM
- **验证**: class-validator
- **文档**: Swagger/OpenAPI
- **类型**: TypeScript 严格模式

## API 接口

### 基础 CRUD

- `POST /admin/work/category/create-category` - 创建分类
- `GET /admin/work/category/category-page` - 分页查询分类
- `GET /admin/work/category/category-detail/:id` - 获取分类详情
- `PUT /admin/work/category/update-category` - 更新分类信息
- `DELETE /admin/work/category/delete-category/:id` - 删除分类

### 批量操作

- `PUT /admin/work/category/status` - 批量更新状态
- `PUT /admin/work/category/order` - 批量更新排序
- `DELETE /admin/work/category/delete-batch` - 批量删除

### 查询和统计

- `GET /admin/work/category/stats` - 获取统计信息
- `GET /admin/work/category/by-type/:applicableContentTypes` - 按应用类型查询
- `GET /admin/work/category/search` - 搜索分类
- `GET /admin/work/category/popular` - 获取热门分类

### 维护操作

- `PUT /admin/work/category/popularity` - 更新人气值
- `PUT /admin/work/category/count` - 更新作品数量

## 数据模型

### WorkCategory 接口

```typescript
interface WorkCategory {
  id: number
  name: string // 分类名称
  description?: string // 分类描述
  applicableContentTypes: number         // 应用类型
  status: CategoryStatusEnum // 状态
  order: number // 排序值
  popularity: number // 人气值
  workCount: number // 作品数量
  createdAt: Date
  updatedAt: Date
}
```

### 枚举定义

```typescript
// 应用类型
enum CategoryapplicableContentTypesEnum {
  COMIC = 1, // 漫画
  NOVEL = 2, // 小说
}

// 分类状态
enum CategoryStatusEnum {
  DISABLED = 0, // 禁用
  ENABLED = 1, // 启用
}

// 排序方式
enum CategoryOrderEnum {
  ASC = 'asc', // 升序
  DESC = 'desc', // 降序
}
```

## 使用示例

### 创建分类

```typescript
const createDto: CreateCategoryDto = {
  name: '科幻',
  description: '科幻类作品分类',
  applicableContentTypes: CategoryapplicableContentTypesEnum.COMIC,
  status: CategoryStatusEnum.ENABLED,
}

const result = await categoryService.createCategory(createDto)
```

### 分页查询

```typescript
const queryDto: QueryCategoryDto = {
  page: 1,
  pageSize: 10,
  name: '科幻',
  status: CategoryStatusEnum.ENABLED,
  applicableContentTypes: CategoryapplicableContentTypesEnum.COMIC,
}

const result = await categoryService.getCategoryPage(queryDto)
```

### 批量更新状态

```typescript
const updateDto: UpdateCategoryStatusDto = {
  ids: [1, 2, 3],
  status: CategoryStatusEnum.DISABLED,
}

const result = await categoryService.updateCategoryStatus(updateDto)
```

## 业务规则

### 名称唯一性

- 同一应用类型下分类名称必须唯一
- 创建和更新时自动验证

### 排序规则

- 新建分类自动分配最大排序值 + 1
- 支持批量调整排序
- 排序值必须为正整数

### 删除限制

- 有关联作品的分类不能删除
- 删除前自动检查关联关系
- 支持强制删除（需要额外权限）

### 状态管理

- 禁用的分类不会在前端显示
- 禁用分类下的作品仍然可以访问
- 支持批量状态切换

## 性能优化

### 数据库优化

- 在 `name` 和 `applicableContentTypes` 字段上建立复合索引
- 在 `status` 和 `order` 字段上建立索引
- 使用数据库级别的唯一约束

### 查询优化

- 分页查询使用游标分页
- 统计查询使用缓存机制
- 热门分类数据定期更新

### 缓存策略

- 分类列表缓存 5 分钟
- 热门分类缓存 30 分钟
- 统计数据缓存 1 小时

## 扩展性

### 水平扩展

- 支持数据库读写分离
- 支持分布式缓存
- 支持微服务架构

### 功能扩展

- 可扩展多级分类结构
- 可添加分类图标和颜色
- 可集成推荐算法

## 注意事项

1. **数据一致性**: 更新作品数量时注意事务处理
2. **并发控制**: 批量操作时注意锁机制
3. **权限控制**: 删除操作需要管理员权限
4. **数据验证**: 严格验证输入参数
5. **错误处理**: 提供详细的错误信息

## 后续规划

- [ ] 添加分类图标管理
- [ ] 实现多级分类结构
- [ ] 集成搜索引擎
- [ ] 添加分类推荐功能
- [ ] 实现分类标签系统
- [ ] 添加分类访问统计
