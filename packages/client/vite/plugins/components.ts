import type { Plugin } from 'vite'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import Components from '@uni-helper/vite-plugin-uni-components'

export const AutoRegistryComponent = () => {
  return Components({
    deep: true,
    extensions: ['vue'],
    dts: 'src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [UniUIResolver()]
  }) as unknown as Plugin
}
