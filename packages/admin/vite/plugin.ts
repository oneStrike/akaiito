import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import ViteRestart from 'vite-plugin-restart'
import vueDevTools from 'vite-plugin-vue-devtools'
import { autoRegistryComponent } from './plugins/components'
import { compression } from './plugins/compression'
import { icons } from './plugins/icons'
import { autoImport } from './plugins/import'

export const vitePlugins = () => {
  const plugins = [vue(), vueJsx(), vueDevTools(), UnoCSS()]
  // 自动注册组件
  plugins.push(autoRegistryComponent())
  // 自动加载图标
  plugins.push(icons())
  // 自动导入方法
  plugins.push(autoImport())
  // 编译压缩
  plugins.push(compression())
  // 配置文件变更自动重启服务
  plugins.push(
    ViteRestart({
      restart: ['vite.config.js', '../**/*/.ts', '.env', '.env.production', '.env.development'],
    }),
  )
  return plugins
}
