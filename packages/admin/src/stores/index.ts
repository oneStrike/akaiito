import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import userStore from '@/stores/modules/user'
import layoutStore from '@/stores/modules/layout'
//用户
export const useUserStore = () => userStore()

//布局
export const useLayoutStore = () => layoutStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
