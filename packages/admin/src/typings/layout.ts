import type { MenuProps } from '@arco-design/web-vue/es/menu/interface'

export interface LayoutMenu {
  width?: number
  theme?: MenuProps['theme']
  mode: MenuProps['mode']
  accordion: MenuProps['accordion']
  collapsed: MenuProps['collapsed']
}

export interface Layout {
  theme: 'light' | 'dark'
  fullScreen: boolean
  menu: LayoutMenu
}

export interface Tabs {
  pathName: string
  title: string
}
