<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 09:20:35
 * @LastEditTime: 2024-03-12 17:33:24
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/HomeView.vue
 * 联系方式:910592680@qq.com
-->
<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-12 13:35:09
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/HomeView.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TipBoard from '@/views/home/component/TipBoard.vue'
import CssBoard from '@/views/home/component/CssBoard.vue'
import LeftBoard from './component/LeftBoard.vue'
import BottomBoard from './component/BottomBoard.vue'
import headerBoard from './component/headerBoard.vue'
import { App, show, equipment, camera, TWEEN } from '@/App'
const tipBoardRef = ref<InstanceType<typeof TipBoard> | null>(null)
const cssBorderRef = ref<InstanceType<typeof CssBoard> | null>(null)
let app: App
const main = async () => {
  const container = document.getElementById('webgl-container')
  app = new App(container!) // 场景初始化
  await app.init() // 加载初始化
  app.start() // 循环渲染
  tipBoardRef.value!.init(app) // 初始化设备连线板
  cssBorderRef.value!.init(app) // 初始化点击提示板
}
onMounted(() => {
  main()
})
const rotatCamera = (type: number) => {
  const initialPosition = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  const targetPosition: any = {
    1: { x: 0, y: 13, z: 9 },
    2: { x: 0, y: 18, z: 0 },
    3: { x: -10, y: 10, z: 10 }
  }

  new TWEEN.Tween(initialPosition)
    .to(targetPosition[type], 800)
    .onUpdate((obj) => {
      camera.position.set(obj.x, obj.y, obj.z)
    })
    .start()
}
</script>
<template>
  <div class="bg">
    <div class="bg-border">
      <header-board></header-board>
      <div class="board">
        <left-board></left-board>
        <div class="board-container">
          <div class="webgl-view">
            <tip-board ref="tipBoardRef"></tip-board>
            <div class="camera">
              <div @click="rotatCamera(1)" class="viewport1">俯视</div>
              <div @click="rotatCamera(2)" class="viewport2">鸟瞰</div>
              <div @click="rotatCamera(3)" class="viewport3">倾斜</div>
            </div>
            <!-- webgl-container -->
            <div class="webgl-container" id="webgl-container"></div>
          </div>
          <bottom-board></bottom-board>
        </div>
      </div>
    </div>
  </div>
  <css-board ref="cssBorderRef" :equipment="equipment" v-show="show"></css-board>
</template>
<style lang="scss" scoped>
@import './HomeView.scss';
</style>
<style>
.pathshadow {
  opacity: 0.5;
}
</style>
