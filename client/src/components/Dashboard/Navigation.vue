<template>
  <div class="p-3 flex flex-col items-center gap-2 transition max-md:flex-row h-full">
    <router-link @click="activeTag = item.id" v-for="item in menu" :key="item.id" :to="{name: item.urlName}" class="text-gray-800 cursor-pointer w-full transition flex items-center gap-2 active:bg-gray-200 hover:bg-gray-100 rounded p-2 size-8 font-bold" active-class="bg-gray-200/50">
      <i :class="item.icon"></i><span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let menu = ref([
  {
    id: 'notify',
    name: '通知',
    urlName: 'notify',
    icon: 'fa-solid fa-circle-exclamation'
  },
  {
    id: 'class',
    name: '班级',
    urlName: 'classList',
    icon: 'fas fa-window-restore'
  },
  {
    id: 'detail',
    name: '个人',
    urlName: 'userInfo',
    icon: 'fas fa-user'
  },
])
</script>