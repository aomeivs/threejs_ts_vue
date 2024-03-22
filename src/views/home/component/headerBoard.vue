<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 14:01:04
 * @LastEditTime: 2024-03-22 10:19:10
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/headerBoard.vue
 
-->
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
    <div class="title">智能电控可视化</div>
    <div class="time">{{ nowDate }}</div>
  </div>
</template>
