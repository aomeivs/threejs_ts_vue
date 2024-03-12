<template>
  <div class="board-item device-status">
    <div class="board-item-title">设备状态</div>
    <div class="board-item-value">
      <div v-for="n in 52" :key="n" class="device-status-item">
        <div class="icon" :class="{ online: n % 2 }"></div>
        <div class="name">循环风机</div>
      </div>
    </div>
  </div>
</template>
