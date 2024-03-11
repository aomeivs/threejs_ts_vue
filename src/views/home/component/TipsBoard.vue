<!--
 * @Author: zhou lei
 * @Date: 2024-03-08 17:30:37
 * @LastEditTime: 2024-03-11 09:31:40
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/TipsBoard.vue
 * 联系方式:910592680@qq.com
-->
<template>
  <div :class="className" :id="id">
    <div class="line"><div class="icon"></div></div>
    <div class="device">
      <slot name="default">
        <div class="name">支架盖042</div>
        <div class="code">XHN5261</div>
      </slot>
    </div>
    <div class="state">
      <div class="icon"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
// class 和 id都是从父组件获得的
const props = defineProps(['className', 'id'])
const { className, id } = props
</script>
