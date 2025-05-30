# Winston 日志系统集成文档

本项目已集成 Winston 日志系统，支持管理端和客户端的日志分离，提供完整的日志记录功能。

## 📁 日志文件结构

```
logs/
├── admin/                 # 管理端日志
│   ├── admin.log         # 管理端所有日志
│   ├── admin-error.log   # 管理端错误日志
│   ├── admin-warn.log    # 管理端警告日志
│   └── admin-http.log    # 管理端HTTP请求日志
├── client/               # 客户端日志
│   ├── client.log        # 客户端所有日志
│   ├── client-error.log  # 客户端错误日志
│   ├── client-warn.log   # 客户端警告日志
│   └── client-http.log   # 客户端HTTP请求日志
└── global/               # 全局日志
    ├── global.log        # 全局日志
    ├── global-error.log  # 全局错误日志
    └── system.log        # 系统启动日志
```

## 🚀 快速开始

### 1. 在控制器中使用日志

#### 管理端控制器

```typescript
import { Controller, Get, Post, Body, Inject } from '@nestjs/common'
import { LoggerService } from '../common/services/logger.service'
import { AdminActionLog, LogAction } from '../common/decorators/log.decorator'

@Controller('admin/users')
export class AdminUserController {
  constructor(
    @Inject('AdminLoggerService') private readonly logger: LoggerService
  ) {}

  @Get()
  @AdminActionLog(LogAction.READ, '获取用户列表')
  async getUsers() {
    this.logger.info('开始获取用户列表', 'AdminUserController')
    
    try {
      const users = await this.getUsersFromDatabase()
      
      // 记录用户操作日志
      this.logger.logUserAction(
        'admin-001',
        '查看用户列表',
        { count: users.length },
        'AdminUserController'
      )
      
      return users
    } catch (error) {
      // 记录系统错误
      this.logger.logSystemError(
        error,
        'AdminUserController',
        { action: '获取用户列表' }
      )
      throw error
    }
  }

  @Post()
  @AdminActionLog(LogAction.CREATE, '创建用户')
  async createUser(@Body() userData: any) {
    try {
      const user = await this.createUserInDatabase(userData)
      
      // 记录业务操作日志
      this.logger.logUserAction(
        'admin-001',
        '创建用户',
        { userId: user.id, email: user.email },
        'AdminUserController'
      )
      
      return user
    } catch (error) {
      // 记录业务错误
      this.logger.logBusinessError(
        'USER_CREATE_FAILED',
        `创建用户失败: ${error.message}`,
        'admin-001',
        'AdminUserController'
      )
      throw error
    }
  }
}
```

#### 客户端控制器

```typescript
import { Controller, Get, Param, Inject } from '@nestjs/common'
import { LoggerService } from '../common/services/logger.service'
import { UserActionLog, LogAction } from '../common/decorators/log.decorator'

@Controller('client/profile')
export class ClientProfileController {
  constructor(
    @Inject('ClientLoggerService') private readonly logger: LoggerService
  ) {}

  @Get(':id')
  @UserActionLog(LogAction.READ, '获取用户资料')
  async getProfile(@Param('id') id: string) {
    this.logger.info(`用户 ${id} 获取个人资料`, 'ClientProfileController')
    
    try {
      const profile = await this.getProfileFromDatabase(id)
      
      this.logger.logUserAction(
        id,
        '查看个人资料',
        { profileId: profile.id },
        'ClientProfileController'
      )
      
      return profile
    } catch (error) {
      this.logger.logSystemError(
        error,
        'ClientProfileController',
        { userId: id, action: '获取个人资料' }
      )
      throw error
    }
  }
}
```

### 2. 在服务中使用日志

```typescript
import { Injectable } from '@nestjs/common'
import { LoggerService } from '../common/services/logger.service'

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService
  ) {}

  async processUserData(userId: string, data: any) {
    this.logger.info(`开始处理用户 ${userId} 的数据`, 'UserService')
    
    try {
      // 记录数据库操作
      const startTime = Date.now()
      const result = await this.database.save(data)
      const duration = Date.now() - startTime
      
      this.logger.logDatabaseOperation(
        'INSERT',
        'users',
        duration,
        'UserService'
      )
      
      return result
    } catch (error) {
      this.logger.logSystemError(
        error,
        'UserService',
        { userId, data }
      )
      throw error
    }
  }
}
```

## 📝 日志装饰器

### 基础装饰器

```typescript
// 通用日志装饰器
@Log({ level: LogLevel.INFO, description: '自定义操作' })

// 用户操作日志
@UserActionLog(LogAction.READ, '获取数据')

// 管理员操作日志
@AdminActionLog(LogAction.CREATE, '创建资源')

// 错误日志
@ErrorLog('可能出现的错误')

// 调试日志
@DebugLog('调试信息')
```

### 日志级别

```typescript
export enum LogLevel {
  ERROR = 'error',    // 错误日志
  WARN = 'warn',      // 警告日志
  INFO = 'info',      // 信息日志
  HTTP = 'http',      // HTTP请求日志
  DEBUG = 'debug',    // 调试日志
}
```

### 操作类型

```typescript
export enum LogAction {
  CREATE = 'CREATE',     // 创建操作
  UPDATE = 'UPDATE',     // 更新操作
  DELETE = 'DELETE',     // 删除操作
  READ = 'READ',         // 读取操作
  LOGIN = 'LOGIN',       // 登录操作
  LOGOUT = 'LOGOUT',     // 登出操作
  UPLOAD = 'UPLOAD',     // 上传操作
  DOWNLOAD = 'DOWNLOAD', // 下载操作
  EXPORT = 'EXPORT',     // 导出操作
  IMPORT = 'IMPORT',     // 导入操作
}
```

## 🔧 LoggerService API

### 基础日志方法

```typescript
// 信息日志
logger.info(message: string, context?: string)

// 错误日志
logger.error(message: string, trace?: string, context?: string)

// 警告日志
logger.warn(message: string, context?: string)

// 调试日志
logger.debug(message: string, context?: string)

// HTTP日志
logger.http(message: string, context?: string)
```

### 业务日志方法

```typescript
// 用户操作日志
logger.logUserAction(
  userId: string,
  action: string,
  details?: any,
  context?: string
)

// API调用日志
logger.logApiCall(
  method: string,
  url: string,
  statusCode: number,
  responseTime: number,
  userId?: string,
  context?: string
)

// 数据库操作日志
logger.logDatabaseOperation(
  operation: string,
  table: string,
  duration: number,
  context?: string
)

// 业务错误日志
logger.logBusinessError(
  errorCode: string,
  errorMessage: string,
  userId?: string,
  context?: string
)

// 系统错误日志
logger.logSystemError(
  error: Error,
  context?: string,
  additionalInfo?: any
)
```

## 🎯 自动日志功能

### HTTP请求日志

系统会自动记录所有HTTP请求，包括：
- 请求方法和URL
- 响应状态码和耗时
- 用户ID（如果已认证）
- IP地址和User-Agent
- 请求参数（敏感信息会被脱敏）

### 异常日志

系统会自动记录所有未处理的异常，包括：
- 异常类型和消息
- 堆栈跟踪
- 请求上下文信息
- 用户信息

## ⚙️ 配置说明

### 日志配置文件

位置：`src/config/logger.config.ts`

```typescript
// 管理端日志配置
export const adminLoggerConfig: WinstonModuleOptions = {
  levels: logLevels,
  transports: [
    // 文件传输器配置
    createFileTransport('admin/admin.log'),
    createFileTransport('admin/admin-error.log', 'error'),
  ],
  defaultMeta: {
    service: 'admin-service',
    environment: process.env.NODE_ENV || 'development',
  },
}
```

### 环境变量

```bash
# 开发环境会在控制台输出彩色日志
NODE_ENV=development

# 生产环境只输出到文件
NODE_ENV=production
```

## 📊 日志格式

### 文件日志格式

```json
{
  "timestamp": "2024-01-15 10:30:45",
  "level": "info",
  "message": "用户登录成功",
  "context": "AuthController",
  "service": "admin-service",
  "environment": "development",
  "userId": "user-123",
  "action": "LOGIN",
  "ip": "192.168.1.100"
}
```

### 控制台日志格式（开发环境）

```
2024-01-15 10:30:45 INFO [AuthController] 用户登录成功 {"userId":"user-123"}
```

## 🔍 日志查看和分析

### 查看实时日志

```bash
# 查看管理端日志
tail -f logs/admin/admin.log

# 查看客户端错误日志
tail -f logs/client/client-error.log

# 查看所有HTTP请求
tail -f logs/admin/admin-http.log logs/client/client-http.log
```

### 日志分析

```bash
# 统计错误数量
grep -c "ERROR" logs/admin/admin-error.log

# 查找特定用户的操作
grep "user-123" logs/admin/admin.log

# 查找API响应时间超过1秒的请求
grep -E "[0-9]{4,}ms" logs/admin/admin-http.log
```

## 🛡️ 安全考虑

### 敏感信息脱敏

系统会自动脱敏以下敏感信息：
- 密码字段
- 认证令牌
- API密钥
- 验证码
- Cookie信息

### 日志轮转

- 单个日志文件最大10MB
- 保留最近5个历史文件
- 自动压缩历史文件

## 🚨 注意事项

1. **性能影响**：大量日志输出可能影响性能，生产环境建议调整日志级别
2. **磁盘空间**：定期清理历史日志文件，避免磁盘空间不足
3. **敏感信息**：确保不在日志中记录敏感信息
4. **日志级别**：根据环境调整合适的日志级别

## 📚 更多示例

完整的使用示例请参考：`src/examples/logger-usage.example.ts`

该文件包含了控制器、服务层的完整使用示例，展示了各种日志记录场景的最佳实践。