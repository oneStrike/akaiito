import type { Plugin } from 'vite'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import Components from '@uni-helper/vite-plugin-uni-components'

export const AutoRegistryComponent = () => {
  return Components({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    extensions: ['vue', 'tsx', 'jsx'],
    dts: 'src/typings/components.d.ts',
    dirs: ['src/components'],
    directoryAsNamespace: false,
    resolvers: [UniUIResolver()]
  }) as unknown as Plugin
}
