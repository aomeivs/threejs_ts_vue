<!--
 * @Author: zhou lei
 * @Date: 2024-03-11 11:16:21
 * @LastEditTime: 2024-03-11 12:54:22
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipBoard.vue
 * 联系方式:910592680@qq.com
-->
<template>
  <div class="tips-top">
    <tips-board
      v-for="(item, index) in getTipsBoard(`top`)"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.meshName"
      :style="{ left: 220 * index + 'px' }"
    >
    </tips-board>
  </div>
  <div class="tips-bottom">
    <tips-board
      v-for="(item, index) in getTipsBoard(`bottom`)"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.meshName"
      :style="{ left: 220 * index + 'px' }"
    >
    </tips-board>
  </div>
</template>
<script setup>
import TipsBoard from './TipsBoard.vue'
import { getTipsBoard, htmlMeshCollection } from '../data'
import { App } from '@/App'
import { onMounted, watch } from 'vue'
const props = defineProps({
  app: {
    type: App
  }
})
const init = () => {
  props.app?.createLineSVG(htmlMeshCollection);
}
// watch(
//   () => props.app,
//   () => {
//     init()
//   }
// )
onMounted(() => {
  
  setTimeout(() => {
    init()
  }, 1000)
})
</script>
