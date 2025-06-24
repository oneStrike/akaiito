# 抽象数据库服务层使用指南

## 概述

`BaseRepositoryService`
是一个通用的抽象数据库服务层，基于 NestJS 和 Prisma 构建。它提供了标准化的 CRUD 操作、分页查询、批量操作、事务处理、软删除等功能，帮助开发者快速构建数据访问层。

## 特性

- 🚀 **通用 CRUD 操作**：创建、读取、更新、删除
- 📄 **分页查询**：内置分页支持，自动计算总数
- 🔍 **灵活查询**：支持复杂的 where 条件、排序、关联查询
- 📦 **批量操作**：批量创建、更新、删除
- 🗑️ **软删除支持**：可选的软删除功能，自动过滤已删除记录
- 🔄 **事务支持**：安全的事务操作
- 📊 **统计功能**：记录计数、存在性检查
- 🛡️ **类型安全**：完整的 TypeScript 类型支持
- 📝 **日志记录**：详细的操作日志
- ⚡ **性能优化**：字段选择、关联查询优化

## 快速开始

### 1. 创建仓储服务

继承 `BaseRepositoryService` 并实现必要的抽象方法：

```typescript
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'
import {
  BaseRepositoryService,
  PaginationResult,
  BatchResult,
} from './base-repository.service'
import { User, Prisma } from '@/prisma/client'

@Injectable()
export class UserRepositoryService extends BaseRepositoryService<
  User, // 数据模型类型
  Prisma.UserWhereInput, // 查询条件类型
  Prisma.UserCreateInput, // 创建数据类型
  Prisma.UserUpdateInput, // 更新数据类型
  Prisma.UserOrderByWithRelationInput, // 排序条件类型
  Prisma.UserInclude, // 关联查询类型
  Prisma.UserSelect // 字段选择类型
> {
  protected readonly modelName = 'User' // 模型名称（用于日志）
  protected readonly supportsSoftDelete = true // 启用软删除功能（可选）

  constructor(prisma: PrismaService) {
    super(prisma)
  }

  // 实现抽象方法：返回对应的 Prisma 模型
  protected getModel() {
    return this.prisma.user
  }

  // 可以添加业务特定的方法
  async findByEmail(email: string): Promise<User | null> {
    return this.findFirst({ email })
  }
}
```

### 2. 注册服务

在模块中注册你的仓储服务：

```typescript
import { Module } from '@nestjs/common'
import { UserRepositoryService } from './user-repository.service'

@Module({
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class UserModule {}
```

### 3. 使用服务

在其他服务中注入并使用：

```typescript
import { Injectable } from '@nestjs/common'
import { UserRepositoryService } from './user-repository.service'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepositoryService) {}

  async createUser(userData: CreateUserDto) {
    return this.userRepository.create({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })
  }

  async getUserById(id: number) {
    return this.userRepository.findById(id)
  }

  async getUsers(page: number, pageSize: number) {
    return this.userRepository.findManyWithPagination(page, pageSize)
  }
}
```

## API 参考

### 基础 CRUD 操作

#### 创建操作

```typescript
// 创建单条记录
const user = await userService.create({
  name: 'John Doe',
  email: 'john@example.com',
})

// 批量创建
const users = await userService.createMany([
  { name: 'User 1', email: 'user1@example.com' },
  { name: 'User 2', email: 'user2@example.com' },
])
```

#### 查询操作

```typescript
// 根据 ID 查找
const user = await userService.findById(1)

// 根据条件查找单条记录
const user = await userService.findFirst({
  email: 'john@example.com',
})

// 查找多条记录
const users = await userService.findMany(
  {
    status: 'active',
  },
  {
    createdAt: 'desc',
  },
)

// 分页查询
const result = await userService.findManyWithPagination(
  1, // 页码
  10, // 每页大小
  { status: 'active' }, // 查询条件
  { createdAt: 'desc' }, // 排序
  { posts: true }, // 关联查询
  { id: true, name: true, email: true }, // 字段选择
)
```

#### 更新操作

```typescript
// 根据 ID 更新
const user = await userService.updateById(1, {
  name: 'Updated Name',
})

// 批量更新
const result = await userService.updateMany(
  { status: 'inactive' },
  { status: 'active' },
)
```

#### 删除操作

```typescript
// 根据 ID 删除
const user = await userService.deleteById(1)

// 批量删除
const result = await userService.deleteMany({
  status: 'inactive',
})
```

### 软删除功能

当启用软删除功能时（`supportsSoftDelete = true`），所有查询操作会自动过滤已软删除的记录。

#### 软删除操作

```typescript
// 软删除单条记录
const user = await userService.softDelete(1)

// 批量软删除
const result = await userService.softDeleteMany({
  status: 'inactive',
})

// 恢复软删除的记录
const user = await userService.restore(1)

// 批量恢复
const result = await userService.restoreMany({
  deletedAt: { not: null },
})

// 永久删除（物理删除）
const user = await userService.forceDelete(1)

// 批量永久删除
const result = await userService.forceDeleteMany({
  deletedAt: { not: null },
})
```

#### 包含软删除记录的查询

```typescript
// 查找包含软删除记录
const users = await userService.findManyWithDeleted({
  name: { contains: 'John' },
})

// 只查找软删除记录
const deletedUsers = await userService.findOnlyDeleted({
  deletedAt: { gte: new Date('2024-01-01') },
})

// 包含软删除记录的分页查询
const result = await userService.findManyWithDeletedPagination(1, 10, {
  status: 'active',
})

// 只查找软删除记录的分页查询
const result = await userService.findOnlyDeletedPagination(1, 10, {
  deletedAt: { gte: new Date('2024-01-01') },
})

// 统计包含软删除记录
const totalCount = await userService.countWithDeleted()

// 只统计软删除记录
const deletedCount = await userService.countOnlyDeleted()

// 获取软删除统计信息
const stats = await userService.getSoftDeleteStats()
// 返回: { total: number, active: number, deleted: number }
```

### 高级操作

#### 统计和检查

```typescript
// 统计记录数量
const count = await userRepository.count({ status: 'active' })

// 检查记录是否存在
const exists = await userRepository.exists({ email: 'john@example.com' })
```

#### 创建或更新（Upsert）

```typescript
const user = await userRepository.upsert(
  { email: 'john@example.com' }, // 查询条件
  {
    // 创建数据
    email: 'john@example.com',
    username: 'john',
  },
  {
    // 更新数据
    username: 'john_updated',
  },
)
```

#### 事务操作

```typescript
const result = await userRepository.transaction(async (prisma) => {
  const user = await prisma.user.create({
    data: { username: 'john', email: 'john@example.com' },
  })

  await prisma.profile.create({
    data: { userId: user.id, bio: 'Hello world' },
  })

  return user
})
```

#### 原始查询

```typescript
// 原始查询
const users = await userRepository.queryRaw<User[]>(
  'SELECT * FROM users WHERE created_at > ?',
  new Date('2023-01-01'),
)

// 原始操作
const affectedRows = await userRepository.executeRaw(
  'UPDATE users SET status = ? WHERE created_at < ?',
  'inactive',
  new Date('2022-01-01'),
)
```

### 关联查询和字段选择

```typescript
// 包含关联数据
const user = await userRepository.findById(1, {
  profile: true,
  posts: {
    include: {
      comments: true,
    },
  },
})

// 选择特定字段
const user = await userRepository.findById(1, undefined, {
  id: true,
  username: true,
  email: true,
  password: false, // 排除密码字段
})
```

## 最佳实践

### 1. 业务特定方法

在继承的仓储服务中添加业务特定的方法：

```typescript
export class UserRepositoryService extends BaseRepositoryService<...> {
  // ... 基础配置

  // 业务特定方法
  async findByEmail(email: string): Promise<User | null> {
    return this.findFirst({ email })
  }

  async findActiveUsers(page: number = 1, pageSize: number = 10) {
    return this.findManyWithPagination(
      page,
      pageSize,
      { status: 'active' },
      { createdAt: 'desc' }
    )
  }

  async isEmailExists(email: string, excludeId?: number): Promise<boolean> {
    const where: Prisma.UserWhereInput = { email }
    if (excludeId) {
      where.id = { not: excludeId }
    }
    return this.exists(where)
  }
}
```

### 2. 错误处理

服务层已经包含了基础的错误处理和日志记录，但你可以在业务层添加更具体的错误处理：

```typescript
async createUser(userData: CreateUserDto) {
  try {
    // 检查邮箱是否已存在
    const emailExists = await this.userRepository.isEmailExists(userData.email)
    if (emailExists) {
      throw new ConflictException('邮箱已存在')
    }

    return await this.userRepository.create(userData)
  } catch (error) {
    if (error instanceof ConflictException) {
      throw error
    }
    throw new InternalServerErrorException('创建用户失败')
  }
}
```

### 3. 类型安全

充分利用 TypeScript 的类型系统：

```typescript
// 定义明确的返回类型
async getUserProfile(id: number): Promise<UserWithProfile | null> {
  return this.userRepository.findById(id, {
    profile: true
  }) as Promise<UserWithProfile | null>
}

// 使用类型断言确保类型安全
type UserWithProfile = User & {
  profile: Profile | null
}
```

### 4. 性能优化

```typescript
// 只选择需要的字段
async getUserList() {
  return this.userRepository.findMany(
    undefined,
    { createdAt: 'desc' },
    undefined,
    undefined,
    undefined,
    {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      // 排除不需要的字段
      password: false
    }
  )
}

// 使用分页避免大量数据查询
async getUsers(page: number, pageSize: number) {
  return this.userRepository.findManyWithPagination(page, pageSize)
}
```

## 注意事项

1. **模型名称**：确保 `modelName` 属性正确设置，它用于日志记录
2. **泛型类型**：正确设置所有泛型类型参数，确保类型安全
3. **错误处理**：虽然基础服务提供了错误处理，但建议在业务层添加更具体的错误处理
4. **性能考虑**：合理使用 `select` 和 `include` 选项，避免查询不必要的数据
5. **事务使用**：对于需要保证数据一致性的操作，使用事务方法

## 扩展示例

查看 `user-repository.service.ts` 文件，了解完整的使用示例，包括：

- 业务特定方法的实现
- 复杂查询条件的构建
- 软删除的实现
- 统计方法的实现
- 搜索功能的实现

这个抽象服务层为你的应用提供了一个强大、类型安全且易于使用的数据库操作基础。
