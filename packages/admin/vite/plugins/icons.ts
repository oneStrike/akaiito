import type { Plugin } from 'vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/vite'

export function Icons() {
  return IconsResolver({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      auy: FileSystemIconLoader('./src/assets/svg', (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    },
  }) as Plugin<any>
}
