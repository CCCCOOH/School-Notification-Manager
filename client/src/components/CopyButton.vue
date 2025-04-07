<template>
  <i title="复制"
    class="fas fa-clipboard cursor-pointer hover:bg-gray-300 p-2 rounded-full size-8 text-center active:brightness-110" @click="copyId(str)"></i>
</template>

<script setup>
import { inject } from 'vue';

const { str } = defineProps(['str'])

defineEmits(['copy'])

const confirm = inject('confirm')
const close = inject('close')

function copyId(str) {
  var aux = document.createElement("input");
  aux.setAttribute("value", str);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  confirm('提示', '复制到剪切板成功', true, () => { close() })
}
</script>