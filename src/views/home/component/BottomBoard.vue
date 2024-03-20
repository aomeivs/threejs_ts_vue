<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 13:35:28
 * @LastEditTime: 2024-03-20 10:20:01
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/BottomBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { useHomeStore } from '@/stores/home'
import { onMounted } from 'vue'
const homeStore = useHomeStore()
onMounted(() => {})
</script>
<template>
  <div class="board-item device-status">
    <div class="board-item-title">设备状态</div>
    <div class="board-item-value" v-if="homeStore.equipmentStatusList.length > 0">
      <div
        v-for="(n, index) in homeStore.equipmentStatusList"
        :key="n.equipmentCode"
        class="device-status-item"
      >
        <div class="icon" :class="{ online: index % 2 }"></div>
        <div class="name">{{ n.equipmentName }}</div>
      </div>
    </div>
  </div>
</template>
