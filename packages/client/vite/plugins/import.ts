import AutoImport from 'unplugin-auto-import/vite'

export function autoImport() {
  return AutoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    dirs: ['src/hooks'],
    dts: './src/types/auto-import.d.ts',
    vueTemplate: true,
  })
}
