<template>
  <ul class="p-2 flex flex-col gap-5 *:flex *:flex-col *:gap-2">
    <li>
      <label for="title" class="text-gray-500 w-full">标题：</label>
      <input id="title" placeholder="请输入新的通知标题(不能为空)" type="text" v-model="updateForm.title" class="font-bold w-full pl-2 outline-none border-b-2 transition border-gray-300 focus:border-indigo-500">
    </li>
    <li>
      <label for="content" class="text-gray-500 block">内容：</label>
      <WangEditor v-model="updateForm.content" />
      <!-- <textarea placeholder="请输入更新内容..." id="content" type="text" v-model="updateForm.content" class="w-full rounded outline-2 outline-gray-300 p-2 min-h-20 transition focus:outline-indigo-500" /> -->
    </li>
    <li>
      <label for="level" class="text-gray-500 block">优先级：</label>
      <select name="level" id="level" v-model="updateForm.level" class="outline-gray-300">
        <option value="1">优先通知</option>
        <option value="2">重要通知</option>
        <option value="3">一般通知</option>
      </select>
    </li>
    <li>
      <label for="categories" class="text-gray-500 w-full">分类：</label>
      <input type="text" id="categories" class="block outline-none border-b-2 border-gray-300" placeholder="多个分类用空格隔开.." v-model="categoriesInput">
    </li>
    <li>
      <button @click="onUpdateButton" class="transition bg-sky-500 rounded text-white font-bold py-1 hover:brightness-110 cursor-pointer focus:outline active:outline-indigo-500">修改通知</button>
    </li>
  </ul>
</template>

<script setup>
import WangEditor from '@/components/WangEditor.vue';
import { useUserStore } from '@/stores/user';
import { watch } from 'vue';
import { inject, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')
const router = useRouter();

const userStore = useUserStore();

const updateForm = reactive({
  title: '',
  content: '',
  level: '3',
  categories: []
})

const categoriesInput = ref('')


onMounted(async () => {
  const { class_id, notify_id } = route.query;
  const res = await axios.get(`class/notify_detail?notify_id=${notify_id}&class_id=${class_id}`)
  updateForm.title = res.data.notify.title
  updateForm.content = res.data.notify.content
  updateForm.level = res.data.notify.level
  updateForm.categories = res.data.notify.categories
  categoriesInput.value = updateForm.categories.join(' ')
})

async function onUpdateButton() {
  const user_id = userStore.userDatas._id;
  const { class_id, notify_id } = route.query;
  updateForm.categories = categoriesInput.value.trim().split(' ')
  const res = await axios.put('class/notify/modify', {
    notify_id: notify_id,
    title: updateForm.title,
    content: updateForm.content,
    level: updateForm.level,
    class_id,
    user_id
  })
  
  if (res.data.code == 200) {
    confirm('提示', res.data.msg, true, () => {
      close();
      router.push({name: 'manageNotifyList'})
    })
  } else {
    confirm('警告', res.data.msg, true, () => {close()})
  }
}
</script>