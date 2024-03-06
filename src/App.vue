<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-05 17:31:03
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.vue
 * 联系方式:910592680@qq.com 
-->
<script setup lang="ts">
import autofit from 'autofit.js'
import { onMounted } from 'vue'
onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: 'body',
    resize: true
  })
})
</script>
<template>
  <RouterView />
</template>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/images/bg-body.png') no-repeat 0 0 #051045;
  background-size: 100% 100%;
}
</style>
