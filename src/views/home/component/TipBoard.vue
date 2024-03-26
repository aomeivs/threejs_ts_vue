<!--
 * @Author: zhou lei
 * @Date: 2024-03-14 13:27:40
 * @LastEditTime: 2024-03-25 11:07:04
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipBoard.vue
 *  科海达信息技术有限公司
-->
<script setup lang="ts">
import TipItem from './TipItem.vue'
import { htmlMeshCollection } from '../data'
import { App, scene } from '@/App'
import { onMounted, ref, watch } from 'vue'
import { Color, Vector3 } from 'three'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const { boardTopList, boardBottomList } = storeToRefs(useHomeStore())
onMounted(() => {})
watch(boardTopList, (newValue) => {
  meshWaring(newValue)
})
let self: App
const init = (app: App) => {
  self = app
  self.createLineSVG(htmlMeshCollection)
  // 演示箭头指向
  setTimeout(() => {
    self.createLineSVG([])
  }, 5000)
}
const currentElementName = ref<string>('')
const linkHtmMesh = (elementId: string) => {
  const selectObject = scene.getObjectByName(elementId)
  if (selectObject) {
    self.setSelectMap(selectObject)
    if (currentElementName.value === selectObject.name) {
      self.createCameraTween(new Vector3(0, 13, 9), new Vector3(0, 0, 0))
    } else {
      currentElementName.value = selectObject.name
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
}

/**
 * 模型报警监控
 */
const meshWaring = (newValue: any[]) => {
  const obj = newValue.find((item: { equipmentValue: string }) => item.equipmentValue === '0')
  if (obj && obj.meshName && scene) {
    const mesh = scene.getObjectByName(obj.meshName)
    mesh?.traverse((child: any) => {
      if (child.isMesh) {
        self?.selectAnimate(
          child,
          {
            emissive: new Color(0xff0000)
          },
          {
            emissive: new Color(0xff0000)
          },
          500,
          5
        )
      }
    })
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
      :meshName="item.meshName"
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
