import AutoImport from 'unplugin-auto-import/vite'

export const autoImport = () =>
  AutoImport({
    imports: ['vue', 'pinia', 'uni-app'],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly'
    },
    dts: './src/typings/auto-import.d.ts',
    vueTemplate: true
  })
