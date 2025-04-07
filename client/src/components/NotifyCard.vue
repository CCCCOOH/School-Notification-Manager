<template>
  <div @click="contentCollapse=!contentCollapse" class="p-5 border-2 border-gray-200/40 rounded flex flex-col gap-2 hover:shadow-sm transition cursor-pointer">
     <!-- 通知标题 -->
     <h1 class="transition text-xl font-bold text-sky-800 hover:text-sky-600">
          {{ title }}
        </h1>
        <!-- 通知时间 -->
        <span class="text-sky-700 hover:text-sky-600 transition">时间：{{ showTime }}</span>
        <!-- 通知内容 -->
        <p :class="{'line-clamp-3': contentCollapse}" class="transition text-gray-600">{{ content }}</p>
        <!-- 标签列表 -->
        <div class="h-10 flex items-center gap-2 justify-start">
          <span v-if="levelClass[level]" :class="levelClass[level]">
            {{ levelDict[level] }}
          </span>
          <span class="transition text-gray-600 border p-1 rounded hover:text-white hover:bg-gray-600" v-for="category in categories" :key="category">{{ category }}</span>
        </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { reactive } from "vue";

const {data} = defineProps(['data'])
// 从props数组中拿到data变量

const showTime = computed(() => {
  const dateObj = new Date(time);
 
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
})

const contentCollapse = ref(true)

const {
  title,
  time,
  content,
  level,
  categories
} = data;

const levelDict = reactive({
  1: '优先通知',
  2: '重要通知',
  3: '一般通知',
})

const levelClass = reactive({
  1: 'transition hover:bg-white hover:text-red-700 border p-1 rounded text-white bg-red-700',
  2: 'transition hover:bg-white hover:text-purple-700 border p-1 rounded text-white bg-purple-700',
  3: 'transition hover:bg-white hover:text-blue-700 border p-1 rounded text-white bg-blue-700',
})

</script>