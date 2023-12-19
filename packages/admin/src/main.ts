import { createApp } from 'vue'
import App from './App.vue'
import 'nprogress/nprogress.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import { bootstrap } from '@/core/bootstrap'
import '@/assets/stylesheets/index.scss'

import router from '@/router'
import { stores } from '@/stores'

const app = createApp(App)

app.use(stores).use(router).use(bootstrap)

app.mount('#app')
