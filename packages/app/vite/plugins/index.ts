import type { Plugin } from 'vite'
import process from 'node:process'
import Uni from '@dcloudio/vite-plugin-uni'
import { visualizer } from 'rollup-plugin-visualizer'

import UnoCSS from 'unocss/vite'
import ViteRestart from 'vite-plugin-restart'
import { AutoRegistryComponent } from './components'
import { Compression } from './compression'

// import progress from 'vite-plugin-progress'
import { autoImport } from './import'

export function VitePlugins() {
  const isDev = process.env.NODE_ENV === 'development'
  const isProd = process.env.NODE_ENV === 'production'

  // @ts-expect-error ignore
  const vitePlugins: (Plugin | Plugin[])[] = [UnoCSS(), Uni.default()]

  // 自动导入hook等 - 优先级较高
  vitePlugins.push(autoImport() as any)

  // 自动注册组件
  vitePlugins.push(AutoRegistryComponent() as any)

  // 开发环境插件
  if (isDev) {
    // 开发时重启插件
    vitePlugins.push(
      ViteRestart({
        restart: [
          'vite/*/**',
          'src/pages.json',
          'src/static/icons/**',
          'vite.config.ts',
          'unocss.config.ts',
        ],
      }),
    )
  }

  // 生产环境插件
  if (isProd) {
    // 打包压缩
    vitePlugins.push(Compression())

    // 打包分析视图 - 仅在需要时启用
    if (process.env.ANALYZE) {
      vitePlugins.push(
        visualizer({
          filename: 'dist/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      )
    }

    // 打包进度条
    // vitePlugins.push(progress())
  }

  return vitePlugins
}
