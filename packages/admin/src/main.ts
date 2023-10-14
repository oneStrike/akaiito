import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'

import router from '@/router'
import { stores } from '@/stores'

const app = createApp(App)

app.use(stores).use(router)

app.mount('#app')
