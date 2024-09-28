import IconsResolver from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export const Icons = () => {
  return IconsResolver({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      akaiito: FileSystemIconLoader('./src/assets/svg', (svg) =>
        svg.replace(/^<svg /, '<svg fill="currentColor" '),
      ),
    },
  })
}
