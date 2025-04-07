<template>
  <div class="p-3 flex flex-col gap-1 transition max-md:flex-row">
    <router-link @click="activeTag = item.id" v-for="item in menu" :key="item.id" :to="item.url" class="transition flex items-center gap-2 active:bg-gray-200 hover:bg-gray-100 rounded cursor-default p-2 font-bold" active-class="bg-gray-300/50">
      <i :class="item.icon"></i>{{item.name}}
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let menu = ref([
  {
    id: 'notify',
    name: '通知',
    url: '/user/notify',
    icon: 'fa-solid fa-circle-exclamation'
  },
  {
    id: 'class',
    name: '班级',
    url: '/user/class/list',
    icon: 'fas fa-window-restore'
  },
  {
    id: 'detail',
    name: '个人',
    url: '/user/userinfo',
    icon: 'fas fa-user'
  },
])
</script>