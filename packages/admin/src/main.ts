import { bootstrap } from '@/core/bootstrap'
import router from '@/router'
import { stores } from '@/stores'
import { createApp } from 'vue'
import App from './App.vue'

import 'reset-css'
import 'normalize.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'nprogress/nprogress.css'
import 'uno.css'

import '@/assets/stylesheets/index.scss'

const app = createApp(App)

app.use(stores).use(router).use(bootstrap)

app.mount('#app')
