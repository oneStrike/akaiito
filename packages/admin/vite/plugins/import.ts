import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const autoImport = () =>
  AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        axios: [['default', 'axios']],
        '@vueuse/core': [['useImage', 'useVueUseImage']],
      },
    ],
    eslintrc: {
      enabled: true,
      filepath: './../../.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    dts: './src/typings/auto-import.d.ts',
    vueTemplate: true,
  })
