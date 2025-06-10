# 项目开发规范文档（多仓库统一标准）

## 整体架构规范

- **架构模式**：Monorepo（单体多仓），采用pnpm-workspace管理
- **技术栈约束**：
  - 所有前端仓库（admin/app）必须使用 Vue 3 + TypeScript
  - 后端仓库（server-nestjs）采用 NestJS 11 + Fastify + Prisma ORM
  - 工具仓库（utils/types/att）使用 TypeScript
- **统一规范**：
  - 代码风格：`@antfu/eslint-config` + Prettier
  - Git提交：Conventional Commits（`<type>(<scope>): <subject>`）
  - 测试覆盖率：前端≥80% / 后端≥70%

## 子仓库规范明细

### 1. admin 仓库（管理后台）

#### 技术栈

- 框架：Vue 3.5.13 + Composition API
- 状态管理：Pinia 3.0.2 + pinia-plugin-persistedstate 4.3.0
- 构建工具：Vite + TypeScript 5.8.3
- UI组件库：Element Plus 2.9.10 + @element-plus/icons-vue 2.3.1
- 核心依赖：`axios 1.9.0`, `vue-router 4.5.1`, `@vueuse/core 13.1.0`
- CSS原子化：UnoCSS + Sass 1.88.0
- 富文本编辑：TinyMCE 7.8.0 + @tinymce/tinymce-vue 6.1.0
- 其他工具：sortablejs 1.15.6, vuedraggable 2.24.3, nprogress 0.2.0

#### 开发规范

```ts
// 组件规范示例（Vue 3 Composition API）
interface Props {
  items: Array<ItemType>
  selectedId: number | null
  onItemSelect: (id: number) => void
}

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
  (event: 'item-select', id: number): void
}>()

const handleSelect = (id: number) => {
  emits('item-select', id)
}
```

#### 实际项目结构

```
src/
├── components/         // 可复用UI组件
│   ├── es-checkbox/    // 复选框组件
│   ├── es-form/        // 表单组件
│   ├── es-editor/      // 编辑器组件
│   ├── es-table/       // 表格组件
│   ├── es-upload/      // 上传组件
│   ├── es-modal/       // 模态框组件
│   └── ...             // 其他业务组件
├── views/              // 页面视图
│   ├── dashboard/      // 仪表盘模块
│   ├── login/          // 登录模块
│   ├── appMgmt/        // 应用管理模块
│   ├── contentMgmt/    // 内容管理模块
│   ├── systemMgmt/     // 系统管理模块
│   └── shared/         // 共享页面组件
├── apis/               // API接口
│   ├── admin.ts        // 管理员接口
│   ├── user.ts         // 用户接口
│   ├── auth.ts         // 认证接口
│   ├── upload.ts       // 上传接口
│   └── types/          // 接口类型定义
├── stores/             // 状态管理
│   ├── modules/        // 模块化store
│   └── index.ts        // store入口
├── hooks/              // 自定义组合函数
│   ├── useRequest.ts   // 请求hook
│   ├── useForm.ts      // 表单hook
│   ├── useUpload.ts    // 上传hook
│   └── ...             // 其他hooks
├── utils/              // 工具函数
│   ├── request/        // 请求工具
│   └── table.ts        // 表格工具
├── types/              // 类型定义
├── router/             // 路由配置
│   ├── modules/        // 路由模块
│   ├── guard.ts        // 路由守卫
│   └── index.ts        // 路由入口
├── layouts/            // 布局组件
│   └── layoutMain.vue  // 主布局
├── config/             // 配置文件
├── enum/               // 枚举定义
├── core/               // 核心启动文件
├── assets/             // 静态资源
├── App.vue             // 根组件
└── main.ts             // 入口文件
```

### 2. app 仓库（移动端应用）

#### 技术栈

- 框架：UniApp 3.0.0 + Vue 3.5.13
- 构建工具：Vite 5.2.8 + @dcloudio/vite-plugin-uni
- 状态管理：Pinia 2.3.1 + pinia-plugin-persistedstate 4.2.0
- 核心依赖：`@dcloudio/uni-ui 1.5.7`, `@uni-helper/uni-types`, `vue-i18n 9.14.4`
- CSS原子化：UnoCSS + unocss-applet 0.8.5 + Sass 1.78.0
- 工具库：destr 2.0.5, deep-pick-omit 1.2.1, opencc-js 1.0.5

#### 实际项目结构

```
src/
├── pages/              // 页面组件
│   ├── login/          // 登录页面
│   ├── register/       // 注册页面
│   ├── tabBar/         // 底部导航页面
│   └── word-detail/    // 详情页面
├── components/         // 可复用组件
│   ├── es-button/      // 按钮组件
│   ├── es-nav-bar/     // 导航栏组件
│   ├── es-list/        // 列表组件
│   ├── es-swiper/      // 轮播组件
│   ├── es-tabs/        // 标签页组件
│   ├── es-upload/      // 上传组件
│   └── libs/           // 第三方组件库
├── apis/               // API接口
│   ├── user.ts         // 用户接口
│   ├── upload.ts       // 上传接口
│   └── types/          // 接口类型
├── stores/             // 状态管理
│   ├── modules/        // 模块化store
│   └── index.ts        // store入口
├── hooks/              // 自定义组合函数
│   ├── useRouter.ts    // 路由hook
│   ├── usePreview.ts   // 预览hook
│   └── useWx.ts        // 微信hook
├── utils/              // 工具函数
│   ├── request/        // 请求工具
│   └── index.ts        // 工具入口
├── types/              // 类型定义
├── config/             // 配置文件
├── core/               // 核心启动文件
├── enum/               // 枚举定义
├── static/             // 静态资源
│   ├── images/         // 图片资源
│   ├── icons/          // 图标资源
│   └── tabBar/         // 底部导航图标
├── App.vue             // 根组件
├── main.ts             // 入口文件
├── manifest.json       // 应用配置
└── pages.json          // 页面路由配置
```

### 3. server-nestjs 仓库（后端服务）

#### 技术栈

- 框架：NestJS 11.0.1 + Fastify 5.3.3
- 数据库：Prisma ORM 6.9.0 + PostgreSQL + @prisma/adapter-pg 6.9.0
- 认证：@nestjs/jwt 11.0.0 + @nestjs/passport 11.0.5 + passport-jwt 4.0.1
- 缓存：@nestjs/cache-manager 3.0.1 + @keyv/redis 4.4.0
- 日志：nest-winston 1.10.2 + winston 3.17.0
- 验证：class-validator 0.14.2 + class-transformer 0.5.1
- 文件上传：@fastify/multipart 9.0.3 + @fastify/static 8.2.0
- 其他工具：bcryptjs 3.0.2, uuid 11.1.0, svg-captcha 1.4.0

#### 实际项目结构

```
src/
├── modules/            // 业务模块
│   ├── admin/          // 管理员模块
│   ├── client/         // 客户端模块
│   └── shared/         // 共享模块
├── common/             // 公共模块
│   ├── decorators/     // 装饰器
│   ├── dto/            // 数据传输对象
│   ├── enum/           // 枚举类型
│   ├── filters/        // 异常过滤器
│   ├── guards/         // 守卫
│   ├── interceptors/   // 拦截器
│   ├── module/         // 公共模块
│   ├── serializers/    // 序列化器
│   └── services/       // 公共服务
├── config/             // 配置文件
│   ├── database.config.ts  // 数据库配置
│   ├── jwt.config.ts       // JWT配置
│   ├── logger.config.ts    // 日志配置
│   └── upload.config.ts    // 上传配置
├── global/             // 全局模块
│   ├── global.module.ts    // 全局模块定义
│   └── services/           // 全局服务
├── nestjs/             // NestJS配置
│   ├── multipart.ts    // 文件上传配置
│   └── swagger.ts      // API文档配置
├── prisma/             // Prisma配置
│   ├── client/         // 数据库客户端
│   └── seed/           // 数据库种子
├── examples/           // 示例代码
├── app.module.ts       // 应用主模块
├── main.ts             // 应用入口
└── global.d.ts         // 全局类型定义
```

### 4. 公共仓库规范

#### 1. types 仓库

- 类型定义规范：
  - 所有共享类型使用PascalCase
  - DTO对象必须以`DTO`结尾（如`UserResponseDTO`）
  - 枚举类型使用PascalCase（如`UserRoleEnum`）

#### 2. utils 仓库

- 工具函数规范：
  - 必须包含完整的JSDoc注释
  - 纯函数优先
  - 异步函数必须处理错误（try/catch）

```ts
// 工具函数示例
/**
 * 深度克隆对象
 * @param obj 需要克隆的对象
 * @returns 克隆后的对象
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
```

### 5. att 仓库（API管理工具）

#### 技术栈

- 框架：TypeScript + Node.js
- 核心功能：API接口管理

#### 项目结构

```
src/
├── formatApiTree.ts    // API树格式化
├── generateTypes.ts    // 类型生成
├── prettier.config.ts  // 格式化配置
└── index.ts            // 入口文件
```

## 统一测试规范

### 前端测试

- 框架：Vitest + Vue Testing Library
- 快照测试：每个组件必须包含
- 异步测试：
  ```ts
  test('加载数据并渲染', async () => {
    const { getByText } = render(<MyComponent />)
    await waitFor(() => expect(getByText('加载完成')).toBeInTheDocument())
  })
  ```

### 后端测试

- 框架：Jest 29.7.0 + @nestjs/testing 11.0.1
- 接口测试：
  ```ts
  describe('UserController', () => {
    it('GET /users/:id should return user data', async () => {
      const result = await request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
      expect(result.body.data).toHaveProperty('email')
    })
  })
  ```

## 安全规范

1. 传输安全：
   - 所有API请求必须使用HTTPS
   - 敏感数据必须加密传输（JWT令牌）
2. 接口鉴权：
   - 后端必须实现JWT鉴权
   - 必须验证Token有效性
3. 输入校验：
   - 所有接口必须进行参数校验
   - 使用`class-validator`进行DTO验证

## 版本控制

1. 主分支保护：
   - main分支设置强制Code Review
   - 子仓库独立发布版本
2. Changelog：
   - 使用standard-changelog生成变更日志
   - 每个子仓库独立维护
