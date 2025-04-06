<template>
  <ul class="p-3">
    <label for="title" class="block text-sm my-2">班级名</label>
    <input id="title" class="pl-4 transition text-gray-600 rounded-2xl p-1 focus:outline"
      v-model="classDetail.className">
    <hr class="mt-3 text-gray-300">

    <label for="description" class="block text-sm my-2">描述</label>
    <input id="description" class="transition w-full text-gray-600 rounded-2xl p-1 focus:outline pl-4"
      v-model="classDetail.description">
    <hr class="mt-3 text-gray-300">

    <div class="flex gap-2">
      <button @click="updateClassDetail"
        class="rounded-2xl bg-sky-500 px-3 py-1 text-white hover:bg-sky-400 mt-2 cursor-pointer active:bg-green-500 transition">保存</button>
      <button @click="deleteClass"
        class="rounded-2xl bg-red-500 px-3 py-1 text-white hover:bg-red-400 mt-2 cursor-pointer active:bg-purple-500 transition">删除</button>
    </div>
  </ul>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { useUserStore } from '@/stores/user';
import { inject, onMounted, reactive, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import { useRouter } from 'vue-router';

const confirm = inject('confirm')
const close = inject('close')
const axios = inject('axios')

const router = useRouter();

let classDetail = ref({}, { deep: true });
const classDetailStore = useClassDetailStore();
const userStore = useUserStore();

function deleteClass() {
  confirm('确认删除?', '', true, () => {
    confirmDeleteClass()
  })
}

async function confirmDeleteClass() {
  const user_id = userStore.userDatas._id;
  const class_id = classDetailStore.classInfo._id;
  const res = await axios.delete(`class/remove?user_id=${user_id}&class_id=${class_id}`)
  if (res.data.code == 200) {
    confirm('提示', '删除成功', true, () => {
      router.push({ name: 'classList' })
      close();
    })
    return true;
  } else {
    confirm('删除失败', '')
    return false;
  }
}


const updateClassDetail = async () => {
  try {
    if (classDetail.value.className.trim() == '') {
      confirm('请填写标题', '', true, () => { close() })
      return;
    }
    const { _id: class_id } = classDetail.value;
    const user_id = userStore.userDatas._id;

    const res = await axios.post('class/update', {
      user_id,
      class_id,
      className: classDetail.value.className,
      description: classDetail.value.description
    })

    if (res.data.code == 200) {
      confirm('提示', '保存成功', false)
    } else {
      confirm('错误', '保存失败')
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  classDetail.value = classDetailStore.classInfo;
  console.log(classDetail);
})
</script>