import userStore from '@/stores/modules/user'
import pagesStore from '@/stores/modules/pages'
import systemStore from '@/stores/modules/system'

//用户
export const useUserStore = () => userStore()
//页面信息
export const usePageStore = () => pagesStore()
//系统信息相关
export const useSystemStore = () => systemStore()
