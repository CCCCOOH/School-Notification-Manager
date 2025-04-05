<script setup>
import { onMounted, provide, ref } from 'vue';
import Dialog from './components/Dialog.vue';
const dialog = ref(null);
onMounted(() => {
  provide('confirm', dialog.value.open)
  provide('close', dialog.value.close)
})
</script>

<template>
  <div class="w-full h-full">
    <Dialog ref="dialog" />
    <router-view></router-view>
  </div>
</template>