import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export const autoRegistryComponent = (): any => {
  return Components({
    dts: 'src/types/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [
      AntDesignVueResolver({
        resolveIcons: true,
        importStyle: false,
      }),
      IconsResolver({
        prefix: 'icon',
        alias: {
          majest: 'majesticons',
          md: 'line-md',
          spinners: 'svg-spinners',
        },
        enabledCollections: ['line-md', 'majesticons', 'svg-spinners'],
        customCollections: ['akaiito'],
      }),
    ],
  })
}
