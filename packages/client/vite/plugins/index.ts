import type { Plugin } from 'vite'
import { autoImport } from './autoImport'
import { autoRegistryComponent } from './component'
import { compression } from './compression'
import uni from '@dcloudio/vite-plugin-uni'

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [uni()]
  //自动导入
  vitePlugins.push(autoImport())

  //自动注册组件,打包到小程序会有问题
  // vitePlugins.push(autoRegistryComponent())

  //压缩配置src
  vitePlugins.push(compression())

  return vitePlugins
}
