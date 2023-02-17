import { createStyleImportPlugin } from 'vite-plugin-style-import'
export const importStyle = () => {
  return (() =>
    createStyleImportPlugin({
      resolves: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `@arco-design/web-vue/es/${name}/style/index.js`
          }
        }
      ]
    }))()
}
