import { defineStore } from 'pinia'
import { onMounted, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userDatas = reactive({
    _id: localStorage._id ? localStorage._id : '',
    createdAt: localStorage.createdAt ? localStorage.createdAt : '',
    email: localStorage.email ? localStorage.email : '',
    username: localStorage.username ? localStorage.username : '',
    password: '',
    updatedAt: localStorage.updatedAt ? localStorage.updatedAt : '',
    classes: localStorage.classes ? JSON.parse(localStorage.classes) : '',
  })
  return { userDatas }
})