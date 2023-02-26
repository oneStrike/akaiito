import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const stores = createPinia()
stores.use(piniaPluginPersistedstate)

export * from './modules/layout'
export * from './modules/user'
export { stores }
