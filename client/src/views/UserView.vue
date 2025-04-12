<template>
  <div class="w-full h-screen grid grid-cols-[60px_1fr] grid-rows-[50px_1fr] max-md:grid-cols-[1fr]">
    <div class="border border-gray-100 flex justify-center items-center gap-2 max-md:sticky max-md:top-0 max-md:bg-white max-md:shadow-sm">
      <i class="fa-solid fa-landmark"></i>
      <!-- <span class="text-gray-600 text-2xl select-none">易简通</span> -->
    </div>
    <!-- 顶部 -->
    <div class="border border-gray-100">
      <TopContainer />
    </div>
    <!-- 左侧栏 -->
    <div class="border border-gray-100 max-md:w-full">
      <Navigation></Navigation>
    </div>
    <!-- 面板 -->
    <div class="border border-gray-100 h-[calc(100vh-50px)] w-[calc(100vw-230px)] overflow-auto w-full max-md:w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import TopContainer from '@/components/TopContainer.vue';
import Navigation from '@/components/Navigation.vue';
</script>