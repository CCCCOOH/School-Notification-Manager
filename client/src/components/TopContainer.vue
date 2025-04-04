<template>
    <div class="flex justify-end items-center w-full h-full px-5 gap-3">
      <i class="fas fa-sign-in-alt cursor-pointer hover:text-sky-400 transition" @click="loginOut"></i>
      <!-- 头像 -->
          <div id="header" class="rounded-full bg-sky-400 h-10 w-10 flex justify-center items-center">
            <span class="text-white">Sy</span>
          </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();
const loginOut = () => {
  router.push('/')
}
</script>