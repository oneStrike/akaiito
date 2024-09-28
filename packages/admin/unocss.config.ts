import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetAttributify, presetUno, presetWind } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'mock', './stats.html'],
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, 'src/**/*.{js,ts}'],
    },
  },
  transformers: [transformerVariantGroup()],
  presets: [presetUno(), presetAttributify(), presetRemToPx(), presetWind()],
  shortcuts: [
    ['main-page', 'bg-[var(--el-bg-color)] p-3 overflow-hidden box-border'],
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['cross-center', 'flex items-center'],
    ['main-center', 'flex justify-center'],
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }: { theme: any }) => ({ color: theme.colors[c] }),
      { autocomplete: 'text-<theme|error|success|info|warning|primary|regular|secondary|disabled|borderColor>' },
    ],
    [
      /^border-(.*)$/,
      ([, c], { theme }: { theme: any }) => ({ [`border-${c}`]: `1px solid ${theme.colors.borderColor}` }),
      { autocomplete: 'border-<top|right|bottom|left>' },
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
