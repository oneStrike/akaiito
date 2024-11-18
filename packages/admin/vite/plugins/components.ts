import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export const autoRegistryComponent = (): any => {
  return Components({
    dts: 'src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [
      AntDesignVueResolver(),
      IconsResolver({
        prefix: 'icon',
      }),
    ],
  })
}
