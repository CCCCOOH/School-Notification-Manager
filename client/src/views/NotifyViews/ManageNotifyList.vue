<template>
    <ul class="p-2 flex gap-3 flex-wrap">
      <NotifyCard v-for="(item) in notifies" :data="item" :key="item" class="w-100 h-fit" />
    </ul>
</template>

<script setup>
import { useClassDetailStore } from '@/stores/classDetail';
import { inject, onMounted, ref } from 'vue';
import NotifyCard from '@/components/NotifyCard.vue';


const classDetailStore = useClassDetailStore();
const class_id = ref('')
const notifies = ref([])

const axios = inject('axios')

onMounted(async () => {
  class_id.value = classDetailStore.manageClassInfo._id;
  const res = await axios.get(`class/notify_class?class_id=${class_id.value}`)
  notifies.value = res.data.row.notifies;
})
</script>