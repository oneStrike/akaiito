import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerVariantGroup,
} from 'unocss'

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
  ],
  shortcuts: [
    ['main-page', 'bg-[var(--el-bg-color)] p-3 overflow-hidden box-border'],
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['cross-center', 'flex items-center'],
    ['main-center', 'flex justify-center'],
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
  ],
  rules: [
    // 文本颜色规则
    [
      /^text-(.*)$/,
      // @ts-expect-error ignore
      ([, c], { theme }) => ({ color: theme.colors[c] }),
      {
        autocomplete:
          'text-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>',
      },
    ],
    // 边框规则 - 统一处理所有边框情况
    [
      /^border(?:-([lrtbxy]))?(?:-(.*))?$/,
      ([, direction, color], { theme }: { theme: any }) => {
        // 方向映射
        const directionMap: Record<string, string[]> = {
          l: ['left'],
          r: ['right'],
          t: ['top'],
          b: ['bottom'],
          x: ['left', 'right'],
          y: ['top', 'bottom'],
        }

        // 获取颜色值，默认为info
        const colorValue = color
          ? theme.colors[color] || theme.colors.borderColor
          : theme.colors.borderColor
        // 如果没有方向，设置全边框
        if (!direction) {
          return {
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': colorValue,
          }
        }

        // 设置指定方向的边框
        const borderDirections = directionMap[direction]
        const styles: Record<string, string> = {}
        borderDirections.forEach((dir) => {
          styles[`border-${dir}-width`] = '1px'
          styles[`border-${dir}-style`] = 'solid'
          styles[`border-${dir}-color`] = colorValue
        })
        return styles
      },
      {
        autocomplete: [
          'border',
          'border-<l|r|t|b|x|y>',
          'border-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>',
          'border-<l|r|t|b|x|y>-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>',
        ],
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
