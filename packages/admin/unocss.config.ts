import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetRemToPx()],
  shortcuts: [
    ['main-center', 'flex justify-center items-center'],
    ['cross-center', 'flex flex-row justify-center items-center']
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }: { theme: any }) => {
        if (theme.colors[c]) return { color: theme.colors[c] }
      }
    ],
    [
      /^border-(.*)$/,
      ([, pos], { theme }: { theme: any }) => {
        return { [`border-${pos}`]: `1px solid ${theme.colors.border}` }
      }
    ]
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
      border: 'var(--el-border-color)'
    }
  }
})
