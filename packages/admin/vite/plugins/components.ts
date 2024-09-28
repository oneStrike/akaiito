import type { Plugin } from 'vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function AutoRegistryComponent() {
  return Components({
    dts: 'src/' + '/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'icon',
        alias: {
          majest: 'majesticons',
          md: 'line-md',
          bx: 'bx',
        },
        enabledCollections: ['line-md', 'majesticons', 'tabler'],
        customCollections: ['auy'],
      }),
    ],
  }) as Plugin
}
