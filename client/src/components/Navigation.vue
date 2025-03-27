<template>
  <div class="p-3 flex flex-col gap-1 transition">
    <router-link @click="activeTag = item.id" v-for="item in menu" :key="item.id" :to="item.url" class="transition flex items-center gap-2 active:bg-gray-200 hover:bg-gray-100 rounded cursor-default p-2 font-bold" :class="{
      'bg-gray-300/50':activeTag == item.id
    }">
      <i :class="item.icon"></i>{{item.name}}
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTag = ref('home')

let menu = ref([
  {
    id: 'home',
    name: '首页',
    url: '/',
    icon: 'fa-solid fa-house'
  },
  {
    id: 'today',
    name: '今日',
    url: '/today',
    icon: 'fa-solid fa-circle-exclamation'
  },
  {
    id: 'week',
    name: '本周',
    url: '/week',
    icon: 'fa-solid fa-calendar-days'
  },
  {
    id: 'month',
    name: '本月',
    url: '/month',
    icon: 'fa-solid fa-calendar'
  },
  {
    id: 'history',
    name: '历史',
    url: '/history',
    icon: 'fa-solid fa-clock'
  },
])
</script>