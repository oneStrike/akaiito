import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function autoImport() {
  return AutoImport({
    resolvers: [ElementPlusResolver()],
    dirs: ['src/hooks'],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        'axios': [['default', 'axios']],
        '@vueuse/core': [['useImage', 'useVueUseImage']],
      },
    ],
    eslintrc: {
      enabled: true,
      filepath: '.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    dts: 'src/types/auto-import.d.ts',
    vueTemplate: true,
  })
}
