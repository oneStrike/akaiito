import { usePageStore, useSystemStore } from '@/stores'

export const queryApi = {
  getPages: () => usePageStore().getPages(), //获取客户端页面信息列表
  systemInfo: () => useSystemStore().getSystemConfigInfo() //获取系统配置信息
}

export const querySystemInfo = {
  firstEntering: () => useSystemStore().firstEntering
}
