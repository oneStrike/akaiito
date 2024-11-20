import router from '@/router'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'
import 'uno.css'
import 'nprogress/nprogress.css'

import '@/assets/styles/index.css'

const app = createApp(App)

app.use(createPinia()).use(router)

app.mount('#app')
