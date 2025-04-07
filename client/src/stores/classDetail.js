import {
  reactive
} from "vue";
import {
  defineStore
} from 'pinia'
import { ref } from "vue";

export const useClassDetailStore = defineStore('classDetail', () => {
  const classInfo = ref({});
  const manageClassInfo = ref({});
  const classMemberInfo = ref({})
  return {
    classInfo,
    manageClassInfo,
    classMemberInfo
  }
}, {
  persist: {
    enabled: true,
    // storage: sessionStorage,
    // paths: ['manageClassInfo', 'classInfo', 'classMemberInfo']
  }
})