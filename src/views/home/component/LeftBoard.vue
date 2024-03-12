<!-- 输送线速度、工艺温度、设备报警信息
 * @Author: zhou lei
 * @Date: 2024-03-12 13:04:14
 * @LastEditTime: 2024-03-12 13:18:59
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/LeftBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useHome } from '@/use/useHome'
const { initScrollData } = useHome()
const list = ref<any>([])
const interval = setInterval(() => {
  list.value = initScrollData()
}, 5000)
onMounted(() => {
  list.value = initScrollData()
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>
<template>
  <div class="board-left">
    <div class="board-item">
      <div class="board-item-title">输送线速度</div>
      <div class="board-item-value speed" style="height: 310px">
        <!-- speed -->
        <div v-for="n in 4" :key="n" class="item">
          <div class="no">
            <div class="icon">{{ n }}</div>
          </div>
          <div class="line-container">
            <div class="labels">
              <div class="name">循环风机{{ n }}</div>
              <div class="value">32432</div>
              <div class="unit">辆/时</div>
            </div>
            <div class="progress-bar">
              <el-progress
                color="#3E90F8"
                :percentage="50"
                :striped="true"
                :striped-flow="true"
                >{{
              }}</el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="board-item">
      <div class="board-item-title">工艺温度</div>
      <div class="board-item-value temperature" style="height: 200px">
        <!-- 温度 -->
        <div v-for="n in 6" :key="n" class="item">
          <div>循环风机</div>
          <div>20.0°C</div>
        </div>
      </div>
    </div>
    <div class="board-item">
      <div class="board-item-title">设备报警信息</div>
      <div class="device-total">
        <div class="total-item">
          <div class="txt">本月报警数量</div>
          <div class="num">10</div>
        </div>
        <div class="total-item">
          <div class="txt">全年报警数量</div>
          <div class="num">10</div>
        </div>
      </div>
      <div class="board-item-value" style="height: 200px">
        <div class="table-head">
          <div>报警内容</div>
          <div>报警时间</div>
          <div>状态</div>
          <div>操作</div>
        </div>
        <vue3-seamless-scroll v-if="list" :list="list" :step="0.4" class="scroll">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div>{{ item.title }}</div>
            <div>{{ item.date }}</div>
            <div>{{ item.state }}</div>
            <div @click="console.log(item.id)">
              <span class="btn">查看</span>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>
