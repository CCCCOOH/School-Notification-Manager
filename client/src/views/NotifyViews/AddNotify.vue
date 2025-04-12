<template>
  <div class="p-2">
    <div class="mb-3">
      <h1 class="inline text-gray-700">标题：</h1>
      <input v-model="addForm.title" type="text"
        class="p-2 rounded outline-2 outline-gray-300 bg-gray-100 focus:outline-2 focus:outline-sky-500 w-full transition"
        placeholder="请输入通知标题..">
    </div>
    <div>
      <h1 class="inline text-gray-700">内容：</h1>
      <WangEditor v-model="addForm.content" />
      <!-- <textarea type="text" v-model="addForm.content"
        class="p-2 rounded outline-2 outline-gray-300 bg-gray-100 focus:outline-2 focus:outline-sky-500 min-h-30 w-full transition"
        placeholder="请输入通知内容.." /> -->
      <ul class="flex gap-3 py-2">
        <li>
          <label for="level" class="text-sky-700">优先级：</label>
          <select name="level" id="level" v-model="addForm.level" class="outline-none">
            <option value="1">优先通知</option>
            <option value="2">重要通知</option>
            <option value="3">一般通知</option>
          </select>
        </li>
        <li>
          <label for="date" class="text-sky-700">日期：</label>
          <input type="date" id="date" v-model="date">
        </li>
        <li>
          <label for="time" class="text-sky-700">时间：</label>
          <input type="time" id="time" v-model="time">
        </li>
        <li>

        </li>
      </ul>

      <input type="text" class="transition block outline-none border-b-2 border-gray-400 focus:border-indigo-500"
        placeholder="多个分类用空格隔开.." v-model="categoriesInput">
    </div>
    <button @click="onAddButton"
      class="mt-2 outline outline-gray-300 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer active:bg-gray-200">添加</button>
  </div>
</template>

<script setup>
import WangEditor from '@/components/WangEditor.vue';
import { useClassDetailStore } from '@/stores/classDetail';
import { useUserStore } from '@/stores/user';
import { watch } from 'vue';
import { computed } from 'vue';
import { inject, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const confirm = inject('confirm');
const close = inject('close')
const axios = inject('axios')
const classDetailStore = useClassDetailStore();
const userStore = useUserStore();
const router = useRouter();

const date = ref('')
const time = ref('')

const addForm = reactive({
  title: '',
  content: '',
  level: '3',
  categories: []
})

const categoriesInput = ref('')

const dateObj = computed(() => {
  const [year, month, day] = date.value.split('-')
  const [hour, minute] = time.value.split(':')
  const dateObj = new Date();
  dateObj.setFullYear(year);
  dateObj.setMonth(month);
  dateObj.setDate(day);
  dateObj.setHours(hour);
  dateObj.setMinutes(minute);
  return dateObj;
})
async function onAddButton() {
  const classInfo = classDetailStore.manageClassInfo;

  const class_id = classInfo._id;
  const user_id = userStore.userDatas._id;
  if (categoriesInput.value !== '') {
    addForm.categories = categoriesInput.value.split(' ');
  }

  if (dateObj.value == 'Invalid Date') {
    confirm('警告', '日期表单格式错误', true, () => {close()})
    return;
  }

  const res = await axios.post('class/notify/add', {
    title: addForm.title,
    content: addForm.content,
    level: addForm.level,
    categories: addForm.categories,
    class_id,
    user_id,
    time: dateObj.value
  })

  if (res.data.code == 200) {
    confirm('提示', res.data.msg, true, () => {
      close();
      router.push({ name: 'manageNotifyList' })
    })
  } else {
    confirm('添加失败', '', true, () => { close() })
  }
  addForm.title = ''
  addForm.content = ''
  categoriesInput.value = ''
}
</script>