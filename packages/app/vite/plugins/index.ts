import type { Plugin } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'

import UnoCSS from 'unocss/vite'
import ViteRestart from 'vite-plugin-restart'
// import { AutoRegistryComponent } from './components'
import { Compression } from './compression'

// import progress from 'vite-plugin-progress'
import { autoImport } from './import'

export function VitePlugins() {
  // @ts-expect-error ignore
  const vitePlugins: (Plugin | Plugin[])[] = [UnoCSS(), Uni.default()]

  // 打包分析视图
  vitePlugins.push(visualizer())

  // 自动导入hook等
  vitePlugins.push(autoImport())

  // 打包压缩
  vitePlugins.push(Compression())

  // 自动注册组件
  // vitePlugins.push(AutoRegistryComponent())

  // 打包进度条
  // vitePlugins.push(progress())

  vitePlugins.push(
    ViteRestart({
      restart: [
        'vite/*/**',
        'src/pages.json',
        'src/static/icons/**',
        'vite.config.js',
      ],
    }),
  )

  return vitePlugins
}
