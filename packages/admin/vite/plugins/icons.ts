import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/vite'

export const icons = () => {
  return IconsResolver({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      Akaiito: FileSystemIconLoader('./src/assets/svg', (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
    },
  })
}
