# UnoCSS 设计系统文档

本文档描述了项目中使用的 UnoCSS 通用样式类系统，旨在提供一致的设计语言和提高开发效率。

## 卡片容器系统

### 基础卡片
- `card`: 标准卡片容器，适用于大部分内容区域
- `card-sm`: 小尺寸卡片，适用于紧凑布局
- `card-lg`: 大尺寸卡片，适用于重要内容展示
- `card-hover`: 带悬停效果的卡片，适用于可交互内容

### 使用示例
```vue
<!-- 标准卡片 -->
<div class="card">
  <h3 class="title-section">标题</h3>
  <p>内容...</p>
</div>

<!-- 可交互卡片 -->
<div class="card-hover" @click="handleClick">
  <h3 class="title-card">可点击卡片</h3>
</div>
```

## 内容区域系统

### 内容容器
- `content-section`: 通用内容区域，适用于信息展示
- `content-highlight`: 高亮内容区域，适用于重要提示
- `content-stats`: 统计数据展示区域，居中对齐
- `content-flex`: 弹性布局内容区域，适用于左右对齐
- `content-grid`: 网格布局内容区域，适用于结构化数据

### 使用示例
```vue
<!-- 信息展示 -->
<div class="content-section">
  <div class="title-sub">标签</div>
  <div class="text-primary">内容</div>
</div>

<!-- 统计数据 -->
<div class="content-stats">
  <div class="text-xs mb-1 text-primary">访问量</div>
  <div class="text-xl font-bold text-primary">1,234</div>
</div>

<!-- 开关控制 -->
<div class="content-flex">
  <div>
    <span class="title-sub">功能开关</span>
    <span class="text-xs text-regular">描述信息</span>
  </div>
  <el-switch v-model="value" />
</div>
```

## 标题系统

### 标题层级
- `title-page`: 页面级标题 (2xl, bold)
- `title-section`: 区块级标题 (lg, semibold)
- `title-card`: 卡片级标题 (base, medium)
- `title-sub`: 子标题 (sm, medium, regular color)

### 使用示例
```vue
<h1 class="title-page">页面标题</h1>
<h2 class="title-section">区块标题</h2>
<h3 class="title-card">卡片标题</h3>
<h4 class="title-sub">子标题</h4>
```

## 装饰条系统

### 装饰条类型
- `accent-bar`: 基础装饰条
- `accent-bar-primary`: 主色调渐变装饰条
- `accent-bar-success`: 成功色渐变装饰条
- `accent-bar-warning`: 警告色渐变装饰条
- `accent-bar-danger`: 危险色渐变装饰条
- `accent-bar-info`: 信息色渐变装饰条
- `accent-bar-neutral`: 中性色渐变装饰条
- `accent-bar-solid`: 纯色装饰条

### 使用示例
```vue
<div class="layout-header">
  <div class="accent-bar-primary" />
  <h3 class="title-section">区块标题</h3>
</div>
```

## 布局系统

### 容器布局
- `layout-container`: 页面主容器
- `layout-header`: 区块头部布局
- `layout-grid-2`: 2列网格布局
- `layout-grid-3`: 3列网格布局
- `layout-grid-4`: 4列网格布局

### 使用示例
```vue
<!-- 页面容器 -->
<div class="layout-container">
  <!-- 区块 -->
  <div class="card">
    <div class="layout-header">
      <div class="accent-bar-primary" />
      <h3 class="title-section">标题</h3>
    </div>
    
    <!-- 4列网格 -->
    <div class="layout-grid-4">
      <div class="content-stats">统计1</div>
      <div class="content-stats">统计2</div>
      <div class="content-stats">统计3</div>
      <div class="content-stats">统计4</div>
    </div>
  </div>
</div>
```

## 状态样式系统

### 状态标签
- `status-success`: 成功状态标签
- `status-warning`: 警告状态标签
- `status-danger`: 危险状态标签
- `status-info`: 信息状态标签

### 使用示例
```vue
<span class="status-success">已发布</span>
<span class="status-warning">待审核</span>
<span class="status-danger">已禁用</span>
<span class="status-info">草稿</span>
```

## 设计原则

### 1. 一致性
- 所有样式类都基于 Element Plus 的设计变量
- 保持统一的间距、圆角、阴影等视觉元素

### 2. 可组合性
- 样式类可以自由组合使用
- 避免样式冲突，保持良好的层叠关系

### 3. 语义化
- 类名具有明确的语义，便于理解和维护
- 按功能和用途分类，而非按样式属性

### 4. 响应式
- 布局类内置响应式断点
- 在不同屏幕尺寸下保持良好的显示效果

## 最佳实践

### 1. 优先使用设计系统类
```vue
<!-- ✅ 推荐 -->
<div class="card">
  <div class="layout-header">
    <div class="accent-bar-primary" />
    <h3 class="title-section">标题</h3>
  </div>
</div>

<!-- ❌ 不推荐 -->
<div class="p-6 rounded-lg bg-[var(--el-fill-color-blank)] border border-[var(--el-border-color-light)] shadow-sm">
  <div class="flex items-center mb-6 gap-2">
    <div class="w-1 h-6 bg-gradient-to-b from-[var(--el-color-primary)] to-[var(--el-color-primary-light-3)] rounded-full" />
    <h3 class="text-lg font-semibold text-[var(--el-text-color-primary)]">标题</h3>
  </div>
</div>
```

### 2. 合理组合使用
```vue
<!-- 统计卡片组合 -->
<div class="layout-grid-4">
  <div class="content-stats cursor-pointer hover:shadow-md transition-shadow" @click="handleClick">
    <div class="text-xs mb-1 text-primary">标签</div>
    <div class="text-xl font-bold text-primary">数值</div>
  </div>
</div>
```

### 3. 扩展自定义样式
```vue
<!-- 在设计系统基础上添加特定样式 -->
<div class="card border-l-4 border-l-primary">
  <!-- 内容 -->
</div>
```

## 维护指南

### 添加新样式类
1. 确保新样式类符合现有命名规范
2. 基于 Element Plus 设计变量
3. 考虑响应式和可访问性
4. 更新此文档

### 修改现有样式类
1. 评估影响范围
2. 保持向后兼容性
3. 更新相关文档和示例
4. 通知团队成员

通过使用这套设计系统，我们可以确保整个应用的视觉一致性，提高开发效率，并降低维护成本。