import { createApp } from 'vue'
import App from './App.vue'

import { router } from '@/router'
import { store } from '@/stores'

import { bootstrap } from '@/core/bootstrap'

import '@/style/index.scss'
import 'normalize.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(bootstrap)

app.mount('#app')
