<template>
  <div class="p-2">
    <div class="flex">
      <h1 class="flex-1 text-gray-500 items-center flex">{{ className }}</h1>
      <div class="flex-1 flex justify-end gap-2 items-center">
        <router-link :to="{name: 'manageNotifyList'}"
          class="border border-gray-300 rounded text-gray-800 hover:bg-gray-100 cursor-pointer active:bg-gray-200 px-2 py-1">管理通知</router-link>
        <router-link :to="{name: 'addNotify'}"
          class="border border-gray-300 rounded text-gray-800 hover:bg-gray-100 cursor-pointer active:bg-gray-200 px-2 py-1">添加通知</router-link>
      </div>
    </div>
    <hr class="text-gray-300 mt-2">
    <router-view v-slot="{ Component }">
        <transition enter-from-class="opacity-0" enter-active-class="transition">
          <component :is="Component" />
        </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useClassDetailStore } from '@/stores/classDetail';
import { inject, onMounted, reactive, ref } from 'vue';

const router = useRouter();
const axios = inject('axios')

const classDetailStore = useClassDetailStore();

const className = ref('')
onMounted(() => {
  className.value = classDetailStore.manageClassInfo.className;
})
</script>