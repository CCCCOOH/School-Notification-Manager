<template>
  <!-- 今日通知整体面板 -->
  <div id="todayContainer" class="h-full w-full p-1 flex justify-start">
    <!-- 切换通知范围 -->
    <ul class="h-full flex items-center gap-3 ml-2">
      <router-link :to="{ name: 'class' }">
        <li class="hover:-translate-y-2 duration-300 ease-in-out hover:border-b-2 border-sky-500 text-gray-500 p-1 transition cursor-pointer">班级通知</li>
      </router-link>
    </ul>
    <!-- 通知列表 -->

    <router-view></router-view>

  </div>
</template>