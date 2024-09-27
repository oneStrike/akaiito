import uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'

import ViteRestart from 'vite-plugin-restart'
import type { Plugin } from 'vite'
import { AutoRegistryComponent } from './components'
import { Compression } from './compression'
import { autoImport } from './import'

export function VitePlugins() {
  // @ts-expect-error ignore
  const vitePlugins: (Plugin | Plugin[])[] = [UnoCSS(), uni.default()]

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
