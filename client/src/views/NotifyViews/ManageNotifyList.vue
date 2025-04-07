<template>
  <ul class="p-2 flex flex-col gap-4 mt-2">
    <!-- 管理界面的通知列表 -->
    <TransitionGroup enter-from-class="opacity-0 scale-90" enter-active-class="transition" enter-to-class="opacity-100 scale-100">
      <li v-for="item in notifies" :key="item._id"
        class="border border-gray-300 hover:bg-gray-100 rounded p-2 w-full h-fit">
        <!-- 通知标题 -->
        <h1 class="font-bold text-2xl">{{ item.title }}</h1>
        <!-- 通知内容 -->
        <p class="cursor-pointer select-none" :class="{'line-clamp-3': item.collapsed}" @click="item.collapsed=!item.collapsed">{{ item.content }}</p>
        <div class="flex gap-2 items-center">
          <i class="transition fas fa-trash-alt hover:text-red-500 hover:bg-gray-300 rounded-full p-2 cursor-pointer"
            @click="onRemoveNotifyButton(item)"></i>
          <router-link :to="{ name: 'editNotify', query: { class_id, notify_id: item._id } }">
            <i
              class="transition fas fa-pencil-alt hover:text-sky-500 hover:bg-gray-300 rounded-full p-2 cursor-pointer"></i>
          </router-link>
          <div :class="levelClass[item.level]">{{ levelDict[item.level] }}</div>
          <ul class="flex gap-2">
            <li v-for="category in item.categories" :key="category" :class="category ? 'border rounded text-gray-800 px-1' : ''">{{
              category }}</li>
          </ul>
          <CopyButton :str="item.content" />
        </div>
      </li>
    </TransitionGroup>
  </ul>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { nextTick } from 'vue';
import { inject, onMounted, reactive, ref } from 'vue';

import CopyButton from '@/components/CopyButton.vue';

const classDetailStore = useClassDetailStore()
const class_id = ref('')
const notifies = ref([])

const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')

const contentCollapse = ref(true)

const levelDict = reactive({
  1: '优先通知',
  2: '重要通知',
  3: '一般通知',
})

async function getNotifies() {;
  class_id.value = classDetailStore.manageClassInfo._id;
  
  const res = await axios.get(`class/notify_class?class_id=${class_id.value}`)
  notifies.value = res.data.row.notifies;
  notifies.value.forEach(item => { item.collapsed = true });  
}

onMounted(async () => {
  await nextTick()
  
  getNotifies();
})

const levelClass = reactive({
  1: 'transition hover:bg-white hover:text-red-700 border px-1 rounded text-white bg-red-700',
  2: 'transition hover:bg-white hover:text-purple-700 border px-1 rounded text-white bg-purple-700',
  3: 'transition hover:bg-white hover:text-blue-700 border px-1 rounded text-white bg-blue-700',
})

async function onRemoveNotifyButton(item) {
  confirm('确认删除吗？', '', true, async () => {
    const notify_id = item._id;
    const res = await axios.delete(`class/removeNotify?class_id=${class_id.value}&notify_id=${notify_id}`)
    getNotifies();
    close();
  })
}
</script>