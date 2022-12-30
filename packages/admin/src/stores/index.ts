import userStore from '@/stores/modules/user'
import layoutStore from '@/stores/modules/layout'
import diyStore from '@/stores/modules/diy'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//布局配置
export const useLayout = () => layoutStore()

//用户
export const useUserStore = () => userStore()

//diy
export const useDiyStore = () => diyStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
