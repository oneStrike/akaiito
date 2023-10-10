import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { visualizer } from 'rollup-plugin-visualizer'
import ViteRestart from 'vite-plugin-restart'
import { AutoRegistryComponent } from './components'
import { autoImport } from './import'
import { Compression } from './compression'
import progress from 'vite-plugin-progress'
import { Icons } from './icons'
import { CreateStyleImport } from './style'

export function VitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]

  //打包分析视图
  vitePlugins.push(visualizer())

  //自动注册组件
  vitePlugins.push(AutoRegistryComponent())

  //自动导入三方组件库样式
  vitePlugins.push(CreateStyleImport())

  //自动导入hook等
  vitePlugins.push(autoImport())

  //自动导入下载图标
  vitePlugins.push(Icons())

  //打包压缩
  vitePlugins.push(Compression())

  //打包进度条
  vitePlugins.push(progress() as Plugin)

  //配置文件变更自动重启服务
  vitePlugins.push(
    ViteRestart({
      restart: ['vite.config.js', '../**/*/.ts']
    })
  )

  return vitePlugins
}
