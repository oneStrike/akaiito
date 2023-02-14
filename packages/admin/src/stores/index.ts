import loadingStore from '@/stores/modules/loading'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import userStore from '@/stores/modules/user'
import layoutStore from '@/stores/modules/layout'

//用户
export const useUserStore = () => userStore()

//用户
export const useLayoutStore = () => layoutStore()

//loading
export const useLoadingStore = () => loadingStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
