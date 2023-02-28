import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * as userStore from './modules/user'
export const store = createPinia()
store.use(piniaPluginPersistedstate)
