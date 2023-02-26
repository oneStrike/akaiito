import { createApp } from 'vue'
import { stores } from '@/stores'
import { router } from '@/router'
import App from './App.vue'

import { bootstrap } from '@/core/bootstrap'

import 'normalize.css'
import '@/style/index.scss'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(bootstrap)
app.mount('#app')
