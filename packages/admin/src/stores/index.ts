import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const stores = createPinia()
stores.use(piniaPluginPersistedstate)
export { stores }
