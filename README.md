# Akaiito

一个基于 Monorepo 架构的全栈应用项目，采用现代化技术栈构建，支持多端开发。

## 📋 项目概述

Akaiito 是一个企业级全栈应用解决方案，采用 pnpm workspace 管理的 Monorepo 架构，包含管理后台、移动端应用、后端服务以及共享工具库。项目遵循现代化开发规范，注重代码质量和开发效率。

## 🏗️ 技术栈

### 前端技术
- **Vue 3.5.13** - 渐进式 JavaScript 框架
- **TypeScript 5.8.3** - 类型安全的 JavaScript 超集
- **Vite 6.3.5** - 下一代前端构建工具
- **Element Plus 2.9.10** - Vue 3 组件库（管理后台）
- **UniApp 3.0** - 跨平台应用开发框架（移动端）
- **Pinia** - Vue 状态管理库
- **Vue Router** - Vue 官方路由管理器
- **UnoCSS 0.59.4** - 原子化 CSS 引擎

### 后端技术
- **NestJS 11.0.1** - 渐进式 Node.js 框架
- **Fastify 5.3.3** - 高性能 Web 框架
- **Prisma 6.10.1** - 现代化数据库 ORM
- **PostgreSQL** - 关系型数据库
- **Redis** - 内存数据库（缓存）
- **JWT** - 身份认证
- **Winston** - 日志管理

### 开发工具
- **pnpm 10.8.0** - 高效的包管理器
- **ESLint + Prettier** - 代码质量和格式化
- **Husky + lint-staged** - Git 钩子和代码检查
- **Jest** - 单元测试框架

## 📁 项目结构

```
akaiito/
├── packages/                    # 子包目录
│   ├── admin/                  # 管理后台 (Vue 3 + Element Plus)
│   │   ├── src/
│   │   │   ├── components/     # 可复用组件
│   │   │   ├── views/          # 页面视图
│   │   │   ├── apis/           # API 接口层
│   │   │   ├── stores/         # Pinia 状态管理
│   │   │   ├── router/         # 路由配置
│   │   │   └── utils/          # 工具函数
│   │   └── package.json
│   │
│   ├── app/                    # 移动端应用 (UniApp + Vue 3)
│   │   ├── src/
│   │   │   ├── pages/          # 页面组件
│   │   │   ├── components/     # 可复用组件
│   │   │   ├── apis/           # API 接口层
│   │   │   ├── stores/         # Pinia 状态管理
│   │   │   └── utils/          # 工具函数
│   │   ├── manifest.json       # UniApp 应用配置
│   │   ├── pages.json          # 页面路由配置
│   │   └── package.json
│   │
│   ├── server-nestjs/          # 后端服务 (NestJS + Fastify)
│   │   ├── src/
│   │   │   ├── modules/        # 业务模块
│   │   │   ├── common/         # 公共模块
│   │   │   ├── config/         # 配置文件
│   │   │   ├── prisma/         # Prisma 配置
│   │   │   └── utils/          # 工具函数
│   │   ├── prisma/             # 数据库模式
│   │   └── package.json
│   │
│   ├── types/                  # 共享类型定义
│   ├── utils/                  # 共享工具库
│   └── att/                    # API 管理工具
│
├── .env                        # 环境变量配置
├── package.json                # 根包配置
├── pnpm-workspace.yaml         # pnpm 工作区配置
├── eslint.config.mjs           # ESLint 配置
├── .prettierrc                 # Prettier 配置
└── unocss.config.ts            # UnoCSS 配置
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: 10.8.0（项目强制使用 pnpm）

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd akaiito

# 安装依赖
pnpm install

# 重新安装所有依赖（包括 Prisma 生成）
pnpm run reinstall
```

### 开发环境启动

```bash
# 启动所有服务
pnpm run dev

# 或者单独启动各个服务
pnpm run dev:admin      # 启动管理后台
pnpm run dev:app        # 启动移动端应用
pnpm run dev:server     # 启动后端服务
pnpm run dev:att        # 启动 API 工具
```

### 数据库配置

```bash
# 进入后端目录
cd packages/server-nestjs

# 生成 Prisma 客户端
pnpm run prisma:generate

# 初始化数据库
pnpm run prisma:init

# 更新数据库结构
pnpm run prisma:update
```

## 📦 子包说明

### @akaiito/admin
管理后台应用，基于 Vue 3 + Element Plus 构建，提供完整的后台管理功能。

**主要功能：**
- 用户管理
- 权限控制
- 数据可视化
- 富文本编辑
- 文件上传

### @akaiito/app
移动端应用，基于 UniApp 框架，支持多平台发布（H5、小程序、App）。

**支持平台：**
- H5 网页
- 微信小程序
- 支付宝小程序
- 百度小程序
- Android/iOS App

### @akaiito/server-nestjs
后端 API 服务，基于 NestJS + Fastify 构建，提供高性能的 RESTful API。

**主要特性：**
- JWT 身份认证
- 数据库 ORM（Prisma）
- 缓存系统（Redis）
- 日志管理
- 文件上传
- API 文档（Swagger）

### @akaiito/types
共享 TypeScript 类型定义，确保前后端类型一致性。

### @akaiito/utils
共享工具函数库，提供通用的业务逻辑和工具方法。

### @akaiito/att
API 管理工具，用于自动生成 API 接口代码。

## 🛠️ 开发规范

### 代码风格
- 使用 **@antfu/eslint-config** 作为 ESLint 配置
- 使用 **Prettier** 进行代码格式化
- 遵循 **TypeScript 严格模式**

### 命名规范
- **文件名**: kebab-case
- **组件名**: PascalCase
- **变量名**: camelCase
- **常量名**: UPPER_SNAKE_CASE

### Git 提交规范
遵循 **Conventional Commits** 规范：
```
<type>(<scope>): <subject>

# 示例
feat(admin): 添加用户管理功能
fix(app): 修复登录页面样式问题
docs: 更新 README 文档
```

## 📝 脚本命令

```bash
# 开发相关
pnpm run dev                    # 启动开发环境
pnpm run dev:admin             # 启动管理后台
pnpm run dev:app               # 启动移动端应用
pnpm run dev:server            # 启动后端服务

# 构建相关
pnpm run build                 # 构建所有项目
pnpm run build:admin          # 构建管理后台
pnpm run build:app            # 构建移动端应用

# 工具相关
pnpm run reinstall             # 重新安装依赖
pnpm run upgrade:app           # 升级 UniApp
pnpm run lint                  # 代码检查
pnpm run test                  # 运行测试
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至：[your-email@example.com]

---

**注意**: 请确保在开发前阅读项目的开发规范文档，遵循统一的代码风格和提交规范。
