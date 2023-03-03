import AutoImport from 'unplugin-auto-import/vite'
export const autoImport = () => {
  return AutoImport({
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        axios: [['default', 'axios']],
        'naive-ui': [],
        '@vueuse/core': [['useImage', 'useVueUseImage']]
      }
    ],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly'
    },
    dts: './src/typings/auto-import.d.ts',
    dirs: ['src/enum', 'src/hook'],
    vueTemplate: true
  })
}
