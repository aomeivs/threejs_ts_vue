<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 17:35:20
 * @LastEditTime: 2024-03-26 13:21:29
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/ViewBoard.vue
 * 
-->
<template>
  <div class="camera">
    <div @click="rotatCamera(1)" class="viewport1">俯视</div>
    <div @click="rotatCamera(2)" class="viewport2">鸟瞰</div>
    <div @click="rotatCamera(3)" class="viewport3">倾斜</div>
    <!-- 移除和恢复动画更新（重新播放） -->
    <div @click="remove('C_DD_JT1')" style="display: none;">remove:C_DD_JT1</div>
    <div @click="resume('C_DD_JT1')" style="display: none;">resume:C_DD_JT1</div>
  </div>
</template>
<script setup lang="ts">
import { type App, loop } from '@/App'

let self: App
const init = (app: App) => {
  self = app
}
const rotatCamera = (type: number) => self.rotatCamera(type)
const remove = (name: string) => loop.remove(name)
const resume = (name: string) => loop.resume(name)
defineExpose({ init })
</script>
