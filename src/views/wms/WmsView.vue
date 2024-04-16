<!--
 * @Author: zhou lei
 * @Date: 2024-04-01 16:59:53
 * @LastEditTime: 2024-04-01 17:22:46
 * @LastEditors: zhoulei && 910592680@qq.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/wms/WmsView.vue
-->
<template>
  <div class="wms" id="wms">
    <vue-draggable-resizable class="drag-item" :w="48" :h="48" :parent="true">
      <div>设备点位</div>
    </vue-draggable-resizable>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
#wms {
  width: 100vw;
  height: 100vh;
  position: relative;
  border: 8px solid #00000033;
}
.drag-item {
  border: 1px solid #ffffff33;
  cursor: move;
  font-size: 12px;
  background-color: rgb(77, 248, 131);
  color: black;
}
</style>
