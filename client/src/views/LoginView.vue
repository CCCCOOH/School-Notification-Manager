<template>
  <div class="w-full h-full flex justify-center items-center px-5 py-5">
    <img src="@/assets/backimg.jpg" alt="背景图片" class="absolute -z-1 w-screen h-screen">
    <div class="max-md:w-full shadow-2xl rounded-2xl backdrop-blur-xs bg-white/0">
      <!-- 上方logo -->
      <Logo />
      <!-- 下方内容 -->
      <div class="flex h-100 max-md:w-full">
        <!-- 左侧容器 -->
        <div class="flex-2 pr-10 max-md:hidden">
            <!-- 卡片 -->
            <div class="bg-sky-600 flex-1 w-full h-full rounded-bl-2xl rounded-tr-2xl bg-linear-to-br from-sky-600 to-sky-200">
              <i class="fas fa-quote-left text-7xl text-white w-full h-fit ml-10 mt-10 overflow-hidden"></i>
              <h1 class="text-white text-5xl ml-30 font-bold">一个<span class="border hover:text-sky-300 hover:bg-white transition">简单、高效</span>的</h1>
              <h1 class="text-white text-3xl ml-30 font-bold mt-5 underline-offset-9">
                 一体化通知管理云平台
              </h1>
              <p class="ml-30 text-xl font-bold underline-offset-9 uppercase bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
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
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
import LoginTab from '@/components/Login/LoginTab.vue';
</script>