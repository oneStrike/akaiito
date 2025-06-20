# 项目开发规范文档（多仓库统一标准）

你是一位极其专业的前端开发工程师，精通熟悉各种端技术，对前端开发有极强的要求，并且对前端开发有非常 strong 的要求。

## 基础规则

- **编译变量**：当提问以`!!`或者`！！`结尾时，你只需要将内容翻译成代码变量，然后直接输出即可。要求输出多种格式，提供全拼和简写形式。

## 整体架构规范

- **架构模式**：Monorepo（单体多仓），采用pnpm-workspace管理
- **包管理器**：pnpm@10.8.0（强制使用，通过preinstall脚本限制）
- **Node.js版本**：>=18.0.0
- **技术栈约束**：
  - 所有前端仓库（admin/app）必须使用 Vue 3.5.13 + TypeScript 5.8.3
  - 后端仓库（server-nestjs）采用 NestJS 11.0.1 + Fastify 5.3.3 + Prisma ORM
    6.10.1
  - 工具仓库（utils/types/att）使用 TypeScript + pkgroll构建
- **统一规范**：
  - 代码风格：`@antfu/eslint-config@4.13.0` + Prettier 3.5.3
  - CSS框架：UnoCSS 66.1.1（全项目统一）
  - Git提交：Conventional Commits（`<type>(<scope>): <subject>`）
  - Git钩子：simple-git-hooks + lint-staged（提交前自动格式化）
  - 测试覆盖率：前端≥80% / 后端≥70%

## 子仓库规范明细

### 1. admin 仓库（管理后台）

#### 技术栈

- **框架**：Vue 3.5.13 + Composition API + TypeScript 5.8.3
- **构建工具**：Vite 6.3.5 + vue-tsc 2.2.10
- **状态管理**：Pinia 3.0.2 + pinia-plugin-persistedstate 4.3.0
- **UI组件库**：Element Plus 2.9.10 + @element-plus/icons-vue 2.3.1
- **路由管理**：Vue Router 4.5.1
- **HTTP客户端**：axios 1.9.0
- **工具库**：@vueuse/core 13.1.0, lodash（继承自根目录）
- **CSS预处理**：Sass 1.88.0 + UnoCSS 66.1.1
- **富文本编辑**：TinyMCE 7.8.0 + @tinymce/tinymce-vue 6.1.0
- **拖拽排序**：sortablejs 1.15.6, vuedraggable 2.24.3
- **进度条**：nprogress 0.2.0
- **加密工具**：jsrsasign 11.1.0, node-forge 1.3.1
- **图标库**：@iconify-json/line-md, @iconify-json/majesticons,
  @iconify-json/tabler
- **开发工具**：
  - 自动导入：unplugin-auto-import 19.2.0, unplugin-vue-components 28.5.0
  - 图标插件：unplugin-icons 22.1.0
  - 构建分析：rollup-plugin-visualizer 5.14.0
  - 压缩插件：vite-plugin-compression 0.5.1
  - 开发工具：vite-plugin-vue-devtools 7.7.6

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
├── views/              // 页面视图
├── apis/               // API接口层
├── stores/             // Pinia状态管理
├── hooks/              // Vue 3 Composition API钩子
├── utils/              // 工具函数
├── types/              // TypeScript类型定义
├── router/             // Vue Router路由配置
├── layouts/            // 布局组件
├── config/             // 配置文件
├── enum/               // 枚举定义
├── core/               // 核心启动文件
├── assets/             // 静态资源
├── global.d.ts         // 全局类型声明
├── App.vue             // 根组件
└── main.ts             // 应用入口
```

### 2. app 仓库（移动端应用）

#### 技术栈

- **框架**：UniApp 3.0.0-4060520250512001 + Vue 3.5.13
- **构建工具**：Vite + @dcloudio/vite-plugin-uni
- **状态管理**：Pinia 2.3.1 + pinia-plugin-persistedstate 4.2.0
- **多端支持**：
  - H5：@dcloudio/uni-h5
  - 小程序：@dcloudio/uni-mp-weixin, @dcloudio/uni-mp-alipay,
    @dcloudio/uni-mp-baidu 等
  - App：@dcloudio/uni-app-plus, @dcloudio/uni-app-harmony
  - 快应用：@dcloudio/uni-quickapp-webview
- **UI组件库**：@dcloudio/uni-ui 1.5.7
- **国际化**：vue-i18n 9.14.4
- **CSS框架**：UnoCSS 66.1.1 + unocss-applet 0.8.5
- **工具库**：
  - 数据处理：destr 2.0.5, deep-pick-omit 1.2.1
  - 中文转换：opencc-js 1.0.5（简繁转换）
- **开发工具**：
  - 类型支持：@uni-helper/uni-types
  - 包管理：pnpm@8.15.9

#### 实际项目结构

```
src/
├── pages/              // 页面组件
├── components/         // 可复用组件
│   └── libs/           // 第三方组件库
├── apis/               // API接口层
├── stores/             // Pinia状态管理
├── hooks/              // Vue 3 Composition API钩子
├── utils/              // 工具函数
├── types/              // TypeScript类型定义
├── config/             // 配置文件
├── core/               // 核心启动文件
├── enum/               // 枚举定义
├── static/             // 静态资源
├── env.d.ts            // 环境变量类型
├── vite-env.d.ts       // Vite环境类型
├── shime-uni.d.ts      // UniApp类型声明
├── App.vue             // 根组件
├── main.ts             // 应用入口
├── manifest.json       // UniApp应用配置
└── pages.json          // UniApp页面路由配置
```

### 3. server-nestjs 仓库（后端服务）

#### 技术栈

- **框架**：NestJS 11.0.1 + @nestjs/platform-fastify 11.1.2
- **HTTP服务器**：Fastify 5.3.3 + fastify-plugin 5.0.1
- **数据库**：
  - ORM：Prisma 6.10.1 + @prisma/client 6.10.1
  - 适配器：@prisma/adapter-pg 6.10.1
  - 数据库：PostgreSQL
- **认证授权**：
  - JWT：@nestjs/jwt 11.0.0
  - Passport：@nestjs/passport 11.0.5 + passport 0.7.0
  - 策略：passport-jwt 4.0.1, passport-local 1.0.0
- **缓存系统**：
  - 缓存管理：@nestjs/cache-manager 3.0.1 + cache-manager 6.4.3
  - Redis：@keyv/redis 4.4.0 + keyv 5.3.3
  - 缓存库：cacheable 1.9.0
- **日志系统**：
  - 日志框架：nest-winston 1.10.2 + winston 3.17.0
  - 日志轮转：winston-daily-rotate-file 5.0.0
- **数据验证**：
  - 验证器：class-validator 0.14.2
  - 转换器：class-transformer 0.5.1
- **文件处理**：
  - 文件上传：@fastify/multipart 9.0.3
  - 静态文件：@fastify/static 8.2.0
  - 文件压缩：tar 7.4.3
- **安全工具**：
  - 密码加密：bcryptjs 3.0.2
  - UUID生成：uuid 11.1.0
  - 验证码：svg-captcha 1.4.0
- **地理位置**：MaxMind GeoIP2：@maxmind/geoip2-node 6.1.0
- **HTTP客户端**：axios 1.9.0
- **任务调度**：node-cron 4.1.0
- **上下文管理**：nestjs-cls 6.0.0
- **配置管理**：@nestjs/config 4.0.2 + dotenv 16.5.0
- **开发工具**：
  - 构建：@swc/core 1.10.7 + @swc/cli 0.6.0
  - 热重载：webpack + webpack.config.js
  - 测试：Jest + @nestjs/testing 11.0.1
  - API文档：@nestjs/swagger 11.2.0

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
├── global/             // 全局模块
├── nestjs/             // NestJS配置
├── prisma/             // Prisma配置
│   ├── client/         // 生成的Prisma客户端
│   └── seed/           // 数据库种子
├── utils/              // 工具函数
│   └── index.ts        // 工具函数入口
├── global.d.ts         // 全局类型定义
├── app.module.ts       // 应用主模块
└── main.ts             // 应用入口

# 项目根目录配置文件
prisma/
├── schema.prisma       // Prisma数据库模式
└── ...

# 环境配置
.env                    // 环境变量配置
.env.development        // 开发环境配置
.env.production         // 生产环境配置

# 构建配置
webpack.config.js       // Webpack配置
nest-cli.json          // NestJS CLI配置
tsconfig.json          // TypeScript配置
tsconfig.build.json    // 构建TypeScript配置

# 其他目录
uploads/               // 文件上传目录
rsa/                   // RSA密钥目录
docs/                  // 文档目录
test/                  // 测试目录
public/                // 静态文件目录
scripts/               // 脚本目录
```

### 4. 公共仓库规范

#### 1. types 仓库

#### 技术栈

- **TypeScript**: ^5.0.0 - 类型定义语言
- **导出格式**: `.d.ts` 类型文件
- **模块系统**: ES Module 和 CommonJS 双模块支持

#### 常用脚本

- 类型定义规范：
  - 所有共享类型使用PascalCase
  - DTO对象必须以`DTO`结尾（如`UserResponseDTO`）
  - 枚举类型使用PascalCase（如`UserRoleEnum`）

#### 2. utils 仓库

#### 技术栈

- **TypeScript**: ^5.0.0 - 开发语言
- **模块系统**: ES Module 和 CommonJS 双模块支持
- **构建工具**: 自定义构建脚本
- **测试框架**: Jest (用于单元测试)
- **代码质量**: ESLint + Prettier
- **Node.js**: >=18.0.0 - 运行环境要求

### 5. att 仓库（API管理工具）

#### 技术栈

- **TypeScript**: ^5.0.0 - 开发语言
- **模块系统**: ES Module 和 CommonJS 双模块支持
- **CLI框架**: Commander.js (命令行接口)
- **文件系统**: fs-extra (文件操作增强)
- **模板引擎**: 自定义模板系统
- **构建工具**: 自定义构建脚本
- **Node.js**: >=18.0.0 - 运行环境要求
- **可执行文件**: 支持全局安装和本地使用

## 开发规范

### 代码风格

- **ESLint**: ^8.0.0 + **Prettier**: ^3.0.0 进行代码格式化
- 遵循 **TypeScript 严格模式**（strict: true）
- 使用 **Husky**: ^8.0.0 + **lint-staged**: ^13.0.0 进行提交前检查
- **EditorConfig** 统一编辑器配置
- **VSCode** 推荐插件和设置

### 命名规范

#### 文件和目录命名

- **文件名**: kebab-case（如：`user-profile.vue`, `api-client.ts`）
- **目录名**: kebab-case（如：`user-management/`, `api-services/`）
- **组件文件**: PascalCase（如：`UserProfile.vue`, `DataTable.tsx`）

#### 代码命名

- **组件名**: PascalCase（如：`UserProfile`, `DataTable`）
- **变量名**: camelCase（如：`userName`, `apiResponse`）
- **函数名**: camelCase（如：`getUserInfo`, `handleSubmit`）
- **常量名**: UPPER_SNAKE_CASE（如：`API_BASE_URL`, `MAX_FILE_SIZE`）
- **类型名**: PascalCase（如：`UserInfo`, `ApiResponse`）
- **接口名**: PascalCase，以 I 开头（如：`IUserService`, `IApiClient`）
- **枚举名**: PascalCase（如：`UserStatus`, `ApiErrorCode`）

#### 特殊命名规范

- **Vue组件**: 使用 PascalCase，至少两个单词（如：`UserCard`, `DataList`）
- **React组件**: 使用 PascalCase（如：`UserProfile`, `DataTable`）
- **API路由**: 使用 kebab-case（如：`/api/user-profile`, `/api/data-list`）
- **数据库表名**: snake_case（如：`user_profiles`, `data_records`）
- **环境变量**: UPPER_SNAKE_CASE（如：`DATABASE_URL`, `JWT_SECRET`）

### 目录结构规范

#### 通用规范

- **按功能模块划分目录**，而非按文件类型
- **公共组件**放在 `components` 目录
- **工具函数**放在 `utils` 目录
- **类型定义**放在 `types` 目录
- **配置文件**放在 `config` 目录
- **静态资源**放在 `assets` 或 `static` 目录

#### 文件组织原则

- **就近原则**: 相关文件放在同一目录
- **单一职责**: 每个文件只负责一个功能
- **层次清晰**: 目录层次不超过4层
- **命名一致**: 同类文件使用统一命名规范

#### 导入导出规范

- **绝对路径**: 使用别名进行绝对路径导入（如：`@/components/UserCard`）
- **相对路径**: 同级或子级目录使用相对路径（如：`./UserCard`,
  `../utils/format`）
- **默认导出**: 组件和主要功能使用默认导出
- **命名导出**: 工具函数和辅助功能使用命名导出
- **类型导出**: 类型定义使用 `export type` 或 `export interface`

## 安全规范

#### 构建优化

- **代码分割**: 路由级别的懒加载
- **Tree Shaking**: 移除未使用的代码
- **压缩优化**: Gzip/Brotli压缩
- **资源优化**: 图片压缩、字体子集化
- **缓存策略**: 长期缓存 + 版本控制

#### 运行时优化

- **虚拟滚动**: 大列表性能优化
- **防抖节流**: 用户输入优化
- **图片懒加载**: 延迟加载非关键图片
- **组件缓存**: keep-alive缓存组件
- **状态管理**: 合理使用全局状态

#### 网络优化

- **HTTP/2**: 多路复用
- **CDN**: 静态资源CDN加速
- **预加载**: 关键资源预加载
- **Service Worker**: 离线缓存
- **API优化**: 减少请求次数、合并请求

### 后端性能优化

#### 数据库优化

- **索引优化**: 合理创建和使用索引
- **查询优化**: 避免N+1查询、使用连接查询
- **连接池**: 数据库连接池配置
- **读写分离**: 主从数据库分离
- **分页查询**: 大数据量分页处理

#### 缓存策略

- **Redis缓存**: 热点数据缓存
- **查询缓存**: 数据库查询结果缓存
- **页面缓存**: 静态页面缓存
- **CDN缓存**: 静态资源缓存
- **缓存更新**: 缓存失效和更新策略

#### 前端监控

- **Core Web Vitals**: LCP、FID、CLS指标
- **用户体验**: 页面加载时间、交互响应
- **错误监控**: JavaScript错误、资源加载失败
- **性能分析**: 性能瓶颈分析

#### 后端监控

- **响应时间**: API响应时间监控
- **吞吐量**: QPS、TPS监控
- **资源使用**: CPU、内存、磁盘使用率
- **数据库性能**: 慢查询、连接数监控
- **错误率**: 接口错误率监控
