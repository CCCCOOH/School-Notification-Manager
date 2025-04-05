<template>
  <div>
    <ul class="p-2 flex gap-2 flex-wrap">
      <TransitionGroup enter-from-class="opacity-0 scale-80" enter-to-class="opacity-100 scale-100">
        <li v-for="cla in classesList" :key="cla._id"
          class="transition w-70 h-20 rounded cursor-pointer hover:shadow-md bg-gradient-to-br from-sky-700 to-sky-800 hover:shadow-gray-300 flex flex-col justify-center items-center hover:-translate-y-1"
          @click="toTheClass(cla)">
          <h1 class="text-white font-bold">{{ cla.className }}</h1>
        </li>
      </TransitionGroup>
    </ul>
  </div>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { useUserStore } from '@/stores/user';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const axios = inject('axios')
const classesList = ref([])
const classDetailStore = useClassDetailStore();

onMounted(async () => {
  const user_id = userStore._id ? userStore._id : localStorage._id;
  const res = await axios.get(`user/list_classes/${user_id}`);
  classesList.value = res.data;
})

const toTheClass = (cla) => {
  classDetailStore.classInfo = cla;
  router.push({
    name: 'classDetail'
  })
}
</script>