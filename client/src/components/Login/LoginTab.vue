<template>
  <div>
    <!-- 登陆表单 -->
    <div class="flex flex-col gap-5 w-full h-full transition" v-show="logTab">
      <h1 class="font-medium">欢迎回来</h1>
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="账号" v-model="loginForm.username">
      <input type="password"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="密码" v-model="loginForm.password">
      <button @click="onLoginButton"
        class="transition bg-green-600 hover:shadow-xl rounded py-2 text-white cursor-pointer hover:outline active:outline-2 outline-offset-0 active:outline-green-700 active:outline-offset-2">登陆</button>
      <span class="hover:border-amber-500 font-light border-b cursor-pointer hover:text-gray-500 active:text-gray-600"
        @click="logTab = !logTab">还未注册？</span>
    </div>

    <!-- 注册表单 -->
    <div class="flex flex-col gap-5 w-full h-full transition" v-show="!logTab">
      <h1 class="font-medium">注册新账号</h1>
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="邮箱" v-model="registerForm.email">
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="账号" v-model="registerForm.username">
      <input type="password"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="密码" v-model="registerForm.password">
      <button
        class="transition bg-sky-600  hover:shadow-xl rounded py-2 text-white cursor-pointer hover:outline active:outline-2 outline-offset-0 active:outline-green-700 active:outline-offset-2"
        @click="onRegisterButton">注册</button>
      <span class="hover:border-green-500 font-light border-b cursor-pointer hover:text-gray-500 active:text-gray-600"
        @click="logTab = !logTab">直接登陆</span>
    </div>
    <Modal v-model="modalData" />
  </div>
</template>

<script setup>
import { reactive, ref, inject } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import Modal from "../Modal.vue";

const modalData = reactive({
  show: false,
  msg: ''
})

const router = useRouter();

const axios = inject('axios')

const logTab = ref(true);
const registerForm = reactive({
  username: '',
  password: '',
  email: ''
})
const loginForm = reactive({
  username: '',
  password: ''
})


const onRegisterButton = async () => {
  // 表单验证不通过弹出弹窗
  const userStore = useUserStore();
  if (registerForm.username.trim() == '' || registerForm.password.trim() == '' || registerForm.email.trim() == '') {
    modalData.show = true;
    modalData.msg = '请填写注册信息';
    return;
  } else {
    try {
      const res = await axios.post('/user/register', registerForm);
      userStore.userDatas = res.data;
      modalData.show = true;
      modalData.msg = res.data.msg;
    } catch (error) {
      console.error(error);
    } finally {
      registerForm.email = ''
      registerForm.username = ''
      registerForm.password = ''
      logTab.value = true
    }
  }
}

function message(str) {
  modalData.show = true;
  modalData.msg = str
}

const onLoginButton = async () => {
  if (loginForm.username == '' || loginForm.password == '') {
    modalData.show = true;
    modalData.msg = '请填写表单'
    return;
  } else {
    try {
      const res = await axios.post('/user/login', loginForm);

      if (res.data.code == 500) {
        modalData.show = true;
        modalData.msg = res.data.msg;
        loginForm.username = '';
        loginForm.password = ''
        return;
      }
      const userStore = useUserStore();
      userStore.createdAt = res.data.row.createdAt;
      userStore.email = res.data.row.email;
      userStore.username = res.data.row.username;
      userStore.password = res.data.row.password;
      userStore.updatedAt = res.data.row.updatedAt;
      userStore.classes = res.data.row.classes;


      localStorage._id = res.data.row._id
      localStorage.createdAt = res.data.row.createdAt
      localStorage.email = res.data.row.email
      localStorage.username = res.data.row.username
      localStorage.password = res.data.row.password
      localStorage.updatedAt = res.data.row.updatedAt
      localStorage.classes = JSON.stringify(res.data.row.classes)

      message('登陆成功')
      setTimeout(() => {
        router.push({ name: 'classList' })
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>