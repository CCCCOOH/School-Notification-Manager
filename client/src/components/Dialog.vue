<template>
  <Teleport to="body">
    <Transition enter-from-class="scale-80 opacity-0" enter-active-class="transition" leave-active-class="transition" leave-to-class="opacity-0 scale-0">
      <div v-if="visible"
        class="p-2 flex flex-col items-center rounded w-100 absolute outline shadow-lg bg-white left-1/2 top-1/3 -translate-1/2">
        <div>
          <div @click="visible = false">
            <div class="absolute left-2 size-3 bg-red-500 rounded-full cursor-pointer" title="关闭"></div>
            <div class="absolute left-6 size-3 bg-yellow-500 rounded-full cursor-pointer"></div>
            <div class="absolute left-10 size-3 bg-green-500 rounded-full cursor-pointer"></div>
          </div>
          <h1 class="font-bold text-xl">{{ options.title }}</h1>
        </div>
        <hr class="w-full text-gray-200" v-show="options.showButton">
        <div class="text-gray-700 font-semibold">
          <p class="text-center mb-2">{{ options.msg }}</p>
          <div v-if="options.showButton" class="flex gap-2">
            <button @click="options.callBack"
              class="block bg-sky-500 rounded-2xl px-3 py-1 text-white hover:bg-sky-400 active:bg-red-600">确定</button>
            <button @click="visible = false"
              class="block bg-sky-500 rounded-2xl px-3 py-1 text-white hover:bg-sky-400">取消</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue';

const options = reactive({
  title: '',
  msg: '',
  showButton: false,
  callBack: null
})

const visible = ref(false)

async function close() {
  visible.value = false;
}

async function open(title = '提示', msg = '', showButton = false, callBack) {
  options.title = title
  options.showButton = showButton
  options.msg = msg
  options.callBack = callBack;
  visible.value = true;
  return;
}

defineExpose({
  open,
  close
})
</script>