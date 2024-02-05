<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-02-05 16:21:17
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.vue
 * 联系方式:910592680@qq.com 
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { App, show, equipment } from './App'
const isPlay = ref(true)
let app: App
const main = async () => {
  const container = document.getElementById('scene-container')
  // const css2container = document.getElementById('css2object')
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
  <ul class="css2object" id="css2object" v-show="show">
    <li>设备名:{{ equipment.name }}</li>
    <li>编号</li>
    <li>温度</li>
    <li>状态{{}}</li>
    <li>运行时间{{}}</li>
  </ul>
  <div class="control">
    <!-- <button type="button" @click="play">play</button> -->
  </div>
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
}
.control {
  position: absolute;
  right: 10px;
  top: 10px;
}
.css2object {
  position: absolute;
  top: 0;
  width: 300px;
  height: 200px;
  margin-left: 150px;
  margin-top: -100px;
}
</style>
