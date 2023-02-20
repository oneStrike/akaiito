import { createStyleImportPlugin } from 'vite-plugin-style-import'

export const importStyle = () => {
  return (() =>
    createStyleImportPlugin({
      resolves: [
        {
          libraryName: '@arco-design/web-vue',
          esModule: true,
          resolveStyle: (name) => {
            const exclude = [
              'menu-item',
              'layout-footer',
              'sub-menu',
              'layout-sider',
              'layout-content',
              'layout-header',
              'breadcrumb-item'
            ]
            if (exclude.includes(name)) return ''
            return `@arco-design/web-vue/es/${name}/style/index.js`
          }
        }
      ]
    }))()
}
