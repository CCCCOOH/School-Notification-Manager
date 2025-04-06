<template>
  <div>
    <ul class="p-2 flex gap-2 flex-wrap">
      <TransitionGroup enter-from-class="opacity-0 scale-80" enter-to-class="opacity-100 scale-100">
        <li v-for="cla in classesList" :key="cla._id"
          class="relative transition w-70 h-20 rounded hover:shadow-md bg-gradient-to-br from-sky-700 to-sky-800 hover:shadow-gray-300 flex flex-col pt-4 items-center hover:-translate-y-1">
          <h1 class="text-white font-bold">{{ cla.className }}</h1>
          <div class="flex w-full absolute bottom-0">
            <button @click="toTheClass(cla)"
              class="flex-1 w-1/2 hover:scale-110 hover:shadow-2xl bg-sky-500 text-white rounded-bl cursor-pointer hover:brightness-110 active:scale-105 transition">编辑班级</button>
            <button @click="toManageNotify(cla)"
              class="flex-1 w-1/2 hover:scale-110 hover:shadow-2xl bg-green-500 text-white rounded-br cursor-pointer hover:brightness-110 active:scale-105 transition">管理通知</button>
          </div>
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
  classesList.value = res.data.rows;
})

const toTheClass = (cla) => {
  classDetailStore.classInfo = cla;
  router.push({
    name: 'classDetail'
  })
}

function toManageNotify(cla) {
  router.push({
    name: 'manageNotifyList',
  })
  classDetailStore.manageClassInfo = cla;
}
</script>