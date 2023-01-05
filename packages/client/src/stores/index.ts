import userStore from '@/stores/modules/user'
import pagesStore from '@/stores/modules/pages'
//用户
export const useUserStore = () => userStore()
//页面信息
export const usePageStore = () => pagesStore()
