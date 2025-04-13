import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import axios from 'axios'
import './assets/style.css'

import App from './App.vue'
import router from './router'


const server_url = '154.64.253.234:8080'
const local_url = 'localhost:8080'

const axios_ = axios.create({
  baseURL: `http://${server_url}/api`
})


const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.provide('server_url', server_url)
app.provide('axios', axios_)
app.use(pinia)
app.use(router)

app.mount('#app')
