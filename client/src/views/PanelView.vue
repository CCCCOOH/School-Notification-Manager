<template>
  <div class="w-full h-screen grid grid-cols-[200px_1fr] grid-rows-[80px_1fr] max-md:grid-cols-[1fr]">
    <div class="border bg-white border-gray-100 flex justify-center items-center gap-2 max-md:sticky max-md:top-0 max-md:bg-white max-md:shadow-sm">
      <Logo class=""/>
      <!-- <span class="text-gray-600 text-2xl select-none">易简通</span> -->
    </div>
    <!-- 顶部 -->
    <div class="border border-gray-100 bg-white">
      <TopContainer />
    </div>
    <!-- 左侧栏 -->
    <div class="border bg-white border-gray-100 max-md:w-full">
      <Navigation></Navigation>
    </div>
    <!-- 面板 -->
    <div class="border border-gray-100 bg-gray-50 h-[calc(100vh-80px)] w-[calc(100vw-200px)] overflow-auto max-md:w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';
import TopContainer from '@/components/TopContainer.vue';
import Navigation from '@/components/Navigation.vue';
</script>