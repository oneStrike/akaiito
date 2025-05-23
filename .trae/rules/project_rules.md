# 项目开发规范文档（多仓库统一标准）

## 整体架构规范

- **架构模式**：Monorepo（单体多仓），采用pnpm-workspace管理
- **技术栈约束**：
  - 所有前端仓库（admin/app）必须使用 Vue 3 + TypeScript
  - 后端仓库（server）采用 Midway.js + Prisma ORM
  - 工具仓库（utils/types/att）使用 TypeScript
- **统一规范**：
  - 代码风格：`@antfu/eslint-config` + Prettier
  - Git提交：Conventional Commits（`<type>(<scope>): <subject>`
  - 测试覆盖率：前端≥80% / 后端≥70%

## 子仓库规范明细

### 1. admin 仓库（管理后台）

#### 技术栈

- 框架：Vue 3.5.13 + Composition API
- 状态管理：Pinia 3.0.2 + pinia-plugin-persistedstate 4.3.0
- 构建工具：Vite 6.3.5
- 核心依赖：`element-plus`, `axios`, `vue-router 4.5.1`，`UnoCss`，`tailwindcss`
- css原子化组件库：UnoCss

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
│   ├── es-checkbox/    // 自定义组件1
│   ├── es-form/        // 自定义组件2
│   └── ...             // 其他业务组件
├── views/              // 页面视图
│   ├── dashboard/      // 仪表盘模块
│   ├── login/          // 登录模块
│   └── systemMgmt/     // 系统管理模块
├── apis/               // API接口
│   ├── user.ts         // 用户接口
│   └── index.ts        // 接口聚合
├── stores/             // 状态管理
│   ├── modules/        // 模块化store
│   └── index.ts        // store入口
├── hooks/              // 自定义组合函数
├── utils/              // 工具函数
├── types/              // 类型定义
├── layouts/            // 布局组件
│   └── mainLayout.vue  // 主布局
├── App.vue             // 根组件
└── main.ts             // 入口文件
```

### 2. app 仓库（移动端应用）

#### 技术栈

- 框架：UniApp + Vue 3
- 构建工具：Vite + UniApp CLI
- 核心依赖：`@dcloudio/types`, `@uni-helper/uni-types`，`UnoCss`，`tailwindcss`
- css原子化组件库：UnoCss

#### 实际项目结构

```
src/
├── pages/              // 页面组件
│   ├── index/          // 首页模块
│   └── user/           // 用户模块
├── components/         // 可复用组件
│   ├── header/         // 头部组件
│   └── list/           // 列表组件
├── apis/               // API接口
├── stores/             // 状态管理
├── utils/              // 工具函数
├── static/             // 静态资源
│   ├── images/         // 图片资源
│   └── icons/          // 图标资源
├── App.vue             // 根组件
├── main.ts             // 入口文件
├── manifest.json       // 应用配置
└── pages.json          // 页面路由配置
```

### 3. server 仓库（后端服务）

#### 技术栈

- 框架：Midway.js 3.20.4 + Koa
- 数据库：Prisma ORM + PostgreSQL
- 核心依赖：`@midwayjs系列插件`, `@prisma/client 6.7.0`

#### 实际项目结构

```
src/
├── controller/         // 控制器
│   ├── user/           // 用户控制器
│   └── index.ts        // 控制器聚合
├── service/            // 服务层
│   ├── userService.ts  // 用户服务
│   └── index.ts        // 服务聚合
├── prisma/             // ORM配置
│   ├── schema.prisma   // 数据模型
│   └── seed/           // 初始化数据
├── enum/               // 枚举类型
├── config/             // 配置文件
├── middleware/         // 中间件
├── typings/            // 类型定义
├── utils/              // 工具函数
├── interface.ts        // 接口定义
└── configuration.ts    // 服务配置
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

- 框架：Jest + Midway mock
- 接口测试：
  ```ts
  describe('UserController', () => {
    it('GET /users/:id should return user data', async () => {
      const result = await app.get('/users/1').expect(200)
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
