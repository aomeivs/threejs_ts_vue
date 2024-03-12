<!--
 * @Author: zhou lei
 * @Date: 2024-03-11 11:16:21
 * @LastEditTime: 2024-03-12 12:32:56
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import TipItem from './TipItem.vue'
import { getTipsBoard, htmlMeshCollection } from '../data'
import { App } from '@/App'
import { defineExpose } from 'vue'

const init = (app: App) => {
  app.createLineSVG(htmlMeshCollection)
}
defineExpose({ init })
</script>

<template>
  <div class="tips-top">
    <tip-item
      v-for="(item, index) in getTipsBoard(`top`)"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.meshName"
      :style="{ left: 220 * index + 'px' }"
    >
    </tip-item>
  </div>
  <div class="tips-bottom">
    <tip-item
      v-for="(item, index) in getTipsBoard(`bottom`)"
      :key="item.target"
      :id="item.target"
      class="item"
      :name="item.meshName"
      :style="{ left: 220 * index + 'px' }"
    >
    </tip-item>
  </div>
</template>
