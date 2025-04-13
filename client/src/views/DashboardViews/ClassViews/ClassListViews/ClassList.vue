<template>
  <div>
    <ul class="p-2 flex gap-2 flex-wrap">
      <TransitionGroup enter-from-class="opacity-0 scale-80" enter-to-class="opacity-100 scale-100">
        <li v-for="cla in classesList" :key="cla._id"
          class="cursor-pointer relative transition w-70 h-20 rounded bg-white hover:shadow-sm border border-gray-200 flex flex-col pt-4 items-center mb-5">
          <h1 class="font-bold" @click="toManageNotify(cla)">{{ cla.className }}</h1>
          <div v-if="cla.createdBy == userStore.userDatas._id" class="w-full text-sky-600 flex justify-center items-center" title="权限">
            <span @click="toManageNotify(cla)" class="bg-sky-500 rounded-2xl px-5 text-white">管理员</span>
          </div>
          <div v-else title="权限" class="w-full text-sky-600 flex justify-center items-center">
            <span class="bg-green-500 rounded-2xl px-5 text-white">成员</span>
          </div>
          <!-- 三个管理按钮 -->
          <div v-if="cla.createdBy == userStore.userDatas._id" class="flex mt-2 w-full">
            <button @click="toTheClass(cla)"
              class="flex-1 w-1/2 hover:brightness-95 border border-gray-200 rounded-bl text-gray-800 cursor-pointer bg-white active:scale-110 transition">编辑班级</button>
            <button @click="toManageNotify(cla)"
            class="flex-1 w-1/2 hover:brightness-95 border border-gray-200 text-gray-800 cursor-pointer bg-white active:scale-110 transition">管理通知</button>
            <button @click="toManageMember(cla)"
              class="flex-1 w-1/2 hover:brightness-95 border border-gray-200 rounded-br text-gray-800 cursor-pointer bg-white active:scale-110 transition">班级成员</button>
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

const isManager = ref(false)

onMounted(async () => {
  const user_id = userStore.userDatas._id;
  
  const res = await axios.get(`user/list_classes/${user_id}`);;
  
  classesList.value = res.data.rows;
})

const toTheClass = (cla) => {
  classDetailStore.classInfo = cla;
  router.push({
    name: 'ClassEdit',
  })
}

function toManageNotify(cla) {
  router.push({
    name: 'ManageNotifyList',
  })
  classDetailStore.manageClassInfo = cla;
}

function toManageMember(cla) {
  router.push({
    name: 'ManageClassMember'
  })
  classDetailStore.classMemberInfo = cla;
}
</script>