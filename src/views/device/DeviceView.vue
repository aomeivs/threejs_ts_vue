<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-04-16 15:24:46
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/device/DeviceView.vue
 * 
-->
<script setup lang="ts">
import LeftBoard from './component/LeftBoard.vue'
import BottomBoard from './component/BottomBoard.vue'
import headerBoard from './component/headerBoard.vue'
</script>
<template>
  <div class="bg">
    <div class="bg-border">
      <header-board></header-board>
      <div class="board">
        <left-board></left-board>
        <div class="board-container">
          <div class="webgl-view">
            <!-- 中心设备SVG -->
          </div>
          <bottom-board ref="bottomBoardRef"></bottom-board>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/views/device/HomeView.scss';
</style>
