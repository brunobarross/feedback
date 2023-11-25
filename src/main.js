import { createApp } from 'vue'
import {router} from './routes/routes'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"
import './style.css'
import App from './App.vue'

let app = createApp(App)
const pinia = createPinia();



app.use(pinia)
app.use(router)
app.use(PhosphorIcons)
app.mount('#app')
