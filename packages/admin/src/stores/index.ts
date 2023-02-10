import userStore from '@/stores/modules/user'
import layoutStore from '@/stores/modules/layout'
import loadingStore from '@/stores/modules/loading'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//布局配置
export const useLayout = () => layoutStore()

//用户
export const useUserStore = () => userStore()

//loading
export const useLoadingStore = () => loadingStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
