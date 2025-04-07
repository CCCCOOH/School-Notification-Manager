<template>
  <div class="w-full h-full flex px-7 py-15">
    <!-- 左侧容器 -->
    <div class="flex-2 py-10 px-5 pr-20 max-md:hidden">
        <!-- 卡片 -->
        <div class="bg-sky-600 flex-1 w-full h-full rounded-xl bg-linear-to-br from-sky-600 to-sky-200 pr-10">
          <i class="fas fa-quote-left text-7xl text-white w-full h-fit ml-10 mt-10 overflow-hidden"></i>
          <h1 class="text-white text-5xl ml-30 font-bold">一个<span class="border hover:text-sky-300 hover:bg-white transition">简单、高效</span>的</h1>
          <h1 class="text-white text-3xl ml-30 font-bold mt-5 underline-offset-9">
            班级化 通知发布&接收 平台
          </h1>
          <p class="text-xl ml-30 font-bold underline-offset-9 uppercase bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
            notify platform
          </p>
        </div>
    </div>

    <!-- 右侧容器 -->
    <div class="flex-1 py-10 px-5">
      <!-- 卡片 -->
        <LoginTab />
    </div>
  </div>
</template>

<script setup>
import LoginTab from '@/components/Login/LoginTab.vue';
</script>