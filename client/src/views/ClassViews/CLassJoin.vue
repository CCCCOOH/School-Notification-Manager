<template>
  <div class="p-2 flex flex-col gap-2">
    <label for="input" class="font-bold">班级ID:</label>
    <input autocomplete="false" v-model="class_id" type="text" id="input"
      class="transition duration-300 outline-2 outline-black focus:outline-sky-500 pl-2 text-sky-600">
    <button @click="onJoinButton"
      class="bg-sky-500 text-white rounded w-20 hover:brightness-110 outline-none cursor-pointer active:bg-sky-400 transition">加入</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { inject, ref } from 'vue';


const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')
const class_id = ref('');

const userStore = useUserStore();

async function onJoinButton() {
  if (class_id.value == '') {
    confirm('警告', 'ID不能为空', true, () => {
      close()
    })
  }
  const user_id = userStore.userDatas._id;

  const res = await axios.post('class/member/add', {
    user_id,
    class_id: class_id.value
  })

  if (res.data.code == 200) {
    confirm('提示', '加入成功', true, () => {
      close()
    })
  } else {
    confirm('警告', '加入失败，请确保ID正确', true, () => {
      close()
    })
  }
  class_id.value = ''
}
</script>