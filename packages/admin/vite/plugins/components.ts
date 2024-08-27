import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const AutoRegistryComponent = () => {
  return Components({
    dts: 'src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'icon',
        alias: {
          majest: 'majesticons',
          md: 'line-md',
          bx: 'bx'
        },
        enabledCollections: ['line-md', 'majesticons', 'tabler'],
        customCollections: ['akaiito']
      })
    ]
  })
}
