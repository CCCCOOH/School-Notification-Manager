<template>
  <div class="p-2">
    <div class="flex">
      <h1 class="flex-1 text-blue-800 items-center flex">{{ className }}</h1>
      <div v-if="user_id == creator_id" class="flex-1 flex justify-end gap-2 items-center">
        <router-link :to="{ name: 'ManageNotifyList' }" active-class="bg-gray-200"
          class="border border-gray-300 rounded text-gray-800 hover:bg-gray-100 cursor-pointer active:bg-gray-200 px-2 py-1">管理通知</router-link>
        <router-link :to="{ name: 'AddNotify' }" active-class="bg-gray-200"
          class="border border-gray-300 rounded text-gray-800 hover:bg-gray-100 cursor-pointer active:bg-gray-200 px-2 py-1">添加通知</router-link>
      </div>
      <div v-else>
        <button @click="onLeaveButton"
          class="bg-red-600 rounded hover:brightness-110 active:brightness-105 cursor-pointer px-2 text-white">退出班级</button>
      </div>
    </div>
    <hr class="text-gray-300 mt-2">
    <router-view v-slot="{ Component }">
      <transition enter-from-class="opacity-0" enter-active-class="transition">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { useUserStore } from '@/stores/user';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const router = useRouter();
const confirm = inject('confirm')
const close = inject('close')
const classDetailStore = useClassDetailStore();
const userStore = useUserStore();
const user_id = ref('')
const class_id = ref('');
const creator_id = ref('')

const className = ref('')
onMounted(() => {
  className.value = classDetailStore.manageClassInfo.className;
  creator_id.value = classDetailStore.manageClassInfo.createdBy;
  class_id.value = classDetailStore.manageClassInfo._id;
  user_id.value = userStore.userDatas._id;
})

async function onLeaveButton() {
  confirm('提示', '确认退出班级？', true, async () => {
    const res = await axios.delete(`class/leaveClass?user_id=${user_id.value}&class_id=${class_id.value}`);

    confirm('提示', res.data.msg, true, () => {
      if (res.data.code == 200) {
        router.push({ name: 'classList' })
      }
      close();
    })
  })
}
</script>