import userStore from '@/stores/modules/user'
import layoutStore from '@/stores/modules/layout'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//布局配置
export const useLayout = () => layoutStore()

//用户
export const useUserStore = () => userStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
