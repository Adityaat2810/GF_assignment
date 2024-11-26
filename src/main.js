import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/vuestore.js'


const app = createApp(App)
app.use(store)
app.mount('#app')

