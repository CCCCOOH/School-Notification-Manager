<template>
  <div class="p-2 flex flex-col gap-3">
    <h1 class="text-gray-500">填写需要创建的班级信息</h1>
    <input v-model="createForm.className" type="text" placeholder="输入班级标题..."
      class="border-b-2 rounded p-2 outline-none hover:bg-gray-100 focus:border-sky-500">
    <input v-model="createForm.description" type="text" placeholder="输入班级描述..."
      class="border-b-2 rounded p-2 outline-none hover:bg-gray-100 focus:border-sky-500">
    <button @click="onCreateClassButton"
      class="bg-sky-600 rounded w-20 text-white hover:bg-sky-500 cursor-pointer">创建</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { inject, reactive } from 'vue';

const axios = inject('axios')
const userStore = useUserStore();

const createForm = reactive({
  className: '',
  description: ''
})

const onCreateClassButton = async () => {
  try {
    if (createForm.className == '') {
      alert('请输入标题...')
      return;
    }
    const userDatas = useUserStore().userDatas;
    const { _id: user_id } = userDatas;
    const res = await axios.post('class/create', {
      className: createForm.className,
      description: createForm.description,
      createdBy: user_id
    })
    if (res.status == 200) {
      alert('创建成功')
    } else {
      alert('创建失败')
    }
  } catch (error) {
    console.error(error);
  } finally {
    createForm.className = ''
    createForm.description = ''
  }
}
</script>