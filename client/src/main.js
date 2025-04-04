import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import './assets/style.css'

import App from './App.vue'
import router from './router'


const axios_ = axios.create({
  baseURL: 'http://localhost:3000/api'
})


const app = createApp(App)

app.provide('axios', axios_)
app.use(createPinia())
app.use(router)

app.mount('#app')
