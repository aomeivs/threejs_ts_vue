<!--
 * @Author: zhou lei
 * @Date: 2024-03-08 17:30:37
 * @LastEditTime: 2024-03-18 13:17:25
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipItem.vue
 * 联系方式:910592680@qq.com
-->
<template>
  <div :class="className" :id="id">
    <div class="line"><div class="icon"></div></div>
    <div class="device">
      <slot name="default">
        <div class="name">{{ name }}</div>
        <div class="code">{{ id }}</div>
      </slot>
    </div>
    <div  class="state">
      <div v-if="state==0" class="icon"></div>
      <div v-else class="icon1"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
// class 和 id都是从父组件获得的
const props = defineProps(['className', 'id', 'name', 'state'])
const { className, id, state } = props
</script>
