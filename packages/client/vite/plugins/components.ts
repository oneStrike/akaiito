import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import type { Plugin } from 'vite'

export function AutoRegistryComponent() {
  return Components({
    deep: true,
    extensions: ['vue'],
    dts: 'src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [UniUIResolver()],
  }) as unknown as Plugin
}
