<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 13:35:28
 * @LastEditTime: 2024-03-19 16:38:55
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/BottomBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { useHome } from '@/use/useHome'
const { equipmentStatusList, getEquipmentStatus } = useHome()
// const fetchData = async () => {
//   try {
//     const { statusdata } = await getEquipmentStatus();
//     console.log('statusdata:', statusdata);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// // 首次获取数据
// fetchData();

// // 每5秒获取一次数据
// const interval = setInterval(fetchData, 5000);

// // 在组件销毁时清除定时器，避免内存泄漏
// onUnmounted(() => {
//   clearInterval(interval);
// });
</script>
<template>
  <div class="board-item device-status">
    <div class="board-item-title">设备状态</div>
    <div class="board-item-value">
      <div
        v-for="(n, index) in equipmentStatusList"
        :key="n.equipmentCode"
        class="device-status-item"
      >
        <div class="icon" :class="{ online: index % 2 }"></div>
        <div class="name">{{ n.equipmentName }}</div>
      </div>
    </div>
  </div>
</template>
