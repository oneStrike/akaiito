# JWT 鉴权服务说明文档

## 概述

本项目实现了独立的 JWT 鉴权服务，用于 Admin 和 Client 模块。每个模块都有独立的 JWT 配置、服务类和鉴权中间件，确保功能完全隔离。

## 目录结构

```
packages/server-nestjs/src/modules/
├── admin/
│   ├── auth/
│   │   ├── admin-jwt.service.ts
│   │   ├── admin-jwt.strategy.ts
│   │   └── admin-jwt-auth.guard.ts
└── client/
    ├── auth/
    │   ├── client-jwt.service.ts
    │   ├── client-jwt.strategy.ts
    │   └── client-jwt-auth.guard.ts
```

## JWT 配置

JWT 配置通过 `JwtConfigService` 提供，支持根据环境变量动态获取密钥和过期时间。

## Admin 模块

- **AdminJwtService**: 负责生成和验证 JWT 令牌。
- **AdminJwtStrategy**: 从请求头中提取 JWT 并验证。
- **AdminJwtAuthGuard**: 结合 `AuthGuard` 和 `Reflector` 实现 JWT 鉴权。

## Client 模块

- **ClientJwtService**: 负责生成和验证 JWT 令牌。
- **ClientJwtStrategy**: 从请求头中提取 JWT 并验证。
- **ClientJwtAuthGuard**: 结合 `AuthGuard` 和 `Reflector` 实现 JWT 鉴权。

## 使用示例

在控制器中使用 JWT 守卫和装饰器：

```typescript
@Controller('admin/user')
@UseGuards(AdminJwtAuthGuard)
export class UserController {
  @Public()
  @Post('login')
  login(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }

  @Get('getAdminUserPage')
  getUsers(@CurrentUser() user: AdminJwtPayload) {
    return this.userService.getUsers();
  }
}
```

## 安全建议

- 在生产环境中，JWT 密钥应通过环境变量设置。
- 定期更换 JWT 密钥以提高安全性。
- 确保 Token 的有效期合理设置，避免过长或过短。
