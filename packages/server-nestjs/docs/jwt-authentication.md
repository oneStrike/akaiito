# JWT 鉴权服务说明文档

## 概述

本项目实现了独立的 JWT 鉴权服务，用于 Admin 和 Client 模块。每个模块都有独立的 JWT 配置、服务类和鉴权中间件，确保功能完全隔离。JWT（JSON Web Token）是一种基于JSON的开放标准，用于在网络应用环境间传递声明，特别适用于分布式站点的单点登录（SSO）场景。

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

```typescript
// config/jwt.config.ts
export class JwtConfigService {
  // 获取 Admin JWT 配置
  getAdminJwtConfig() {
    return {
      secret: process.env.ADMIN_JWT_SECRET || 'admin-secret-key',
      signOptions: { expiresIn: '1h' },
      refreshExpiresIn: '7d',
    };
  }

  // 获取 Client JWT 配置
  getClientJwtConfig() {
    return {
      secret: process.env.CLIENT_JWT_SECRET || 'client-secret-key',
      signOptions: { expiresIn: '2h' },
      refreshExpiresIn: '30d',
    };
  }
}
```

## Admin 模块

- **AdminJwtService**: 负责生成和验证 JWT 令牌。
- **AdminJwtStrategy**: 从请求头中提取 JWT 并验证。
- **AdminJwtAuthGuard**: 结合 `AuthGuard` 和 `Reflector` 实现 JWT 鉴权。

### AdminJwtService

`AdminJwtService` 提供了以下主要功能：

1. **生成令牌对**：创建访问令牌和刷新令牌

```typescript
async generateTokens(payload): Promise<AdminTokens> {
  // 生成访问令牌和刷新令牌
  const [accessToken, refreshToken] = await Promise.all([
    this.jwtService.signAsync({ ...payload, role: 'admin' }, {
      secret: config.secret,
      expiresIn: config.signOptions.expiresIn,
    }),
    this.jwtService.signAsync(
      { sub: payload.sub, type: 'refresh', role: 'admin', username: payload.username },
      {
        secret: config.secret,
        expiresIn: config.refreshExpiresIn,
      },
    ),
  ]);

  return { accessToken, refreshToken };
}
```

2. **验证令牌**：验证令牌的有效性

```typescript
async verifyToken(token: string): Promise<AdminJwtPayload> {
  return this.jwtService.verifyAsync(token, {
    secret: config.secret,
  });
}
```

3. **刷新令牌**：使用刷新令牌生成新的访问令牌

```typescript
async refreshAccessToken(refreshToken: string): Promise<AdminTokens> {
  const payload = await this.jwtService.verifyAsync(refreshToken, {
    secret: config.secret,
  });

  if (payload.type !== 'refresh' || payload.role !== 'admin') {
    throw new Error('Invalid refresh token');
  }

  return this.generateTokens({
    sub: payload.sub,
    username: payload.username || 'admin',
  });
}
```

4. **登出**：将令牌添加到黑名单

```typescript
async logout(accessToken: string, refreshToken?: string): Promise<boolean> {
  try {
    // 解析访问令牌以获取过期时间
    const decodedAccess = this.jwtService.decode(accessToken) as { exp: number };
    if (decodedAccess && decodedAccess.exp) {
      // 计算令牌剩余有效期（秒）
      const ttl = decodedAccess.exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) {
        // 将访问令牌添加到黑名单
        await this.jwtBlacklistService.addToAdminBlacklist(accessToken, ttl);
      }
    }

    // 如果提供了刷新令牌，也将其添加到黑名单
    if (refreshToken) {
      const decodedRefresh = this.jwtService.decode(refreshToken) as { exp: number };
      if (decodedRefresh && decodedRefresh.exp) {
        const ttl = decodedRefresh.exp - Math.floor(Date.now() / 1000);
        if (ttl > 0) {
          await this.jwtBlacklistService.addToAdminBlacklist(refreshToken, ttl);
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}
```

### AdminJwtStrategy

`AdminJwtStrategy` 负责从请求头中提取 JWT 并验证其有效性：

```typescript
@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    private jwtConfigService: JwtConfigService,
    private jwtBlacklistService: JwtBlacklistService,
  ) {
    const config = jwtConfigService.getAdminJwtConfig();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: AdminJwtPayload, request: any) {
    // 确保角色为 'admin'
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('Invalid admin token');
    }

    // 获取原始令牌
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    // 检查令牌是否在黑名单中
    const isBlacklisted = await this.jwtBlacklistService.isInAdminBlacklist(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token has been revoked');
    }

    return payload;
  }
}
```

### AdminJwtAuthGuard

`AdminJwtAuthGuard` 结合 `AuthGuard` 和 `Reflector` 实现 JWT 鉴权，并支持通过 `@Public()` 装饰器跳过认证：

```typescript
@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 检查路由是否被标记为公共
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 如果路由被标记为公共，则跳过认证
    if (isPublic) {
      return true;
    }

    // 否则调用父类的 canActivate 方法进行认证
    return super.canActivate(context);
  }
}
```

## Client 模块

- **ClientJwtService**: 负责生成和验证 JWT 令牌。
- **ClientJwtStrategy**: 从请求头中提取 JWT 并验证。
- **ClientJwtAuthGuard**: 结合 `AuthGuard` 和 `Reflector` 实现 JWT 鉴权。

## 前端实现

### 存储 JWT 令牌

前端使用 Pinia Store 存储 JWT 令牌：

```typescript
// admin/src/stores/modules/user.ts
export const useUserStore = defineStore('useUserStore', {
  persist: {
    storage: sessionStorage,
  },
  state: (): UserState => ({
    userInfo: null,
    token: {
      accessToken: '',
      refreshToken: '',
      accessExpiresIn: 0,
      refreshExpiresIn: 0,
    },
  }),
  actions: {
    // 登录
    async signIn(data: LoginTypesReq) {
      const res = await loginApi(data);
      this.userInfo = res.userInfo;

      const { expiresIn } = config.auth;
      const timestamp = utils.dayjs().unix();
      this.token = {
        accessToken: res.token.accessToken,
        refreshToken: res.token.refreshToken,
        accessExpiresIn: expiresIn.accessToken + timestamp,
        refreshExpiresIn: expiresIn.refreshToken + timestamp,
      };
    },

    // 刷新token
    async renewToken() {
      if (!this.getAuthStatus() && this.token.accessToken) {
        try {
          this.token.accessToken = await refreshTokenApi({
            accessToken: this.token.accessToken,
            refreshToken: this.token.refreshToken,
          });
          const { expiresIn } = config.auth;
          const timestamp = utils.dayjs().unix();
          this.token.accessExpiresIn = expiresIn.accessToken + timestamp;
        } catch (e) {
          this.signOut();
          throw new Error('token失效');
        }
      }
    },
  }
});
```

### 请求拦截器

前端使用请求拦截器自动添加 JWT 令牌到请求头：

```typescript
// admin/src/utils/request/index.ts
const request: HttpHandlerInterceptors['request'] = async (conf) => {
  const userStore = useUserStore();
  if (!config.auth.httpWhiteList.includes(conf.url as string)) {
    await userStore.renewToken();
  }
  if (!conf.headers) {
    conf.headers = {};
  }
  conf.headers.authorization = userStore.token.accessToken;
  return conf;
};
```

响应拦截器处理 401 错误（令牌过期）：

```typescript
const response: HttpHandlerInterceptors['response'] = (data: any) => {
  const responseData = data.data as HttpResponseResult;
  if (responseData.code !== 200) {
    useMessage.error(responseData.message || '未知错误');
    if (responseData.code === 401) {
      useUserStore().signOut();
    }
    return { error: true, errorInfo: responseData };
  } else {
    return data.config.source ? responseData : responseData.data;
  }
};
```

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

## JWT 黑名单服务

`JwtBlacklistService` 用于管理已吊销的令牌，防止已登出的令牌继续使用：

```typescript
@Injectable()
export class JwtBlacklistService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // 将令牌添加到 Admin 黑名单
  async addToAdminBlacklist(token: string, ttl: number): Promise<void> {
    await this.cacheManager.set(`admin_blacklist:${token}`, true, ttl * 1000);
  }

  // 检查令牌是否在 Admin 黑名单中
  async isInAdminBlacklist(token: string): Promise<boolean> {
    return !!(await this.cacheManager.get(`admin_blacklist:${token}`));
  }

  // 将令牌添加到 Client 黑名单
  async addToClientBlacklist(token: string, ttl: number): Promise<void> {
    await this.cacheManager.set(`client_blacklist:${token}`, true, ttl * 1000);
  }

  // 检查令牌是否在 Client 黑名单中
  async isInClientBlacklist(token: string): Promise<boolean> {
    return !!(await this.cacheManager.get(`client_blacklist:${token}`));
  }
}
```

## 安全建议

- 在生产环境中，JWT 密钥应通过环境变量设置。
- 定期更换 JWT 密钥以提高安全性。
- 确保 Token 的有效期合理设置，避免过长或过短。
- 使用 HTTPS 传输 JWT 令牌，防止中间人攻击。
- 实现令牌轮换机制，定期刷新访问令牌。
- 使用黑名单机制处理已吊销的令牌。
- 在令牌中只存储必要的信息，避免敏感数据泄露。
- 前端存储令牌时，优先使用 HttpOnly Cookie 或安全的本地存储方式。
