<template>
  <div>
    <!-- 登陆表单 -->
    <div class="flex flex-col gap-5 w-full h-full transition" v-show="logTab">
      <h1 class="font-medium">欢迎回来</h1>
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="邮箱" v-model="loginForm.username">
      <input type="password"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="密码" v-model="loginForm.password">
      <button @click="onLoginButton"
        class="transition bg-green-600 hover:shadow-xl rounded py-2 text-white cursor-pointer hover:outline active:outline-2 outline-offset-0 active:outline-green-700 active:outline-offset-2">登陆</button>
      <div class="flex justify-between border-b hover:border-indigo-400 transition">
        <span class="font-light cursor-pointer hover:text-gray-500 active:text-gray-600"
          @click="logTab = !logTab">还未注册？</span>
        <div class="flex items-center gap-2"><label for="memoryPassword" class="text-sm text-sky-600">记住密码</label>
          <input type="checkbox" id="memoryPassword" v-model="ifMemory">
        </div>
      </div>


    </div>

    <!-- 注册表单 -->
    <div class="flex flex-col gap-5 w-full h-full transition" v-show="!logTab">
      <h1 class="font-medium">注册新账号</h1>
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="邮箱" v-model="registerForm.email">
      <input type="text"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="用户名" v-model="registerForm.username">
      <input type="password"
        class="font-medium border-none hover:bg-gray-300 active:border active:outline w-full bg-gray-200 rounded px-3 py-2"
        placeholder="密码" v-model="registerForm.password">
      <button
        class="transition bg-sky-600  hover:shadow-xl rounded py-2 text-white cursor-pointer hover:outline active:outline-2 outline-offset-0 active:outline-green-700 active:outline-offset-2"
        @click="onRegisterButton">注册</button>
      <span class="hover:border-green-500 font-light border-b cursor-pointer hover:text-gray-500 active:text-gray-600 transition"
        @click="logTab = !logTab">直接登陆</span>
    </div>
    <Modal v-model="modalData" />

    <!-- 用户条框 -->
     <p class="text-sm text-gray-500">登陆即表示同意平台<router-link :to="{name: 'privacy'}" class="text-sky-600 cursor-pointer hover:brightness-120">《隐私政策》</router-link>和<router-link :to="{name: 'privacyCommunity'}" class="text-sky-600 cursor-pointer hover:brightness-120">《社区公约》</router-link></p>
  </div>
</template>

<script setup>
import { reactive, ref, inject } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import Modal from "../Modal.vue";
import { onMounted } from "vue";
import { watch } from "vue";

const ifMemory = ref(false)

const modalData = reactive({
  show: false,
  msg: ''
})

const confirm = inject('confirm')
const close = inject('close')

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
const userStore = useUserStore();

watch(ifMemory, (newValue) => {
  userStore.memoryPassword = newValue;
  // 如果取消勾选，清空用户的账号密码信息
  if (newValue == false) {
    userStore.userDatas.username = ''
    userStore.userDatas.password = ''
  }
})

onMounted(() => {
  ifMemory.value = userStore.memoryPassword;
  if (ifMemory.value) {
    loginForm.username = userStore.userDatas.email
    loginForm.password = userStore.userDatas.password
  }
})

const onRegisterButton = async () => {
  // 表单验证不通过弹出弹窗
  if (registerForm.username.trim() == '' || registerForm.password.trim() == '' || registerForm.email.trim() == '') {
    modalData.show = true;
    modalData.msg = '请填写注册信息';
    return;
  } else {
    try {
      const res = await axios.post('/user/register', registerForm);
      if (res.data.code == 200) {
        loginForm.username = res.data.row.email;
      }
      confirm('提示', res.data.msg, true, () => { close() })
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
      console.log('登陆信息：', res.data);

      userStore.userDatas._id = res.data.row._id;
      userStore.userDatas.createdAt = res.data.row.createdAt;
      userStore.userDatas.email = res.data.row.email;
      userStore.userDatas.username = res.data.row.username;
      userStore.userDatas.password = res.data.row.password;
      userStore.userDatas.updatedAt = res.data.row.updatedAt;
      userStore.userDatas.classes = res.data.row.classes;


      localStorage._id = res.data.row._id
      localStorage.createdAt = res.data.row.createdAt
      localStorage.email = res.data.row.email
      localStorage.username = res.data.row.username
      localStorage.password = res.data.row.password
      localStorage.updatedAt = res.data.row.updatedAt
      localStorage.classes = JSON.stringify(res.data.row.classes)

      router.push({ name: 'classList' })
    } catch (error) {
      console.error(error);
    }
  }
}
</script>