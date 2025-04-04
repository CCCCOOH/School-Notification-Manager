<template>
  <div>
    <ul class="p-2 flex gap-2 flex-wrap">
      <li v-for="cla in classesList" :key="cla._id"
        class="w-70 h-20 rounded cursor-pointer hover:shadow-md transition bg-gradient-to-r from-sky-600 to-green-600 hover:shadow-gray-300 flex flex-col justify-center items-center">
        <h1 class="text-white">{{ cla.className }}</h1>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { inject, onMounted, ref } from 'vue';
const userStore = useUserStore();

const axios = inject('axios')
const classesList = ref([])

onMounted(async () => {
  const user_id = userStore._id ? userStore._id : localStorage._id;
  const res = await axios.get(`user/list_classes/${user_id}`);
  console.log(res.data);

  classesList.value = res.data;
})
</script>