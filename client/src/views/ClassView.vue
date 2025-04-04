<template>
  <div>
    <ul class="w-full flex border-b border-gray-200 text-gray-800 gap-5 pl-3">
      <router-link :to="{name: 'classList'}" class="transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">班级</router-link>
      <router-link :to="{name: 'classList'}" class="transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">我管理的班级</router-link>
      <router-link :to="{name: 'createClass'}" class="transition cursor-pointer hover:-translate-y-[1px] hover:text-sky-700">创建班级</router-link>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script setup>

</script>