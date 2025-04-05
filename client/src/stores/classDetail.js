import { reactive } from "vue";
import { defineStore } from 'pinia'

export const useClassDetailStore = defineStore('classDetail', () => {
  const classInfo = reactive({});
  return { classInfo }
})