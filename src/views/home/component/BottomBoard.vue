<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 13:35:28
 * @LastEditTime: 2024-03-20 17:03:46
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/BottomBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const { equipmentStatusList } = storeToRefs(useHomeStore())
onMounted(() => {})
</script>
<template>
  <div class="board-item device-status">
    <div class="board-item-title">设备状态</div>
    <div class="board-item-value" v-if="equipmentStatusList.length > 0">
      <div v-for="n in equipmentStatusList" :key="n.equipmentCode" class="device-status-item">
        <div class="icon" :class="[n.equipmentValue == '1'?'normal':'fault'] "></div>
        <div class="name">{{ n.equipmentName }}</div>
      </div>
    </div>
  </div>
</template>
