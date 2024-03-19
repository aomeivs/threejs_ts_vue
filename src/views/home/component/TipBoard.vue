<!--
 * @Author: zhou lei
 * @Date: 2024-03-14 13:27:40
 * @LastEditTime: 2024-03-19 14:22:33
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
import { Vector3 } from 'three'
let self: App
const init = (app: App) => {
  self = app
  self.createLineSVG(htmlMeshCollection)
  setTimeout(() => {
    self.createLineSVG([])
  }, 5000)
}
const linkHtmMesh = (elementId: string) => {
  const selectObject = scene.getObjectByName(elementId)

  if (selectObject) {
    self.setSelectMap(selectObject)
    const pos = new Vector3()
    selectObject.getWorldPosition(pos) //获取三维场景中某个对象世界坐标
    // 相机飞行到的位置和观察目标拉开一定的距离
    const endPos = pos.clone().addScalar(0.1)
    // new Vector3(0, 13, 9) 固定点镜头
    // 固定点和endpos相加后得到的镜头
    // new Vector3(0, 13, 9).add(endPos)
    self.createCameraTween(new Vector3(0, 13, 9).add(endPos), pos)
  }
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
      @click.stop="linkHtmMesh(item.target)"
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
      @click.stop="linkHtmMesh(item.target)"
    >
    </tip-item>
  </div>
</template>
