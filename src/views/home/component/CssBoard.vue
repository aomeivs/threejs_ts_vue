<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-21 16:40:47
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description 模型上的2d元素，标注，弹窗
 * @FilePath: /vue3_ts_three/src/views/home/component/CssBoard.vue
 * 联系方式:910592680@qq.com
-->

<script setup lang="ts">
import { type App, type HtmlMeshCollection, equipment, show } from '@/App'
import { ref, watch } from 'vue'
import { htmlMeshCollection } from '../data'
// import dayjs from 'dayjs'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const { equipmentList } = storeToRefs(useHomeStore())

const keyValue = ref<number>(0)
watch(equipmentList, () => {
  keyValue.value++
})
const init = (app: App) => {
  app.createTurbineLabel('#css2object')
}
const formatUnit = (status: string | undefined) => {
  let txt = ''
  switch (status) {
    case '1':
      txt = '在线'
      break
    case '0':
      txt = '离线'
      break
    default:
      txt = '故障'
      break
  }
  return txt
}
const list = ref<HtmlMeshCollection[]>([])
list.value = htmlMeshCollection
defineExpose({ init })
</script>
<template>
  <div class="css2object" id="css2object" v-show="show">
    <div v-if="equipment" :key="keyValue">
      <div>设备名:{{ equipment.alias }}</div>
      <div>编号:{{ equipment.equipmentCode }}</div>
      <div>状态:{{ formatUnit(equipment.equipmentValue) }}</div>
    </div>
    <div class="triangle"></div>
  </div>
  <div
    v-for="(item, index) in list"
    :key="'css2object_' + index"
    class="css2object css2object2"
    :id="'css2object-' + item.target"
    style="display: none"
  >
    <div>
      <div>{{ item.alias }}</div>
    </div>
    <div class="triangle"></div>
  </div>
</template>
