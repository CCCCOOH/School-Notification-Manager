<template>
  <ul class="p-2 flex flex-col gap-5 *:flex *:flex-col *:gap-2">
    <li>
      <label for="title" class="text-sky-700 w-full">标题：</label>
      <input id="title" placeholder="请输入新的通知标题(不能为空)" type="text" v-model="updateForm.title"
        class="font-bold w-full pl-2 outline-none border-b-2 transition border-gray-300 focus:border-indigo-500">
    </li>
    <li>
      <div class="flex" v-if="updateForm.postUrl">
        <label for="content" class="text-sky-700 block">封面：</label>
        <img :src="updateForm.postUrl" alt="封面海报" class="float-left rounded w-50 outline-2 outline-offset-2 outline-gray-300">
      </div>

      <div class="flex mt-2 gap-2 items-center h-10">
        <input @change="handleFileChange" type="file"
          class="flex-1 cursor-pointer p-2 rounded outline-2 outline-gray-300 bg-gray-100 focus:outline-2 focus:outline-sky-500 transition" />
        <button v-if="updateForm.postUrl" class="h-full bg-red-500 text-white rounded px-1 cursor-pointer hover:brightness-105" @click="updateForm.postUrl = ''">删除</button>
      </div>
      <Teleport to="body">
        <img v-if="showPost" :src="updateForm.postUrl"
          class="absolute z-2 h-5/6 left-1/2 top-1/2 -translate-x-1/2 cursor-pointer -translate-y-1/2"
          @click="onShowPostButton" alt="海报">
      </Teleport>
    </li>
    <li>
      <label for="content" class="text-sky-700 block">内容：</label>
      <WangEditor v-model="updateForm.content" />
    </li>
    <li>
      <label for="level" class="text-sky-700 block">优先级：</label>
      <select name="level" id="level" v-model="updateForm.level" class="outline-gray-300">
        <option value="1">优先通知</option>
        <option value="2">重要通知</option>
        <option value="3">一般通知</option>
      </select>
    </li>
    <li>
      <label for="categories" class="text-sky-700 w-full">分类：</label>
      <input type="text" id="categories" class="block outline-none border-b-2 border-gray-300" placeholder="多个分类用空格隔开.."
        v-model="categoriesInput">
    </li>
    <li>
      <button @click="onUpdateButton"
        class="transition bg-sky-500 rounded text-white font-bold py-1 hover:brightness-110 cursor-pointer focus:outline active:outline-indigo-500">修改通知</button>
    </li>
  </ul>
</template>

<script setup>
import WangEditor from '@/components/WangEditor.vue';
import { useUserStore } from '@/stores/user';
import { inject, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const axios = inject('axios')
const confirm = inject('confirm')
const server_url = inject('server_url')
const close = inject('close')
const router = useRouter();

const userStore = useUserStore();

const showPost = ref(false)
const updateForm = reactive({
  title: '',
  content: '',
  level: '3',
  postUrl: '',
  categories: []
})

const categoriesInput = ref('')


onMounted(async () => {
  const { class_id, notify_id } = route.query;
  const res = await axios.get(`class/notify_detail?notify_id=${notify_id}&class_id=${class_id}`)
  updateForm.title = res.data.notify.title
  updateForm.content = res.data.notify.content
  updateForm.level = res.data.notify.level
  updateForm.postUrl = res.data.notify.postUrl
  updateForm.categories = res.data.notify.categories
  categoriesInput.value = updateForm.categories.join(' ')
})
// 处理上传海报图片表单变动
async function handleFileChange(event) {
  const files = event.target.files;

  const res = await axios.post('class/uploadImage', files, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  
  if (res.data.code == 200) {
    confirm('提示', res.data.msg, false);
    updateForm.postUrl = 'http://' + server_url + '/' + res.data.rows[0];
  } else {
    confirm('警告', res.data.msg)
  }
}

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
    user_id,
    postUrl: updateForm.postUrl
  })

  if (res.data.code == 200) {
    confirm('提示', res.data.msg, true, () => {
      close();
      router.push({ name: 'ManageNotifyList' })
    })
  } else {
    confirm('警告', res.data.msg, true, () => { close() })
  }
}
</script>