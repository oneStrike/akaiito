# NestJS 日志模块使用指南

## 概述

本项目实现了一个完整的 NestJS 日志解决方案，支持：
- Admin 和 Client 模块的日志隔离
- 开发/生产环境的差异化配置
- Winston 作为底层日志库
- 自动请求日志记录
- 性能监控和业务操作日志
- 上下文信息管理

## 安装依赖

```bash
# 安装 Winston 相关依赖
pnpm add winston nest-winston winston-daily-rotate-file
pnpm add -D @types/winston
```

## 项目结构

```
src/
├── config/
│   └── logger.config.ts          # 日志配置文件
├── common/
│   ├── services/
│   │   ├── logger.service.ts      # 自定义日志服务
│   │   └── logger-factory.service.ts  # 日志工厂服务
│   ├── decorators/
│   │   └── log.decorator.ts       # 日志装饰器
│   ├── interceptors/
│   │   └── logging.interceptor.ts # 日志拦截器
│   └── module/
│       └── logger.module.ts       # 日志模块
├── modules/
│   ├── admin/
│   │   ├── logger/
│   │   │   └── admin-logger.module.ts  # Admin日志模块
│   │   └── controllers/
│   │       └── admin-example.controller.ts  # 使用示例
│   └── client/
│       ├── logger/
│       │   └── client-logger.module.ts  # Client日志模块
│       └── controllers/
│           └── client-example.controller.ts  # 使用示例
└── logs/                          # 日志文件目录
    ├── admin/
    │   ├── combined-2024-01-01.log
    │   └── error-2024-01-01.log
    ├── client/
    │   ├── combined-2024-01-01.log
    │   └── error-2024-01-01.log
    └── global/
        ├── combined-2024-01-01.log
        └── error-2024-01-01.log
```

## 基本使用

### 1. 在控制器中使用

```typescript
import { Controller, Get, Inject } from '@nestjs/common'
import { CustomLoggerService } from '@/common/services/logger.service'
import { AdminLog, LogPerformance } from '@/common/decorators/log.decorator'

@Controller('admin/users')
@AdminLog('AdminUserController')
export class AdminUserController {
  constructor(
    @Inject('ADMIN_LOGGER') private readonly logger: CustomLoggerService
  ) {}

  @Get()
  @LogPerformance('获取用户列表')
  async getUsers() {
    this.logger.info('获取用户列表请求')

    // 业务逻辑
    const users = await this.userService.findAll()

    this.logger.logBusiness('获取用户列表', 'success', { count: users.length })

    return users
  }
}
```

### 2. 在服务中使用

```typescript
import { Injectable } from '@nestjs/common'
import { LoggerFactoryService } from '@/common/services/logger-factory.service'

@Injectable()
export class UserService {
  private readonly logger: CustomLoggerService

  constructor(private readonly loggerFactory: LoggerFactoryService) {
    this.logger = this.loggerFactory.createAdminLogger('UserService')
  }

  async createUser(userData: any) {
    this.logger.info('创建用户', { email: userData.email })

    try {
      // 数据库操作
      const startTime = Date.now()
      const user = await this.prisma.user.create({ data: userData })
      const duration = Date.now() - startTime

      this.logger.logDatabase('INSERT', 'users', duration, { userId: user.id })
      this.logger.logBusiness('用户创建', 'success', { userId: user.id })

      return user
    } catch (error) {
      this.logger.error('用户创建失败', error.stack, { email: userData.email })
      throw error
    }
  }
}
```

### 3. 使用装饰器

```typescript
// 指定日志模块
@AdminLog('AdminController')
@Controller('admin')
export class AdminController {}

// 记录性能指标
@LogPerformance('复杂计算')
@Get('complex')
async complexOperation() {}

// 记录业务操作
@LogBusiness('用户注册')
@Post('register')
async register() {}
```

## 日志类型

### 1. 基础日志

```typescript
logger.debug('调试信息', { data: 'debug data' })
logger.info('普通信息', { data: 'info data' })
logger.warn('警告信息', { data: 'warning data' })
logger.error('错误信息', error.stack, { data: 'error data' })
```

### 2. HTTP请求日志

```typescript
// 自动记录（通过拦截器）
// 手动记录
logger.logRequest('GET', '/api/users', 200, 150)
```

### 3. 数据库操作日志

```typescript
logger.logDatabase('SELECT', 'users', 50, { userId: 123 })
logger.logDatabase('INSERT', 'orders', 100, { orderId: 456 })
```

### 4. 业务操作日志

```typescript
logger.logBusiness('用户登录', 'success', { userId: 123 })
logger.logBusiness('订单创建', 'failure', { reason: '库存不足' })
```

### 5. 安全日志

```typescript
logger.logSecurity('登录尝试', 'info', { email: 'user@example.com' })
logger.logSecurity('密码错误', 'warn', { email: 'user@example.com' })
logger.logSecurity('账户锁定', 'error', { userId: 123 })
```

### 6. 性能日志

```typescript
logger.logPerformance('数据库查询', 150)
logger.logPerformance('文件上传', 2000)
```

## 上下文管理

### 1. 设置上下文

```typescript
logger.setLogContext({
  requestId: 'req_123',
  userId: 'user_456',
  action: 'create_order'
})
```

### 2. 创建子日志器

```typescript
const childLogger = logger.child('OrderProcessing', {
  orderId: 'order_789',
  step: 'payment'
})

childLogger.info('开始处理支付')  // 会自动包含父级上下文
```

## 环境配置

### 开发环境 (.env.development)

```env
NODE_ENV=development
LOG_LEVEL=debug
LOG_DIR=./logs
LOG_MAX_FILES=7d
LOG_MAX_SIZE=10m
```

### 生产环境 (.env.production)

```env
NODE_ENV=production
LOG_LEVEL=info
LOG_DIR=/var/log/akaiito
LOG_MAX_FILES=30d
LOG_MAX_SIZE=100m
```

## 日志格式

### 控制台输出（开发环境）

```
2024-01-01 10:30:45 info [AdminUserController][req_123][User:456] 获取用户列表请求
```

### 文件输出（JSON格式）

```json
{
  "timestamp": "2024-01-01 10:30:45",
  "level": "info",
  "message": "获取用户列表请求",
  "context": "AdminUserController",
  "module": "admin",
  "requestId": "req_123",
  "userId": "user_456",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

## 高级功能

### 1. 动态日志器创建

```typescript
// 根据上下文自动选择模块
const logger = loggerFactory.createContextualLogger('MyService')

// 手动指定模块
const adminLogger = loggerFactory.createAdminLogger('AdminService')
const clientLogger = loggerFactory.createClientLogger('ClientService')
```

### 2. 日志统计

```typescript
const stats = loggerFactory.getLoggerStats()
console.log(stats)
// {
//   totalLoggers: 3,
//   moduleLoggers: { admin: true, client: true, global: true },
//   cachedServices: 5
// }
```

### 3. 清理缓存

```typescript
// 清理日志器缓存
loggerFactory.clearCache()

// 关闭所有日志器
await loggerFactory.closeAll()
```

## 生产环境优化

### 1. 远程日志集成

```typescript
// 在 logger.config.ts 中添加
if (process.env.NODE_ENV === 'production') {
  // Sentry 集成
  transports.push(new SentryTransport({
    dsn: process.env.SENTRY_DSN,
    level: 'error'
  }))

  // Elasticsearch 集成
  transports.push(new ElasticsearchTransport({
    host: process.env.ELASTICSEARCH_HOST,
    index: process.env.ELASTICSEARCH_INDEX
  }))
}
```

### 2. 日志轮转

日志文件会自动按天轮转，并根据配置保留指定天数的历史文件。

### 3. 性能优化

- 生产环境只记录 info 及以上级别的日志
- 使用异步写入避免阻塞主线程
- 自动清理过期日志文件

## 故障排查

### 1. 日志文件权限问题

```bash
# 确保日志目录有写权限
sudo chown -R app:app /var/log/akaiito
sudo chmod -R 755 /var/log/akaiito
```

### 2. 磁盘空间监控

```bash
# 监控日志目录大小
du -sh /var/log/akaiito

# 清理过期日志（如果自动清理失效）
find /var/log/akaiito -name "*.log" -mtime +30 -delete
```

### 3. 日志级别调试

```typescript
// 临时调整日志级别
logger.level = 'debug'
```

## 最佳实践

1. **结构化日志**: 使用对象传递元数据，便于后续分析
2. **敏感信息过滤**: 自动过滤密码、token等敏感信息
3. **上下文传递**: 在请求链路中传递requestId等上下文信息
4. **性能监控**: 记录关键操作的执行时间
5. **错误追踪**: 记录完整的错误堆栈信息
6. **日志分级**: 合理使用不同的日志级别
7. **模块隔离**: 不同业务模块使用独立的日志通道

## 监控和告警

建议配置以下监控指标：

- 错误日志数量
- 响应时间超过阈值的请求
- 登录失败次数
- 数据库操作耗时
- 磁盘空间使用率

通过 ELK Stack 或其他日志分析工具可以实现实时监控和告警。
