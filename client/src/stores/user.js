import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onMounted, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userDatas = ref({
    _id: '',
    createdAt: '',
    email: '',
    username: '',
    password: '',
    updatedAt: '',
    classes: '',
  })
  const memoryPassword = ref(false)
  return { userDatas, memoryPassword }
}, {
  persist: true
})