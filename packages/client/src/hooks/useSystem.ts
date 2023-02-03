import { usePageStore, useSystemStore } from '@/stores'

export const useSystem = {
  getPages: () => usePageStore().getPages(), //获取客户端页面信息列表
  getConfigInfo: () => useSystemStore().getSystemConfigInfo(), //获取系统配置信息
  configInfo: () => useSystemStore().systemConfigInfo, //系统配置信息
  firstEntering: () => useSystemStore().firstEntering //查询是否为首次进入
}
