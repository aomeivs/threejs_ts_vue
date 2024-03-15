<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-15 18:05:21
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/CssBoard.vue
 * 联系方式:910592680@qq.com
-->

<script setup lang="ts">
import type { App, Equipment } from '@/App'
import { ref } from 'vue'
import { htmlMeshCollection } from '../data'
interface MyComponentProps {
  equipment: Equipment
}
const { equipment } = defineProps<MyComponentProps>()
const init = (app: App) => {
  app.createTurbineLabel('#css2object')
}
const list = ref<any>([])
list.value = htmlMeshCollection
defineExpose({ init })
</script>
<template>
  <div class="css2object" id="css2object" style="display: none">
    <div>
      <div>设备名:{{ equipment.name }}</div>
      <div>编号{{ equipment.userData }}</div>
      <div>温度</div>
      <div>状态{{}}</div>
      <div>运行时间{{ equipment.date }}</div>
    </div>
    <div class="triangle"></div>
  </div>
  <div
    v-for="(item, index) in list"
    :key="index"
    class="css2object"
    :id="'css2object-' + item.target"
    style="display: none"
  >
    <div>
      <div>设备名:{{ equipment.name }}</div>
      <div>编号{{ equipment.userData }}</div>
      <div>温度</div>
      <div>状态{{}}</div>
      <div>运行时间{{ equipment.date }}</div>
    </div>
    <div class="triangle"></div>
  </div>
</template>
