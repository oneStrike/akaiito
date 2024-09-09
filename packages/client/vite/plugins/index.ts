import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'

import ViteRestart from 'vite-plugin-restart'
import type { Plugin } from 'vite'
import { AutoRegistryComponent } from './components'
import { Compression } from './compression'
import { autoImport } from './import'

export async function VitePlugins() {
  const UnoCSS = await import('unocss/vite').then(i => i.default)
  const vitePlugins: (Plugin | Plugin[])[] = [UnoCSS(), uni()]

  // 打包分析视图
  vitePlugins.push(visualizer())

  // 自动导入hook等
  vitePlugins.push(autoImport())

  // 打包压缩
  vitePlugins.push(Compression())

  // 自动注册组件
  vitePlugins.push(AutoRegistryComponent())

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
