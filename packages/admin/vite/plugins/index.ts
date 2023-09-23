import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { autoImport } from './autoImport'
import { autoRegistryComponent } from './component'
import { compression } from './compression'
import { icons } from './icons'
import { progressPlugins } from './progress'

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]
  //自动导入
  vitePlugins.push(autoImport())

  //自动注册组件
  vitePlugins.push(autoRegistryComponent())

  //压缩配置
  vitePlugins.push(compression())

  //拆包
  // vitePlugins.push(chunkSplit())

  //自动导入图标
  vitePlugins.push(icons())

  //打包进度条
  vitePlugins.push(progressPlugins() as Plugin)

  return vitePlugins
}
