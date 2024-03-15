<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-15 17:59:55
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/CssBoard.vue
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
  <div class="css2object" id="css2object" style="display: none;">
    <div>
      <div>设备名:{{ equipment.name }}</div>
      <div>编号{{ equipment.userData }}</div>
      <div>温度</div>
      <div>状态{{}}</div>
      <div>运行时间{{ equipment.date }}</div>
    </div>
    <div class="triangle"></div>
  </div>
  <div class="css2object" id="css2object-XHN5262" style="display: none;">
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
