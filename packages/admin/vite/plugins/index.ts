import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'

import progress from 'vite-plugin-progress'
import ViteRestart from 'vite-plugin-restart'
import VueDevTools from 'vite-plugin-vue-devtools'
import { AutoRegistryComponent } from './components'
import { Compression } from './compression'
import { Icons } from './icons'
import { autoImport } from './import'

export function VitePlugins(isDev = false) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx(),
    UnoCSS() as unknown as Plugin,
  ]

  // Vue DevTools - 仅在开发环境启用
  if (isDev) {
    vitePlugins.push(VueDevTools() as Plugin)
  }

  // 打包分析视图
  vitePlugins.push(visualizer() as Plugin)

  // 自动注册组件
  vitePlugins.push(AutoRegistryComponent())

  // 自动导入hook等
  vitePlugins.push(autoImport())

  // 自动导入下载图标
  vitePlugins.push(Icons())

  // 打包压缩（Gzip + Brotli）
  vitePlugins.push(...Compression())

  // 打包进度条
  vitePlugins.push(progress() as Plugin)

  // 配置文件变更自动重启服务
  vitePlugins.push(
    ViteRestart({
      restart: [
        'vite.config.js',
        '../**/*/.ts',
        '.env',
        '.env.production',
        '.env.development',
      ],
    }),
  )

  return vitePlugins
}
