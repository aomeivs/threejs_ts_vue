<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-14 13:32:42
 * @LastEditors: zhou lei
 * @Description: Description
 * @FilePath: /threejs_ts_vue/src/views/home/component/CssBoard.vue
 * 联系方式:910592680@qq.com
-->

<script setup lang="ts">
import type { App, Equipment } from '@/App'
interface MyComponentProps {
  equipment: Equipment
}
const { equipment} = defineProps<MyComponentProps>()
const init = (app:App) => {
  app.createTurbineLabel('#css2object')
}

defineExpose({ init })
</script>
<template>
  <div class="css2object" id="css2object">
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
