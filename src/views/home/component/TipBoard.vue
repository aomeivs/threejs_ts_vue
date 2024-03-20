<!--
 * @Author: zhou lei
 * @Date: 2024-03-14 13:27:40
 * @LastEditTime: 2024-03-20 14:09:54
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipBoard.vue
 * 联系方式:910592680@qq.com 科海达信息技术有限公司
-->
<script setup lang="ts">
import TipItem from './TipItem.vue'
import { htmlMeshCollection } from '../data'
import { App, scene, type HtmlMeshCollection } from '@/App'
import { onMounted, ref, watch } from 'vue'
import { Vector3 } from 'three'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const { equipmentList } = storeToRefs(useHomeStore())
const boardTopList = ref<HtmlMeshCollection[]>([])
const boardBottomList = ref<HtmlMeshCollection[]>([])
watch(equipmentList, () => {
  boardTopList.value = htmlMeshCollection.filter((html) => {
    const obj = equipmentList.value.find((child) => child.equipmentCode == html.target)
    if (obj) {
      Object.assign(html, obj)
      if (html.position === 'top') {
        return true
      }
    } else {
      return false
    }
  })
  boardBottomList.value = htmlMeshCollection.filter((html) => {
    const obj = equipmentList.value.find((child) => child.equipmentCode == html.target)
    if (obj) {
      Object.assign(html, obj)
      if (html.position === 'bottom') {
        return true
      }
    } else {
      return false
    }
  })
})
onMounted(() => {})
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

defineExpose({ init })
</script>

<template>
  <div class="tips-top">
    <tip-item
      v-for="(item, index) in boardTopList"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.alias"
      :state="item.equipmentValue"
      :style="{ left: 260 * index + 'px' }"
      @click.stop="linkHtmMesh(item.meshName)"
    >
    </tip-item>
  </div>
  <div class="tips-bottom">
    <tip-item
      v-for="(item, index) in boardBottomList"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.alias"
      :state="item.equipmentValue"
      :style="{ left: 260 * index + 'px' }"
      @click.stop="linkHtmMesh(item.meshName)"
    >
    </tip-item>
  </div>
</template>
