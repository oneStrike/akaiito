import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

export const CreateStyleImport = () => {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: (name: string) => {
          name = name.substring(3, name.length)
          return `element-plus/es/components/${name}/style/index`
        }
      }
    ]
  })
}
