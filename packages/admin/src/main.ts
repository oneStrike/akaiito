import { bootstrap } from '@/core/bootstrap'
import router from '@/router'
import { stores } from '@/stores'
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/stylesheets/index.scss'

import '@unocss/reset/tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'nprogress/nprogress.css'
import 'uno.css'

const app = createApp(App)

app.use(stores).use(router).use(bootstrap)

app.mount('#app')
