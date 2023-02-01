import Components from 'unplugin-vue-components/vite'
export const autoRegistryComponent = () => {
  return Components({
    deep: true,
    extensions: ['vue'],
    dts: './src/typings/components.d.ts',
    dirs: ['./src/components'],
    directoryAsNamespace: false
  })
}
