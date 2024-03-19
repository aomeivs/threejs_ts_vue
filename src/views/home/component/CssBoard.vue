<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-18 14:30:49
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description 模型上的2d元素，标注，弹窗
 * @FilePath: /vue3_ts_three/src/views/home/component/CssBoard.vue
 * 联系方式:910592680@qq.com
-->

<script setup lang="ts">
import type { App, Equipment, HtmlMeshCollection } from '@/App'
import { ref } from 'vue'
import { htmlMeshCollection } from '../data'
interface MyComponentProps {
  equipment: Equipment
  show: boolean
}
const { equipment, show } = defineProps<MyComponentProps>()
const init = (app: App) => {
  app.createTurbineLabel('#css2object')
}
const list = ref<HtmlMeshCollection[]>([])
list.value = htmlMeshCollection
defineExpose({ init })
</script>
<template>
  <div class="css2object" id="css2object" v-show="show">
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
