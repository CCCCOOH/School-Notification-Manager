<template>
  <div class="w-full h-full">
    <!-- 导航栏 -->
    <ul class="w-full flex border-b border-gray-200 text-gray-800 gap-5 pl-3 py-2">
      <router-link active-class="text-sky-700" :to="{name: 'classList'}" class="p-1 rounded transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">我加入的班级</router-link>
      <router-link active-class="text-sky-700" :to="{name: 'classList'}" class="p-1 rounded transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">我管理的班级</router-link>
      <router-link active-class="text-sky-700" :to="{name: 'createClass'}" class="p-1 rounded transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">创建新的班级</router-link>
    </ul>

      <router-view></router-view>
  </div>
</template>

<script setup>
</script>