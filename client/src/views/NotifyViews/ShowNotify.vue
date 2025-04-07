<template>
  <div>
    <ul class="transition flex gap-5 p-3 overflow-auto flex-wrap">
      <!-- 单个通知 -->
       <TransitionGroup enter-from-class="opacity-0 scale-90">
         <NotifyCard v-for="(item) in data" :data="item" :key="item" class="w-100 h-fit"/>
       </TransitionGroup>
    </ul>
  </div>
</template>

<script setup>
import NotifyCard from '@/components/NotifyCard.vue';
import { useUserStore } from '@/stores/user';
import { inject, onMounted, ref } from 'vue';

const axios = inject('axios')
const userStore = useUserStore();


const data = ref([
  // {
  //   title: '计算机设计大赛通知',
  //   time: '2025-12-23',
  //   level: 1,
  //   content: `经过长时间的努力探索与实践，2024年度国家级、自治区级大学生创新训练计划项目已进入关键阶段。`,
  //   categories: [
  //     '第二课堂', '体育'
  //   ]
  // },
])

onMounted(async () => {
  const user_id = userStore.userDatas._id;
  const res = await axios.get(`class/notify_user?user_id=${user_id}`)
  data.value = res.data.rows
})
</script>