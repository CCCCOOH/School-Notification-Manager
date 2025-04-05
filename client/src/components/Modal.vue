<template>
  <div v-show="data.show"
    class="p-2 flex flex-col items-center rounded w-100 absolute outline shadow-lg bg-white left-1/2 top-1/3 -translate-1/2">
    <div>
      <div @click="data.show=false">
        <div class="absolute left-2 size-3 bg-red-500 rounded-full cursor-pointer" title="关闭"></div>
        <div class="absolute left-6 size-3 bg-yellow-500 rounded-full cursor-pointer"></div>
        <div class="absolute left-10 size-3 bg-green-500 rounded-full cursor-pointer"></div>
      </div>
      <h1 class="font-bold text-xl">提示</h1>
    </div>
    <hr class="w-full text-gray-200">
    <div class="text-gray-700 font-semibold">
      <p class="text-center mb-2">{{ data.msg }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const data = defineModel()
</script>