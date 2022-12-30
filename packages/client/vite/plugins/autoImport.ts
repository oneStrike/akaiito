import AutoImport from 'unplugin-auto-import/vite'
export const autoImport = () => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.nvue$/ // .nvue
    ],
    imports: ['uni-app', 'pinia', 'vue'],
    dts: 'src/typings/auto-import.d.ts',
    dirs: ['src/components'],
    vueTemplate: true,
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly'
    }
  })
}
