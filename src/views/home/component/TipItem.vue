<!--
 * @Author: zhou lei
 * @Date: 2024-03-08 17:30:37
 * @LastEditTime: 2024-03-21 14:48:11
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipItem.vue
 * 联系方式:910592680@qq.com
-->
<template>
  <div :id="id" :key="id">
    <div class="line"><div class="icon"></div></div>
    <div class="device">
      <slot name="default">
        <div class="name">{{ name }}</div>
        <div class="code">{{ id }}</div>
      </slot>
    </div>
    <div class="state">
      <!-- offLine fault -->
      <div class="icon" :class="[props.state == '1' ? 'normal' : 'fault']"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// class 和 id都是从父组件获得的
const props = defineProps(['id', 'name', 'state', 'meshName'])
</script>
