<!--
 * @Author: zhou lei
 * @Date: 2024-03-14 13:27:40
 * @LastEditTime: 2024-03-18 13:39:34
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipBoard.vue
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
-->
<script setup lang="ts">
import TipItem from './TipItem.vue'
import { getTipsBoard, htmlMeshCollection } from '../data'
import { App, scene } from '@/App'
import { computed } from 'vue'
let self: App
const init = (app: App) => {
  // app.createLineSVG(htmlMeshCollection)
  self = app
}
const linkHtmMesh = (elementId: string) => {
  console.log('elementId>>>>>', elementId)
  // self.createLineSVG(htmlMeshCollection.filter((child) => child.target === elementId))
  const selectObject = scene.getObjectByName(elementId)
  selectObject && self.setSelectMap(selectObject)
}
const getTipsBoardTop = computed(() => {
  return getTipsBoard(`top`)
})
const getTipsBoardBottom = computed(() => {
  return getTipsBoard(`bottom`)
})
defineExpose({ init })
</script>

<template>
  <div class="tips-top">
    <tip-item
      v-for="(item, index) in getTipsBoardTop"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.alias"
      :style="{ left: 220 * index + 'px' }"
      @click="linkHtmMesh(item.target)"
    >
    </tip-item>
  </div>
  <div class="tips-bottom">
    <tip-item
      v-for="(item, index) in getTipsBoardBottom"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.alias"
      :style="{ left: 220 * index + 'px' }"
      @click="linkHtmMesh(item.target)"
    >
    </tip-item>
  </div>
  <!-- <div id="circlePoint" class="circle-animate animate__animated animate__flash animate__slow animate__infinite"></div> -->
</template>
