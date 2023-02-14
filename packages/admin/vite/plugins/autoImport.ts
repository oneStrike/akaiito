import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
export const autoImport = () => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/ // .vue
    ],
    imports: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        axios: [['default', 'axios']]
      }
    ],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: 'readonly'
    },
    resolvers: [AntDesignVueResolver()],
    dts: './src/typings/auto-import.d.ts',
    dirs: ['src/components'],
    vueTemplate: true
  })
}
