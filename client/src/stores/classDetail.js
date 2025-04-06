import { reactive } from "vue";
import { defineStore } from 'pinia'

export const useClassDetailStore = defineStore('classDetail', () => {
  const classInfo = reactive({});
  const manageClassInfo = reactive({});
  const classMemberInfo = reactive({})
  return { classInfo, manageClassInfo, classMemberInfo }
})