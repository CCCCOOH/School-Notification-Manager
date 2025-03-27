<script setup>
import Navigation from './components/Navigation.vue'
import TopContainer from './components/TopContainer.vue';
</script>

<template>
  <!-- <Navigation />
  <router-view></router-view> -->
  <div class="w-full h-screen grid grid-cols-[230px_1fr] grid-rows-[50px_1fr]">
    <div class="border border-gray-100 flex justify-center items-center gap-2">
      <i class="fa-solid fa-landmark"></i>
      <span class="text-gray-600 text-2xl select-none">学校通知</span>
    </div>
    <!-- 顶部 -->
    <div class="border border-gray-100">
      <TopContainer />
    </div>
    <!-- 左侧栏 -->
    <div class="border border-gray-100">
      <Navigation></Navigation>
    </div>
    <!-- 面板 -->
    <div class="border border-gray-100 h-[calc(100vh-50px)]">
      <router-view></router-view>
    </div>
  </div>
</template>