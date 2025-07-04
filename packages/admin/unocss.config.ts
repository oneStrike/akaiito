import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetAttributify, presetWind4 } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        'dist',
        '.git',
        '.husky',
        '.vscode',
        'public',
        'build',
        'mock',
        './stats.html',
      ],
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
  transformers: [transformerVariantGroup()],
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
    presetRemToPx(),
  ],
  shortcuts: [
    ['main-page', 'bg-[var(--el-bg-color)] p-3 overflow-hidden box-border'],
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['cross-center', 'flex items-center'],
    ['main-center', 'flex justify-center'],
    // 通用卡片容器系统
    ['card', 'p-6 rounded-lg bg-[var(--el-fill-color-blank)] border border-[var(--el-border-color-light)] shadow-sm'],
    ['card-sm', 'p-4 rounded-lg bg-[var(--el-fill-color-lighter)] border border-[var(--el-border-color-light)]'],
    ['card-lg', 'p-8 rounded-xl bg-[var(--el-fill-color-blank)] border border-[var(--el-border-color-light)] shadow-md'],
    ['card-hover', 'p-6 rounded-lg bg-[var(--el-fill-color-blank)] border border-[var(--el-border-color-light)] shadow-sm hover:shadow-md transition-shadow cursor-pointer'],
    
    // 通用内容区域
    ['content-section', 'p-4 rounded-lg bg-[var(--el-fill-color-lighter)] border border-[var(--el-border-color-light)]'],
    ['content-highlight', 'p-4 rounded-lg bg-[var(--el-color-warning-light-9)] border border-[var(--el-color-warning-light-5)]'],
    ['content-stats', 'rounded-lg text-center p-4 bg-[var(--el-fill-color-lighter)] border border-[var(--el-border-color-light)]'],
    ['content-flex', 'flex items-center justify-between p-4 rounded-lg bg-[var(--el-fill-color-lighter)] border border-[var(--el-border-color-light)]'],
    ['content-grid', 'grid gap-4 p-4 rounded-lg bg-[var(--el-fill-color-lighter)] border border-[var(--el-border-color-light)]'],
    
    // 通用标题系统
    ['title-section', 'text-lg font-semibold text-[var(--el-text-color-primary)]'],
    ['title-page', 'text-2xl font-bold text-[var(--el-text-color-primary)]'],
    ['title-card', 'text-base font-medium text-[var(--el-text-color-primary)]'],
    ['title-sub', 'text-sm font-medium text-[var(--el-text-color-regular)]'],
    
    // 通用装饰条系统
    ['accent-bar', 'w-1 h-6 rounded-full'],
    ['accent-bar-primary', 'w-1 h-6 bg-gradient-to-b from-[var(--el-color-primary)] to-[var(--el-color-primary-light-3)] rounded-full'],
    ['accent-bar-success', 'w-1 h-6 bg-gradient-to-b from-[var(--el-color-success)] to-[var(--el-color-success-light-3)] rounded-full'],
    ['accent-bar-warning', 'w-1 h-6 bg-gradient-to-b from-[var(--el-color-warning)] to-[var(--el-color-warning-light-3)] rounded-full'],
    ['accent-bar-danger', 'w-1 h-6 bg-gradient-to-b from-[var(--el-color-danger)] to-[var(--el-color-danger-light-3)] rounded-full'],
    ['accent-bar-info', 'w-1 h-6 bg-gradient-to-b from-[var(--el-color-info)] to-[var(--el-color-info-light-3)] rounded-full'],
    ['accent-bar-neutral', 'w-1 h-6 bg-gradient-to-b from-[var(--el-text-color-regular)] to-[var(--el-text-color-placeholder)] rounded-full'],
    ['accent-bar-solid', 'w-1 h-6 bg-[var(--el-color-primary)] rounded-full'],
    
    // 通用布局系统
    ['layout-container', 'p-4 space-y-6 rounded-lg bg-[var(--el-bg-color-page)]'],
    ['layout-header', 'flex items-center mb-6 gap-2'],
    ['layout-grid-2', 'grid grid-cols-1 lg:grid-cols-2 gap-6'],
    ['layout-grid-3', 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'],
    ['layout-grid-4', 'grid grid-cols-2 lg:grid-cols-4 gap-6'],
    
    // 通用状态样式
    ['status-success', 'text-[var(--el-color-success)] bg-[var(--el-color-success-light-9)] border border-[var(--el-color-success-light-5)] px-2 py-1 rounded text-xs'],
    ['status-warning', 'text-[var(--el-color-warning)] bg-[var(--el-color-warning-light-9)] border border-[var(--el-color-warning-light-5)] px-2 py-1 rounded text-xs'],
    ['status-danger', 'text-[var(--el-color-danger)] bg-[var(--el-color-danger-light-9)] border border-[var(--el-color-danger-light-5)] px-2 py-1 rounded text-xs'],
    ['status-info', 'text-[var(--el-color-info)] bg-[var(--el-color-info-light-9)] border border-[var(--el-color-info-light-5)] px-2 py-1 rounded text-xs'],
  ],
  safelist: [
    'text-theme',
    'text-error',
    'text-success',
    'text-info',
    'text-warning',
    'text-primary',
    'text-regular',
    'text-secondary',
    'text-disabled',
    'border-theme',
    'border-error',
    'border-success',
    'border-info',
    'border-warning',
    'border-primary',
  ],
  rules: [
    [
      /^text-(.*)$/,
      // @ts-expect-error ignore
      ([, c], { theme }) => ({ color: theme.colors[c] }),
      {
        autocomplete:
          'text-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>',
      },
    ],
    [
      /^border-(.*)$/,
      ([, c], { theme }: { theme: any }) => ({
        'border-color': theme.colors[c] || theme.colors.borderColor,
      }),
      {
        autocomplete:
          'border-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>',
      },
    ],
    // 添加默认border颜色规则
    [
      'border',
      {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'var(--el-border-color-light)',
      },
    ],
  ],
  theme: {
    colors: {
      theme: 'var(--el-color-primary)',
      error: 'var(--el-color-error)',
      success: 'var(--el-color-success)',
      info: 'var(--el-color-info)',
      warning: 'var(--el-color-warning)',
      primary: 'var(--el-text-color-primary)',
      regular: 'var(--el-text-color-regular)',
      secondary: 'var(--el-text-color-secondary)',
      disabled: 'var(--el-text-color-disabled)',
      borderColor: 'var(--el-border-color-light)',
    },
  },
})
