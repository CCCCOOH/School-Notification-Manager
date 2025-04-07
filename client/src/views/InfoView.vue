<template>
  <div class="p-2">
    <h1 class="text-gray-700">账号管理</h1>
    <hr class="text-gray-300 mb-4">

    <div class="flex items-center gap-4 flex-wrap h-45 max-md:flex-col max-md:flex-nowrap">
      <ul class="flex flex-col gap-3 bg-gray-100 rounded p-2 shadow-sm h-full justify-between max-md:w-full">
        <li class="flex items-center gap-2 justify-between">
          <label for="username" class="text-sky-700">用户名:</label>
          <input placeholder="请输入用户名..." type="text" id="username" autocomplete="false"
            class="flex-1 transition outline-none border-b focus:border-sky-500" v-model="userForm.username">
        </li>
        <li class="flex items-center gap-2 justify-between">
          <label for="fullname" class="text-sky-700">全名:</label>
          <input placeholder="请输入用户名..." type="text" id="fullname" autocomplete="false"
            class="flex-1 transition outline-none border-b focus:border-sky-500" v-model="userForm.fullname">
        </li>
        <li class="flex items-center gap-2 justify-between">
          <label for="fullname" class="text-sky-700">邮箱:</label>
          <input disabled 
            class="flex-1 transition outline-none border-b border-gray-300" v-model="userForm.email">
        </li>
        <li class="w-full">
          <p :class="{ 'opacity-100': infoAlert.show }" class="transition opacity-0 text-red-500 text-[10px]">{{
            infoAlert.content }}</p>
          <button @click="onInfoSaveButton"
            class="w-full bg-sky-400 text-white rounded px-2 hover:brightness-110 cursor-pointer active:brightness-105">保存</button>
        </li>
      </ul>

      <ul class="h-full flex flex-col gap-3 bg-gray-100 rounded p-2 shadow-sm justify-between max-md:w-full">
        <li class="flex items-center gap-2 justify-between">
          <label for="originpassword" class="text-sky-700">原先密码:</label>
          <input placeholder="请输入密码..." type="password" id="originpassword" v-model="originpassword" autocomplete="false"
            class="flex-1 transition outline-none border-b focus:border-sky-500">
        </li>

        <li class="flex items-center gap-2 justify-between">
          <label for="password" class="text-sky-700">修改密码:</label> 
          <input placeholder="请输入密码..." type="password" id="password" v-model="password_1" autocomplete="false"
            class="flex-1 transition outline-none border-b focus:border-sky-500">
        </li>
        <li class="flex items-center gap-2 justify-between">
          <label for="repeatpassword" class="text-sky-700">确认密码:</label>
          <input placeholder="请输入相同密码..." type="password" id="repeatpassword" v-model="password_2" autocomplete="false"
            class="flex-1 transition outline-none border-b focus:border-sky-500">
        </li>
        <li class="w-full">
          <p :class="{ 'opacity-100': passwordAlert.show }" class="transition opacity-0 text-red-500 text-[10px]">{{
            passwordAlert.content }}</p>
          <button @click="updatePassword"
            class="w-full bg-sky-400 text-white rounded px-2 hover:brightness-110 cursor-pointer active:brightness-105">保存</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { reactive } from 'vue';
import { inject } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const userStore = useUserStore();
const userForm = ref({
  user_id: '',
  username: '',
  fullname: '',
  password: '',
});

const axios = inject('axios')
const confirm = inject('confirm')
const close = inject('close')

const originpassword = ref('')
const password_1 = ref('')
const password_2 = ref('')
const passwordAlert = reactive({
  show: false,
  content: '密码不为空'
})
const infoAlert = reactive({
  show: false,
  content: '用户名不为空'
})

const onInfoSaveButton = async () => {
  if (userForm.value.username == '') {
    showInfoAlert('用户名不能为空')
    return;
  } else if (userForm.value.fullname == '') {
    showInfoAlert('全名不能为空')
    return;
  } else if (userForm.value.fullname.length > 10) {
    showInfoAlert('全名过长')
    return;
  } else {
    infoAlert.show = false
  }
  confirm('提示', '确认保存？', true, async () => {
    close()
    const res = await axios.post(`user/update`, userForm.value)
    confirm('提示', res.data.msg, true, () => { close() })
  })
}

function showPasswordAlert(tipStr) {
  passwordAlert.show = true
  passwordAlert.content = tipStr
}
function showInfoAlert(tipStr) {
  infoAlert.show = true
  infoAlert.content = tipStr
}

const updatePassword = async () => {
  if (originpassword.value != userStore.userDatas.password) {
    showPasswordAlert('原先密码有错误')
    return;
  } else if (password_1.value.trim() == '' || password_2.value.trim() == '') {
    showPasswordAlert('密码不能为空')
    return;
  } else if (password_1.value != password_2.value) {
    showPasswordAlert('两次密码不一致')
    return;
  } else if (password_1.value == userStore.userDatas.password) {
    showPasswordAlert('更改的密码不能与原先一致')
    return;
  } else {
    passwordAlert.show = false
  }
  userForm.password = password_1 == password_2 ? password_1 : ''
  const res = await axios.post(`user/update`, userForm.value)
  confirm('提示', res.data.msg, true, () => { close() })
}

onMounted(() => {
  userForm.value.user_id = userStore.userDatas._id
  userForm.value.username = userStore.userDatas.username;
  userForm.value.fullname = userStore.userDatas.fullname;
  userForm.value.password = userStore.userDatas.password;
  userForm.value.email = userStore.userDatas.email;
})
</script>