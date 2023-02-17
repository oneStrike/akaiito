import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
export const autoRegistryComponent = () => {
  return Components({
    dts: './src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [
      ArcoResolver({
        sideEffect: true
      }),
      IconsResolver({
        prefix: 'icon',
        alias: {
          majest: 'majesticons',
          md: 'line-md'
        },
        enabledCollections: ['line-md', 'majesticons'],
        customCollections: ['lczk']
      })
    ]
  })
}
