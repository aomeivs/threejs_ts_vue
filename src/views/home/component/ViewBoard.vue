<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 17:35:20
 * @LastEditTime: 2024-03-21 11:20:42
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/ViewBoard.vue
 * 联系方式:910592680@qq.com
-->
<template>
  <div class="camera">
    <div @click="rotatCamera(1)" class="viewport1">俯视</div>
    <div @click="rotatCamera(2)" class="viewport2">鸟瞰</div>
    <div @click="rotatCamera(3)" class="viewport3">倾斜</div>
  </div>
</template>
<script setup lang="ts">
import type { App } from '@/App'

let self: App
const init = (app: App) => {
  self = app
}
const rotatCamera = (type: number) => self.rotatCamera(type)

defineExpose({ init })
</script>
