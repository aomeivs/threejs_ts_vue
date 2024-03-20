<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 10:58:02
 * @LastEditTime: 2024-03-20 16:14:12
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description 模型上的2d元素，标注，弹窗
 * @FilePath: /vue3_ts_three/src/views/home/component/CssBoard.vue
 * 联系方式:910592680@qq.com
-->

<script setup lang="ts">
import type { App, HtmlMeshCollection } from '@/App'
import { ref, toRefs, watch } from 'vue'
import { htmlMeshCollection } from '../data'
// import dayjs from 'dayjs'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const { equipmentList } = storeToRefs(useHomeStore())
interface MyComponentProps {
  equipment: HtmlMeshCollection
  show: boolean
}
const props = defineProps<MyComponentProps>()
const { equipment, show } = toRefs(props)
const keyValue = ref<number>(0)
watch(equipmentList, () => {
  keyValue.value++
})
const init = (app: App) => {
  app.createTurbineLabel('#css2object')
}
// let date = ref<string>(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// setInterval(() => {
//   date.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
// }, 1000)

const list = ref<HtmlMeshCollection[]>([])
list.value = htmlMeshCollection
defineExpose({ init })
</script>
<template>
  <div class="css2object" id="css2object" v-show="show">
    <div :key="keyValue">
      <div>设备名:{{ equipment?.alias }}</div>
      <div>编号{{ equipment?.equipmentCode }}</div>
      <div>温度{{ equipment?.equipmentValue }}</div>
      <!-- <div>{{ date }}</div> -->
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
