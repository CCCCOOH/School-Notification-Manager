<template>
  <ul class="p-2 flex flex-col gap-4 mt-2">
    <!-- 管理界面的通知列表 -->
    <TransitionGroup enter-from-class="opacity-0 scale-90" enter-active-class="transition">
      <li v-for="item in notifies" :key="item._id"
        class="border border-gray-300 hover:bg-gray-100 rounded p-2 w-full h-fit relative">
        <h1 class="font-bold text-2xl">{{ item.title }}</h1>
        <!-- 通知内容 -->
        <img v-if="item.postUrl" :src="item.postUrl" class="w-50 rounded float-left mr-2" alt="海报">
        <p v-html="item.content" class="cursor-pointer select-none" :class="{ 'line-clamp-3': item.collapsed }"
          @click="item.collapsed = !item.collapsed"></p>
        <!-- 工具栏 -->
        <div v-if="isManager" class="flex gap-2 items-center justify-between w-full pt-2">
          <!-- 左侧编辑栏 -->
          <div>
            <!-- 删除按钮 -->
            <i class="transition fas fa-trash-alt hover:text-red-500 hover:bg-gray-300 rounded-full p-2 cursor-pointer"
              @click="onRemoveNotifyButton(item)"></i>
            <!-- 编辑按钮 -->
            <i @click="onEditButton(item)"
              class="transition fas fa-pencil-alt hover:text-sky-500 hover:bg-gray-300 rounded-full p-2 cursor-pointer"></i>

            <CopyButton :str="item.content" />
          </div>

          <!-- 右侧分类列表 -->
          <div class="flex gap-2 w-fit">
            <router-link :to="{ name: 'EditNotify', query: { class_id, notify_id: item._id } }" />
            <!-- 通知等级 -->
            <div :class="levelClass[item.level]">{{ levelDict[item.level] }}</div>
            <!-- 分类列表 -->
            <ul class="flex gap-2">
              <li v-for="category in item.categories" :key="category"
                :class="category ? 'border rounded text-gray-800 px-1' : ''">{{
                  category }}</li>
            </ul>
          </div>
        </div>
        <div v-else class="flex w-full pt-2 justify-center">
          <button @click="onConfirmRead(item)"
            class="bg-green-600 hover:brightness-110 active:brightness-105 cursor-pointer rounded text-white px-2">确认阅读</button>
        </div>
        <!-- 已读列表 -->
        <div v-if="item.readList.length" class="bg-gray-200 flex rounded mt-2 px-2 py-3">
          <span class="text-sky-800 block">已读列表：</span>
          <ul>
            <li class="inline text-sky-600">{{
              item.readList.map(item => item.fullname ? item.fullname : item.username).join('、')}}</li>
          </ul>
        </div>
        <p v-else class="text-sm text-gray-500">暂时还没有人阅读</p>
      </li>
    </TransitionGroup>
  </ul>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { nextTick } from 'vue';
import { inject, onMounted, reactive, ref } from 'vue';

import CopyButton from '@/components/CopyButton.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const classDetailStore = useClassDetailStore()
const class_id = ref('')
const notifies = ref([], { deep: true })

const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')

const isManager = ref(false)

const levelDict = reactive({
  1: '优先通知',
  2: '重要通知',
  3: '一般通知',
})

async function getNotifies() {
  isManager.value = (classDetailStore.manageClassInfo.createdBy == userStore.userDatas._id);

  class_id.value = classDetailStore.manageClassInfo._id;

  const res = await axios.get(`class/notify_class?class_id=${class_id.value}`)

  notifies.value = res.data.row.notifies;
  notifies.value.forEach(item => { item.collapsed = true });

  notifies.value.forEach(async (notify) => {
    notify.readList = await getReadList(notify);
  })
}

onMounted(async () => {
  await nextTick()
  await getNotifies();
})

// 不同等级不同样式
const levelClass = reactive({
  1: 'transition hover:bg-white hover:text-red-700 border px-1 rounded text-white bg-red-700',
  2: 'transition hover:bg-white hover:text-purple-700 border px-1 rounded text-white bg-purple-700',
  3: 'transition hover:bg-white hover:text-blue-700 border px-1 rounded text-white bg-blue-700',
})

// 已读按钮
async function onConfirmRead(notify_item) {
  const user_id = userStore.userDatas._id;
  const res = await axios.post('class/addRead', {
    user_id,
    class_id: class_id.value,
    notify_id: notify_item._id
  })
  if (res.data.code == 200) {
    confirm('提示', res.data.msg, true, async () => {
      await getNotifies();
      close();
    })
  } else {
    confirm('提示', res.data.msg, false, async () => {
      close();
    })
  }
}

// 点击删除按钮
async function onRemoveNotifyButton(item) {
  confirm('确认删除吗？', '', true, async () => {
    const notify_id = item._id;
    const res = await axios.delete(`class/removeNotify?class_id=${class_id.value}&notify_id=${notify_id}`)
    getNotifies();
    close();
  })
}

// 编辑通知按钮
async function onEditButton(item) {
  router.push({
    name: 'EditNotify',
    query: {
      class_id: classDetailStore.classInfo._id,
      notify_id: item._id
    }
  })
}

// 获取通知的已阅人员
async function getReadList(notify_item) {
  const res = await axios.get(`class/getRead?class_id=${class_id.value}&notify_id=${notify_item._id}`)
  return res.data.rows
}
</script>