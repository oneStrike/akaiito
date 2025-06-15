# 请求日志模块 (Request Log Module)

## 概述

请求日志模块是一个功能完整的API请求记录和管理系统，提供自动日志记录、查询统计、数据管理等功能。支持Admin和Client两个子项目的请求日志记录，提供统一的数据模型和灵活的配置选项。该模块严格按照TypeScript规范开发，具有高质量的代码注释和完善的错误处理机制。

## 功能特性

### 🚀 核心功能

- **双模块支持**: 同时支持Admin和Client两个子项目的请求日志记录
- **统一数据模型**: 使用相同的数据库表和DTO，便于统一管理
- **灵活配置系统**: 为Admin和Client提供独立的配置选项
- **自动日志记录**: 通过拦截器自动记录所有API请求信息
- **分页查询**: 支持多条件筛选和排序的分页查询
- **详情查询**: 根据ID查询单个请求日志的完整信息
- **批量管理**: 支持批量删除请求日志记录
- **过期清理**: 自动清理过期的请求日志数据
- **统计分析**: 提供请求日志的各种统计信息
- **跳过机制**: 支持跳过特定接口的日志记录
- **路径过滤**: 支持基于路径和HTTP方法的过滤
- **参数截断**: 防止过长参数影响性能

### 📊 记录信息

- 用户信息（用户名、用户ID、手机号）
- 请求信息（IP地址、请求方法、请求路径、请求参数）
- 响应信息（状态码、响应描述）
- 环境信息（User-Agent、IP地址映射）
- 时间信息（创建时间、更新时间）

## 目录结构

```
src/modules/admin/request-log/
├── dto/
│   └── request-log.dto.ts          # 数据传输对象定义
├── interceptors/
│   └── request-log.interceptor.ts  # 请求日志拦截器
├── examples/
│   └── request-log-usage.example.ts # 使用示例
├── request-log.controller.ts        # 控制器
├── request-log.service.ts          # 服务类
├── request-log.module.ts           # 模块定义
└── README.md                       # 说明文档
```

## 快速开始

### 1. 模块集成

#### Admin模块集成

在Admin模块中导入 `RequestLogModule`：

```typescript
import { Module } from '@nestjs/common'
import { RequestLogModule } from './request-log/request-log.module'

@Module({
  imports: [RequestLogModule],
  // ...
})
export class AdminModule {}
```

#### Client模块集成

在Client模块中导入 `ClientRequestLogModule`：

```typescript
import { Module } from '@nestjs/common'
import { ClientRequestLogModule } from './request-log/client-request-log.module'

@Module({
  imports: [ClientRequestLogModule],
  // ...
})
export class ClientModule {}
```

### 2. 配置系统

#### 环境变量配置

在 `.env` 文件中配置请求日志：

```bash
# Admin模块配置
ADMIN_REQUEST_LOG_ENABLED=true
ADMIN_REQUEST_LOG_RETENTION_DAYS=90

# Client模块配置
CLIENT_REQUEST_LOG_ENABLED=true
CLIENT_REQUEST_LOG_RETENTION_DAYS=30
```

#### 配置选项说明

```typescript
export interface RequestLogConfig {
  enabled: boolean              // 是否启用请求日志记录
  retentionDays: number         // 日志保留天数
  logRequestParams: boolean     // 是否记录请求参数
  logResponseData: boolean      // 是否记录响应数据
  sensitiveFields: string[]     // 敏感字段列表（将被脱敏）
  skipPaths: string[]          // 跳过日志记录的路径模式
  skipMethods: string[]        // 跳过日志记录的HTTP方法
  maxParamsLength: number      // 最大请求参数长度
}
```

### 3. 自动日志记录

#### Admin模块使用

使用 `RequestLogInterceptor` 拦截器自动记录管理端请求：

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { RequestLogInterceptor } from './request-log/interceptors/request-log.interceptor'

@Controller('admin/api')
@UseInterceptors(RequestLogInterceptor)
export class AdminApiController {
  @Get('users')
  async getUsers() {
    // 这个请求会被自动记录为管理端请求
    return []
  }

  @Get('sensitive')
  @SkipRequestLog() // 跳过敏感接口的日志记录
  async getSensitiveData() {
    return { secret: 'data' }
  }
}
```

#### Client模块使用

使用 `ClientRequestLogInterceptor` 拦截器自动记录客户端请求：

```typescript
import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ClientRequestLogInterceptor } from '@/modules/client/request-log/interceptors/client-request-log.interceptor'

@Controller('client/api')
@UseInterceptors(ClientRequestLogInterceptor)
export class ClientApiController {
  @Get('profile')
  async getProfile() {
    // 这个请求会被自动记录为客户端请求
    return {}
  }

  @Get('sensitive')
  @SkipRequestLog() // 跳过敏感接口的日志记录
  async getSensitiveData() {
    return { secret: 'data' }
  }
}
```

### 3. 跳过日志记录

对于不需要记录日志的接口，可以使用 `@SkipRequestLog()` 装饰器：

```typescript
import { SkipRequestLog } from '@/common/interceptors/base-request-log.interceptor'

@Get('health')
@SkipRequestLog() // 跳过日志记录
async healthCheck() {
  return { status: 'ok' }
}
```

## 数据模型

### RequestLog 实体

```typescript
export class RequestLog {
  id: number                    // 主键ID
  userId?: number              // 用户ID（可选）
  username?: string            // 用户名（可选）
  userType: 'admin' | 'client' // 用户类型
  clientIp: string             // 客户端IP地址
  ipLocation?: string          // IP地址位置信息
  method: string               // HTTP请求方法
  requestPath: string              // API路径
  operationDescription?: string          // API摘要描述
  operationoperationRecord?: string     // 操作记录
  userAgent?: string           // 用户代理信息
  requestParams?: string       // 请求参数（JSON字符串）
  responseStatusCode: number   // 响应状态码
  responseMessage?: string     // 响应消息
  responseTime: number         // 响应时间（毫秒）
  createdAt: Date             // 创建时间
  updatedAt: Date             // 更新时间
}
```

### CreateRequestLogDto

```typescript
export class CreateRequestLogDto {
  userId?: number
  username?: string
  userType: 'admin' | 'client'
  clientIp: string
  ipLocation?: string
  method: string
  requestPath: string
  operationDescription?: string
  operationoperationRecord?: string
  userAgent?: string
  requestParams?: string
  responseStatusCode: number
  responseMessage?: string
  responseTime: number
}
```

### QueryRequestLogDto

```typescript
export class QueryRequestLogDto {
  page?: number = 1
  limit?: number = 10
  userId?: number
  username?: string
  userType?: 'admin' | 'client'
  method?: string
  requestPath?: string
  startDate?: string
  endDate?: string
  minResponseTime?: number
  maxResponseTime?: number
  statusCode?: number
}
```

## API 接口

### 请求日志管理

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/admin/request-log` | 创建请求日志记录 |
| GET | `/admin/request-log` | 分页查询请求日志 |
| GET | `/admin/request-log/:id` | 查询请求日志详情 |
| DELETE | `/admin/request-log/:id` | 删除单个请求日志 |
| DELETE | `/admin/request-log/batch` | 批量删除请求日志 |
| DELETE | `/admin/request-log/cleanup/expired` | 清理过期日志 |
| GET | `/admin/request-log/statistics/overview` | 获取统计信息 |

### 查询请求日志

```http
GET /admin/request-logs?page=1&limit=10&startDate=2024-01-01&endDate=2024-01-31&userType=admin
```

**查询参数：**
- `page`: 页码（默认：1）
- `limit`: 每页数量（默认：10）
- `userId`: 用户ID
- `username`: 用户名
- `userType`: 用户类型（admin/client）
- `method`: HTTP方法
- `requestPath`: API路径
- `startDate`: 开始日期
- `endDate`: 结束日期
- `minResponseTime`: 最小响应时间
- `maxResponseTime`: 最大响应时间
- `statusCode`: 状态码

**响应示例：**

```json
{
  "data": [
    {
      "id": 1,
      "userId": 1,
      "username": "admin",
      "userType": "admin",
      "clientIp": "192.168.1.100",
      "ipLocation": "北京市",
      "method": "GET",
      "requestPath": "/admin/users",
      "operationDescription": "用户模块-查询用户",
      "operationoperationRecord": "管理员admin查询用户列表",
      "userAgent": "Mozilla/5.0...",
      "requestParams": "{\"page\":1,\"limit\":10}",
      "responseStatusCode": 200,
      "responseMessage": "OK",
      "responseTime": 150,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

### 删除过期日志

```http
DELETE /admin/request-logs/cleanup
```

**响应示例：**

```json
{
  "message": "清理完成",
  "deletedCount": 1500
}
```

### 查询参数

#### 分页查询 (`GET /admin/request-log`)

```typescript
interface QueryRequestLogDto {
  // 分页参数
  pageIndex?: number    // 页码，默认0
  pageSize?: number     // 每页大小，默认15，最大500
  orderBy?: string      // 排序，JSON格式，如 '{"createdAt":"desc"}'

  // 时间范围
  startDate?: string    // 开始日期，格式：YYYY-MM-DD
  endDate?: string      // 结束日期，格式：YYYY-MM-DD

  // 筛选条件
  username?: string     // 用户名模糊查询
  userId?: number       // 用户ID精确查询
  ipAddress?: string     // IP地址模糊查询
  responseCode?: number // 响应状态码
  httpMethod?: string // 请求方法
  requestPath?: string      // API路径模糊查询
}
```

#### 统计查询 (`GET /admin/request-log/statistics/overview`)

```typescript
interface StatisticsQuery {
  startDate?: string    // 开始日期，格式：YYYY-MM-DD
  endDate?: string      // 结束日期，格式：YYYY-MM-DD
}
```

## 使用示例

### 1. 全局拦截器配置

#### 智能路由拦截器

创建一个智能拦截器，根据路径自动选择对应的日志记录器：

```typescript
// main.ts
import { NestFactory, Reflector } from '@nestjs/core'
import { SmartRequestLogInterceptor } from './modules/admin/request-log/examples/global-interceptor-setup.example'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 获取服务实例
  const requestLogService = app.get(RequestLogService)
  const reflector = app.get(Reflector)

  // 创建智能拦截器
  const adminInterceptor = new RequestLogInterceptor(requestLogService, reflector)
  const clientInterceptor = new ClientRequestLogInterceptor(requestLogService, reflector)
  const smartInterceptor = new SmartRequestLogInterceptor(adminInterceptor, clientInterceptor)

  // 全局注册
  app.useGlobalInterceptors(smartInterceptor)

  await app.listen(3000)
}
```

#### 模块级别配置

在应用模块中配置全局拦截器：

```typescript
import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestLogInterceptor } from './modules/admin/request-log/interceptors/request-log.interceptor'
import { ClientRequestLogInterceptor } from './modules/client/request-log/interceptors/client-request-log.interceptor'

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClientRequestLogInterceptor,
    },
  ],
})
export class AppModule {}
```

### 2. 手动记录日志

```typescript
import { RequestLogService } from './request-log/request-log.service'

@Injectable()
export class MyService {
  constructor(private readonly requestLogService: RequestLogService) {}

  async operationRecordCustomLog() {
    await this.requestLogService.createRequestLog({
      ipAddress: '192.168.1.100',
      ipLocation: '北京市朝阳区',
      responseCode: 200,
      responseMessage: '自定义操作成功',
      httpMethod: 'POST',
      requestPath: '/custom/operation',
      operationDescription: '自定义操作',
      operationRecord: '用户执行自定义操作',
      userAgent: 'Custom Operation',
    })
  }
}
```

### 3. 查询日志

```typescript
// 查询最近的错误日志
const errorLogs = await this.requestLogService.findRequestLogs({
  responseCode: 500,
  pageIndex: 0,
  pageSize: 20,
  startDate: '2024-01-01',
  endDate: '2024-12-31',
})

// 查询特定用户的操作日志
const userLogs = await this.requestLogService.findRequestLogs({
  username: 'admin',
  orderBy: '{"createdAt":"desc"}',
})
```

### 3. 获取统计信息

```typescript
// 获取本月统计
const stats = await this.requestLogService.getRequestLogStatistics(
  '2024-01-01',
  '2024-01-31'
)

console.log(`总请求数: ${stats.totalRequests}`)
console.log(`成功率: ${stats.successRate}%`)
console.log('请求方法分布:', stats.methodStats)
console.log('状态码分布:', stats.statusCodeStats)
```

### 4. 清理过期日志

```typescript
// 清理30天前的日志
const deletedCount = await this.requestLogService.cleanupExpiredLogs(30)
console.log(`清理了 ${deletedCount} 条过期日志`)
```

## 配置说明

### 全局拦截器配置

在 `main.ts` 中配置全局请求日志拦截器：

```typescript
import { NestFactory, Reflector } from '@nestjs/core'
import { RequestLogInterceptor } from './modules/admin/request-log/interceptors/request-log.interceptor'
import { RequestLogService } from './modules/admin/request-log/request-log.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 获取服务实例
  const requestLogService = app.get(RequestLogService)
  const reflector = app.get(Reflector)

  // 配置全局拦截器
  app.useGlobalInterceptors(
    new RequestLogInterceptor(requestLogService, reflector)
  )

  await app.listen(3000)
}
```

### 定时清理任务

配置定时任务自动清理过期日志：

```typescript
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class RequestLogCleanupTask {
  constructor(private readonly requestLogService: RequestLogService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanupExpiredLogs() {
    const deletedCount = await this.requestLogService.cleanupExpiredLogs(30)
    console.log(`清理了 ${deletedCount} 条过期日志`)
  }
}
```

## 数据库模型

请求日志使用 `SystemRequestLog` 模型，对应数据库表 `system_request_log`：

```prisma
model SystemRequestLog {
  id               Int      @id @default(autoincrement())
  username         String?  @db.VarChar(20)
  userId           Int?     @map("user_id")
  userMobile       String?  @map("user_mobile") @db.VarChar(20)
  ipAddress         String   @map("target_ip") @db.VarChar(20)
  ipLocation String   @map("ip_mapping_address") @db.VarChar(300)
  responseCode     Int      @map("response_code") @db.SmallInt
  responseMessage     String   @map("response_desc") @db.VarChar(300)
  httpMethod    String   @map("httpMethod") @db.VarChar(10)
  requestPath          String   @map("api_path") @db.VarChar(100)
  operationDescription       String   @map("api_summary") @db.VarChar(255)
  operationRecord           String   @db.VarChar(255)
  userAgent        String   @map("user_agent") @db.VarChar(1000)
  requestParams    String?  @map("request_params") @db.Text
  createdAt        DateTime @default(now()) @map("created_at")
  updatedAt        DateTime @updatedAt @map("updated_at")

  @@map("system_request_log")
}
```

## 安全考虑

### 敏感信息过滤

拦截器会自动过滤请求参数中的敏感信息：

- `password` - 密码字段
- `token` - 令牌字段
- `secret` - 密钥字段
- `key` - 密钥字段
- `authorization` - 授权字段
- `captcha` - 验证码字段

这些字段在记录时会被替换为 `***`。

### 数据保护

- 请求参数存储在 `TEXT` 类型字段中，支持大容量数据
- IP地址和用户信息经过适当的长度限制
- 支持定期清理过期数据，避免数据积累过多

## 性能优化

### 异步记录

日志记录采用异步方式，不会阻塞API响应：

```typescript
// 异步记录日志，不阻塞请求响应
setImmediate(async () => {
  try {
    await this.requestLogService.createRequestLog(createRequestLogDto)
  } catch (logError) {
    this.logger.error('请求日志记录失败', logError.stack)
  }
})
```

### 数据库索引建议

为提高查询性能，建议在以下字段上创建索引：

```sql
-- 创建常用查询字段的索引
CREATE INDEX idx_system_request_log_created_at ON system_request_log(created_at);
CREATE INDEX idx_system_request_log_user_id ON system_request_log(user_id);
CREATE INDEX idx_system_request_log_response_code ON system_request_log(response_code);
CREATE INDEX idx_system_request_log_request_method ON system_request_log("httpMethod");
CREATE INDEX idx_system_request_log_api_path ON system_request_log(api_path);
```

## 错误处理

模块提供完善的错误处理机制：

- 所有服务方法都包含 try-catch 错误处理
- 详细的错误日志记录
- 友好的错误信息返回
- 不会因为日志记录失败而影响业务逻辑

## 扩展功能

### IP地址解析

可以集成第三方IP地址库来获取详细的地理位置信息：

```typescript
// 示例：集成高德地图IP定位API
protected async getIpLocation(ip: string): Promise<string> {
  try {
    // 调用第三方API获取IP地址信息
    const response = await fetch(`https://restapi.amap.com/v3/ip?ip=${ip}&key=YOUR_KEY`)
    const data = await response.json()
    return data.province + data.city + data.district
  } catch (error) {
    return '地址解析失败'
  }
}
```

### 自定义装饰器

可以创建自定义装饰器来标记特定的操作类型：

```typescript
import { SetMetadata } from '@nestjs/common'

export const LogOperation = (operation: string) =>
  SetMetadata('logOperation', operation)

// 使用
@Post('users')
@LogOperation('创建用户')
async createUser(@Body() userData: any) {
  // 业务逻辑
}
```

## 常见问题

### Q: 如何跳过某些接口的日志记录？
A: 使用 `@SkipRequestLog()` 装饰器标记不需要记录日志的方法。

### Q: 如何自定义日志记录的内容？
A: 可以通过修改 `RequestLogInterceptor` 中的逻辑来自定义记录内容。

### Q: 日志数据过多怎么办？
A: 可以配置定时任务定期清理过期数据，或者设置数据库分区。

### Q: 如何提高查询性能？
A: 在常用查询字段上创建数据库索引，合理设置分页大小。

## 最佳实践

### 1. 性能优化

```typescript
// 对于高频API，建议跳过日志记录
@Controller('api/high-frequency')
export class HighFrequencyController {
  @Get('heartbeat')
  @SkipRequestLog() // 跳过心跳检测的日志记录
  async heartbeat() {
    return { status: 'ok' }
  }
}
```

### 2. 敏感数据处理

```typescript
// 在配置中添加自定义敏感字段
const config: RequestLogConfig = {
  sensitiveFields: [
    'password', 'token', 'secret', 'key',
    'creditCard', 'ssn', 'phone' // 自定义敏感字段
  ]
}
```

### 3. 路径过滤

```typescript
// 配置跳过特定路径的日志记录
const config: RequestLogConfig = {
  skipPaths: [
    '/health',
    '/metrics',
    '/favicon.ico',
    '/static/*' // 支持通配符
  ]
}
```

### 4. 定期清理

```typescript
// 建议使用定时任务清理过期日志
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class LogCleanupService {
  constructor(private requestLogService: RequestLogService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanupExpiredLogs() {
    await this.requestLogService.cleanupExpiredLogs()
  }
}
```

## 注意事项

### 1. 性能考虑
- 请求日志记录是异步操作，不会影响API响应性能
- 对于高频接口建议使用 `@SkipRequestLog()` 装饰器跳过日志记录
- 合理设置 `maxParamsLength` 避免存储过大的请求参数

### 2. 存储管理
- 建议定期清理过期日志，避免数据库存储空间过大
- 根据业务需求合理设置 `retentionDays` 参数
- 考虑对日志表进行分区或分表处理

### 3. 安全考虑
- 默认会过滤密码等敏感字段，可根据需要调整过滤规则
- 避免在日志中记录完整的敏感业务数据
- 定期审查日志内容，确保符合数据保护要求

### 4. 监控告警
- 监控日志记录失败的情况
- 设置存储空间告警
- 监控异常请求模式

### 5. 双模块使用
- Admin和Client模块使用不同的拦截器和配置
- 确保JWT负载结构与拦截器期望的结构一致
- 注意区分不同模块的用户类型标识

## 开发计划

- [ ] 实现IP地址地理位置解析
- [ ] 添加请求日志统计分析功能
- [ ] 支持日志导出功能
- [ ] 添加实时日志监控
- [ ] 优化查询性能
- [ ] 支持日志数据可视化
- [ ] 添加异常请求检测和告警

## 版本历史

- **v1.0.0** - 初始版本，提供基础的日志记录和查询功能
- 支持自动日志记录、分页查询、统计分析等核心功能
- 完善的TypeScript类型定义和错误处理
- 详细的代码注释和使用文档

## 贡献指南

1. 遵循项目的TypeScript编码规范
2. 添加完整的JSDoc注释
3. 编写相应的单元测试
4. 更新相关文档

## 许可证

本模块遵循项目的整体许可证协议。
