<script setup lang="ts">
import dayjs from 'dayjs'
import { onUnmounted, ref } from 'vue'
const nowDate = ref(dayjs().format('YYYY-MM-DD HH:mm'))
const interverl = setInterval(() => {
  nowDate.value = dayjs().format('YYYY-MM-DD HH:mm')
}, 1000)

onUnmounted(() => {
  clearInterval(interverl)
})
</script>
<template>
  <div class="header">
    <div class="title">科维智能电控可视化</div>
    <div class="time">{{ nowDate }}</div>
  </div>
</template>
