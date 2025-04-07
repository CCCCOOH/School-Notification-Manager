<template>
  <div class="p-2 flex flex-col gap-3">
    <h1 class="text-gray-500">填写需要创建的班级信息</h1>
    <input v-model="createForm.className" type="text" placeholder="输入班级标题..."
      class="border-b-2 rounded p-2 outline-none hover:bg-gray-100 focus:border-sky-500">
    <input v-model="createForm.description" type="text" placeholder="输入班级描述..."
      class="border-b-2 rounded p-2 outline-none hover:bg-gray-100 focus:border-sky-500">
    <button @click="onCreateClassButton"
      class="bg-sky-600 rounded w-20 text-white hover:bg-sky-500 cursor-pointer">创建</button>
      <Modal v-model="modalData" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { inject, reactive } from 'vue';
import Modal from '@/components/Modal.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')
const userStore = useUserStore();

const createForm = reactive({
  className: '',
  description: ''
})

const modalData = reactive({
  show: false,
  msg: ''

})

function message(str) {
  modalData.show = true;
  modalData.msg = str
}

const onCreateClassButton = async () => {
  try {
    if (createForm.className == '') {
      confirm('请输入标题...', '', true, () => {
        close();
      })
      return;
    }
    const userDatas = userStore.userDatas;
    
    const { _id: user_id } = userDatas;
    console.log('user_id:',user_id);
    
    
    const res = await axios.post('class/create', {
      className: createForm.className,
      description: createForm.description,
      createdBy: user_id
    })

    if (res.data.code == 200) {
      confirm(res.data.msg, '', true, () => {
        router.push({name: 'classList'})
        close()
      })
    } else {
      confirm(res.data.msg)
    }
  } catch (error) {
    console.error(error);
  } finally {
    createForm.className = ''
    createForm.description = ''
  }
}
</script>