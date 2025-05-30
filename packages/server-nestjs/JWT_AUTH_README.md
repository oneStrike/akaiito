# JWT 认证系统使用说明

本项目实现了完整的 JWT 认证系统，支持 Admin 和 Client 两个独立的认证模块。

## 功能特性

- ✅ 基于 JWT 的无状态认证
- ✅ Access Token 和 Refresh Token 双令牌机制
- ✅ Admin 和 Client 独立的认证系统
- ✅ 密码加密存储（bcryptjs）
- ✅ 路由守卫和权限控制
- ✅ 公开路由装饰器
- ✅ 当前用户信息获取

## 环境配置

请确保在 `.env` 文件中配置以下环境变量：

```env
# JWT 配置
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="1h"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
JWT_REFRESH_EXPIRES_IN="7d"
```

## API 接口

### Admin 认证接口

#### 1. 管理员登录
```http
POST /admin/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password",
  "captcha": "1234",
  "captchaId": "uuid-string"
}
```

#### 2. 刷新令牌
```http
POST /admin/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. 管理员登出
```http
POST /admin/auth/logout
Authorization: Bearer <access_token>
```

#### 4. 获取当前管理员信息
```http
POST /admin/auth/profile
Authorization: Bearer <access_token>
```

### Client 认证接口

#### 1. 客户端用户注册
```http
POST /client/auth/register
Content-Type: application/json

{
  "username": "client001",
  "password": "password",
  "mobile": "13800138000"
}
```

#### 2. 客户端用户登录
```http
POST /client/auth/login
Content-Type: application/json

{
  "username": "client001",
  "password": "password"
}
```

#### 3. 刷新令牌
```http
POST /client/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 4. 客户端用户登出
```http
POST /client/auth/logout
Authorization: Bearer <access_token>
```

#### 5. 获取当前客户端用户信息
```http
POST /client/auth/profile
Authorization: Bearer <access_token>
```

## 在控制器中使用认证

### 1. 保护路由

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common'
import { AdminJwtAuthGuard } from '@/modules/admin/auth/guards/admin-jwt-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@Controller('admin/protected')
export class ProtectedController {
  @Get()
  @UseGuards(AdminJwtAuthGuard)
  async getProtectedData(@CurrentUser() user: any) {
    return {
      message: '这是受保护的数据',
      user,
    }
  }
}
```

### 2. 公开路由

```typescript
import { Controller, Post } from '@nestjs/common'
import { Public } from '@/common/decorators/public.decorator'

@Controller('public')
export class PublicController {
  @Post('data')
  @Public() // 标记为公开路由，不需要认证
  async getPublicData() {
    return {
      message: '这是公开数据',
    }
  }
}
```

### 3. 获取当前用户信息

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common'
import { ClientJwtAuthGuard } from '@/modules/client/auth/guards/client-jwt-auth.guard'
import { CurrentUser } from '@/common/decorators/current-user.decorator'

@Controller('client/user')
export class ClientUserController {
  @Get('profile')
  @UseGuards(ClientJwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      mobile: user.mobile,
    }
  }
}
```

## 数据库表结构

### Admin 用户表（假设已存在）
```sql
-- 管理员用户表
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(255),
  "mobile" VARCHAR(20),
  "status" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Client 用户表（需要创建）
```sql
-- 客户端用户表
CREATE TABLE "ClientUser" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(50) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "avatar" VARCHAR(255),
  "mobile" VARCHAR(20),
  "status" BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 项目结构

```
src/
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts    # 获取当前用户装饰器
│   │   └── public.decorator.ts          # 公开路由装饰器
│   ├── guards/
│   │   └── jwt-auth.guard.base.ts       # JWT 守卫基类
│   ├── services/
│   │   └── auth.service.base.ts         # 认证服务基类
│   └── strategies/
│       └── jwt.strategy.base.ts         # JWT 策略基类
├── config/
│   └── jwt.config.ts                    # JWT 配置
├── modules/
│   ├── admin/
│   │   ├── auth/
│   │   │   ├── guards/
│   │   │   │   └── admin-jwt-auth.guard.ts
│   │   │   ├── strategies/
│   │   │   │   └── admin-jwt.strategy.ts
│   │   │   ├── admin-auth.controller.ts
│   │   │   ├── admin-auth.module.ts
│   │   │   └── admin-auth.service.ts
│   │   └── admin.module.ts
│   └── client/
│       ├── auth/
│       │   ├── guards/
│       │   │   └── client-jwt-auth.guard.ts
│       │   ├── strategies/
│       │   │   └── client-jwt.strategy.ts
│       │   ├── client-auth.controller.ts
│       │   ├── client-auth.module.ts
│       │   └── client-auth.service.ts
│       ├── users/
│       │   └── dto/
│       │       └── user.dto.ts
│       └── client.module.ts
└── app.module.ts
```

## 注意事项

1. **数据库表**: 请确保数据库中存在相应的用户表（User 和 ClientUser）
2. **环境变量**: 请配置正确的 JWT 密钥和过期时间
3. **密码加密**: 所有密码都使用 bcryptjs 进行加密存储
4. **令牌安全**: 请妥善保管 JWT 密钥，不要在代码中硬编码
5. **CORS 配置**: 如果前端和后端不在同一域名，请配置 CORS

## 扩展功能

- 可以添加令牌黑名单机制
- 可以添加用户角色和权限系统
- 可以添加登录日志记录
- 可以添加账户锁定机制
- 可以添加双因素认证（2FA）
