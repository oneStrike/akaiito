import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export const autoImport = () =>
  AutoImport({
    resolvers: [NaiveUiResolver()],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        axios: [['default', 'axios']],
        '@vueuse/core': [['useImage', 'useVueUseImage']]
      }
    ],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly'
    },
    dts: './src/typings/auto-import.d.ts',
    dirs: ['src/enum', 'src/hooks'],
    vueTemplate: true
  })
