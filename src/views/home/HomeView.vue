<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-27 10:57:23
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/HomeView.vue
 * 
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TipBoard from '@/views/home/component/TipBoard.vue'
import CssBoard from '@/views/home/component/CssBoard.vue'
import LeftBoard from './component/LeftBoard.vue'
import BottomBoard from './component/BottomBoard.vue'
import headerBoard from './component/headerBoard.vue'
import ViewBoard from './component/ViewBoard.vue'
import { App } from '@/App'
const tipBoardRef = ref<InstanceType<typeof TipBoard> | null>(null)
const cssBorderRef = ref<InstanceType<typeof CssBoard> | null>(null)
const viewBoardRef = ref<InstanceType<typeof ViewBoard> | null>(null)
let app: App
const main = async () => {
  const container = document.getElementById('webgl-container')
  app = new App(container!) // 场景初始化
  await app.init() // 加载初始化
  app.start() // 循环渲染
  tipBoardRef.value!.init(app) // 初始化设备连线板
  cssBorderRef.value!.init(app) // 初始化点击提示板
  viewBoardRef.value!.init(app) // 初始化点击提示板
}
onMounted(() => {
  main()
})
</script>
<template>
  <div class="bg">
    <div class="bg-border">
      <header-board></header-board>
      <div class="board">
        <left-board></left-board>
        <div class="board-container">
          <div class="webgl-view">
            <view-board ref="viewBoardRef"></view-board>
            <!-- webgl-container -->
            <div class="webgl-container" id="webgl-container"></div>
            <tip-board ref="tipBoardRef"></tip-board>
          </div>
          <bottom-board ref="bottomBoardRef"></bottom-board>
        </div>
      </div>
    </div>
  </div>
  <css-board ref="cssBorderRef"></css-board>
</template>
<style lang="scss" scoped>
@import './HomeView.scss';
#webgl-viewport {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 200px;
  z-index: 9;
}
</style>
<style>
.pathshadow {
  opacity: 1;
}
</style>
