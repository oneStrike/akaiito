import {
  createStyleImportPlugin,
  AndDesignVueResolve
} from 'vite-plugin-style-import'
export const importStyle = () => {
  return (() =>
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
    }))()
}
