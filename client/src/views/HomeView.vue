<template>
  <ul class="w-full h-full flex flex-col pl-5 gap-5">
    <h1 class="my-2 text-xl">个人信息</h1>
    <li>
      <label for="name" class="text-gray-600">姓名：</label>
      <input id="name" :class="inputClass" type="text" placeholder="请输入姓名...">
    </li>
    <li>
      <label for="role" class="text-gray-600">角色：</label>
      <input id="role" :class="inputClass" type="text" placeholder="请输入角色...">
    </li>
    <li>
      <label for="school" class="text-gray-600">学校：</label>
      <input id="school" :class="inputClass" type="text" placeholder="请输入学校...">
    </li>
    <li>
      <label for="class" class="text-gray-600">班级：</label>
      <input id="class" :class="inputClass" type="text" placeholder="请输入班级...">
    </li>
    <li>
      <label for="email" class="text-gray-600">邮箱：</label>
      <input id="email" :class="inputClass" type="text" placeholder="请输入邮箱...">
    </li>
    <li>
      <button class="bg-gray-600 text-white px-2 py-1 rounded hover:outline-2 hover:outline-offset-2 hover:outline-gray-600 cursor-pointer active:bg-gray-500">提交</button>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const inputClass = ref('p-1 bg-gray-100 focus:outline-hidden border-b-3 border-gray-400 focus:border-sky-500 rounded')
</script>