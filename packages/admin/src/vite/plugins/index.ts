import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { autoImport } from './autoImport'
import { autoRegistryComponent } from './component'
import { compression } from './compression'
import { icons } from './icons'

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx({ isCustomElement: (tag: string) => true })
  ]
  //自动导入
  vitePlugins.push(autoImport())
  //自动注册组件
  vitePlugins.push(autoRegistryComponent())
  //压缩配置
  vitePlugins.push(compression())
  //自动导入图标
  vitePlugins.push(icons())
  return vitePlugins
}
