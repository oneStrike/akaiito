import IconsResolver from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
export const icons = () => {
  return IconsResolver({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      lczk: FileSystemIconLoader('./src/assets/svg', (svg) =>
        svg.replace(/^<svg /, '<svg fill="currentColor" ')
      )
    }
  })
}
