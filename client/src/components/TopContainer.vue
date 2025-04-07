<template>
    <div class="flex justify-end items-center w-full h-full px-5 gap-3">
      <i class="fas fa-sign-in-alt cursor-pointer hover:text-sky-400 transition max-md:fixed max-md:bg-gray-200 p-2 rounded-full" @click="loginOut"></i>
      <!-- 头像 -->
          <div id="header" class="rounded-full bg-sky-400 h-10 w-10 flex justify-center items-center max-md:hidden">
            <span class="text-white">{{ userInfo.username ? userInfo.username.slice(0,2) : 'User' }}</span>
          </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
const loginOut = () => {
  router.push('/')
}
const userStore = useUserStore();
const userInfo = ref({});

onMounted(() => {
  userInfo.value = userStore.userDatas;
})
</script>