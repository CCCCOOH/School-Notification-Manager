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
import { onMounted, ref } from 'vue';

const activeTag = ref('home')

const setActiveTag = () => {
  let path = location.pathname.split('/')[1];
  if (!path) return;  // 如果没有path说明在首页，返回
  activeTag.value = path;
}

onMounted(() => {
  setActiveTag();
})

let menu = ref([
  {
    id: 'home',
    name: '首页',
    url: '/',
    icon: 'fa-solid fa-house'
  },
  {
    id: 'notify',
    name: '通知',
    url: '/notify/class',
    icon: 'fa-solid fa-circle-exclamation'
  },
  {
    id: 'manage',
    name: '管理',
    url: '/manage',
    icon: 'fa fa-envelope-open'
  },
])
</script>