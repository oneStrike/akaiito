import userStore from '@/stores/modules/userStore'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 用户
export const useUserStore = () => userStore()

const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
