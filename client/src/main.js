import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import axios from 'axios'
import './assets/style.css'

import App from './App.vue'
import router from './router'


const axios_ = axios.create({
  baseURL: 'http://localhost:8080/api'
})


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.provide('axios', axios_)
app.use(pinia)
app.use(router)

app.mount('#app')
