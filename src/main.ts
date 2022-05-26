import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import App from './App.vue'
import { router } from './route'
import store from './store'
import './index.less'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
