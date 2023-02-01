import { usePageStore } from '@/stores'

export const queryApi = () => {
  //获取客户端页面列表
  usePageStore().getPages()
}
