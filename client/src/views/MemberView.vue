<template>
  <div>
    班级成员
  </div>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { onMounted } from 'vue';

const classDetailStore = useClassDetailStore();

onMounted(() => {
  console.log(classDetailStore.classMemberInfo);
})
</script>