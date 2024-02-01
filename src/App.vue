<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-02-01 14:38:40
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.vue
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { App } from './App'
const isPlay = ref(true)
let app: App
const main = async () => {
  const container = document.getElementById('scene-container')
  app = new App(container!)
  await app.init()
  app.start()
}
onMounted(() => {
  main()
})

const play = async () => {
  app.play('Anim_0', isPlay.value)
  isPlay.value = !isPlay.value
}
</script>

<template>
  <div class="wrapper" id="scene-container"></div>
  <div></div>
  <div class="control">
    <button type="button" @click="play">play</button>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}
.control {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
