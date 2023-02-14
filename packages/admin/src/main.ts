import App from './App.vue'
import routes from './router'
import store from './stores'
import 'normalize.css'
import '@/styles/index.less'

import { bootstrap } from '@/core/bootstrap'
const app = createApp(App)

app.use(store)
app.use(routes)
app.use(bootstrap)
app.mount('#app')
