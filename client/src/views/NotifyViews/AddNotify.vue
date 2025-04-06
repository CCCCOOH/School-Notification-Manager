<template>
  <div class="p-2">
    <div class="mb-3">
      <h1 class="inline text-gray-700">标题：</h1>
      <input v-model="addForm.title" type="text"
        class="p-2 rounded bg-gray-100 focus:border-l-3 border-sky-500 outline-none w-full" placeholder="请输入通知标题..">
    </div>
    <div>
      <h1 class="inline text-gray-700">内容：</h1>
      <textarea type="text" v-model="addForm.content"
        class="p-2 rounded bg-gray-100 focus:border-l-3 border-sky-500 min-h-18 outline-none w-full h-fit"
        placeholder="请输入通知内容.." />
      <select name="level" id="level" v-model="addForm.level" class="outline-none">
        <option value="1">优先通知</option>
        <option value="2">重要通知</option>
        <option value="3">一般通知</option>
      </select>
    </div>
    <button @click="onAddButton"
      class="mt-2 outline outline-gray-300 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer active:bg-gray-200">添加</button>
  </div>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { useUserStore } from '@/stores/user';
import { inject, reactive } from 'vue';

const confirm = inject('confirm');
const close = inject('close')
const axios = inject('axios')
const classDetailStore = useClassDetailStore();
const userStore = useUserStore();
const addForm = reactive({
  title: '',
  content: '',
  level: '3',

})

async function onAddButton() {
  const classInfo = classDetailStore.manageClassInfo;
  const class_id = classInfo._id;
  const user_id = userStore.userDatas._id;
  
  const res = await axios.post('class/notify/add', {
    title: "计算机协会招新",
    content: "一条测试数据....",
    level: "2",
    class_id,
    user_id
  })
  if (res.data.code == 200) {
    confirm('添加成功', '', true, () => {
      close()
    })
  }
}
</script>