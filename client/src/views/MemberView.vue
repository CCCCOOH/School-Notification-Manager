<template>
  <div>
    <header class="border-b p-2 border-gray-200">
      <h1 class="text-gray-500 inline">班级ID：</h1>
      <div class="inline-flex gap-2 items-center">
        <p class="font-bold bg-gray-700 inline px-2 rounded-2xl text-white">{{ classInfo._id }}
        </p>
        <i title="复制ID"
          class="fas fa-clipboard cursor-pointer hover:bg-gray-300 p-2 rounded-full size-8 text-center active:brightness-110"
          @click="copyId"></i>
      </div>
    </header>
    <h1 class="p-2 text-gray-500">班级成员：</h1>
    <ul class="w-full h-fit flex gap-2 flex-wrap p-2">
      <li v-for="item in members" class="rounded-full bg-sky-500 size-10 flex justify-center items-center text-white"><span>{{item.username.slice(0, 2)}}</span></li>
    </ul>
  </div>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { inject, onMounted, ref } from 'vue';

const classDetailStore = useClassDetailStore();
const axios = inject('axios')
const classInfo = ref({})
const confirm = inject('confirm')
const close = inject('close')

const members = ref([])

onMounted(async () => {
  classInfo.value = classDetailStore.classMemberInfo
  const res = await axios.get(`/class/members?class_id=${classInfo.value._id}`)
  
  members.value = res.data.rows;
})



function copyId() {
  var aux = document.createElement("input");
  aux.setAttribute("value", classInfo.value._id);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  confirm('提示', '复制到剪切板成功', true, () => { close() })
}
</script>