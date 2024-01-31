<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-01-31 14:35:55
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.vue
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
-->
<script setup lang="ts">
import { onMounted } from 'vue'

import { App } from './App'
const main = async () => {
  const container = document.getElementById('scene-container')
  const app = new App(container!)
  await app.init()
  app.start()
}
onMounted(() => {
  main()
})
</script>

<template>
  <div class="wrapper" id="scene-container"></div>
  <div></div>
</template>

<style scoped>
.wrapper{
  width: 100vw;
  height: 100vh;
}
</style>
