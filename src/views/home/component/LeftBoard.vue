<!--
 * @Author: zhou lei
 * @Date: 2024-03-12 13:04:14
 * @LastEditTime: 2024-03-20 16:38:50
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/component/LeftBoard.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useHome } from '@/use/useHome'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
const { getEquipmentwarning, getEquipmentStatus, equipmentWarning,clearHomeInterval } = useHome()
const { equipmentSpeedList, equipmentTemperatureList } = storeToRefs(useHomeStore())
const formatUnit = (value: string, type: string) => {
  if (type === 'speed') {
    return Math.ceil((+value / 13) * 100)
  } else if (type === 'temperature') {
    return `${value}°C`
  }
}
onMounted(() => {
  getEquipmentwarning()
  getEquipmentStatus()
})
onUnmounted(() => {
  clearHomeInterval()
})
</script>
<template>
  <div class="board-left">
    <div class="board-item">
      <div class="board-item-title">输送线速度</div>
      <div class="board-item-value speed" style="height: 310px">
        <!-- speed -->
        <template v-if="equipmentSpeedList.length > 0">
          <div v-for="(n, index) in equipmentSpeedList" :key="n.equipmentCode" class="item">
            <div class="no">
              <div class="icon">{{ index + 1 }}</div>
            </div>
            <div class="line-container">
              <div class="labels">
                <div class="name">{{ n.equipmentName }}</div>
                <div class="value">{{ n.equipmentValue }}</div>
                <div class="unit">米/分</div>
              </div>
              <div class="progress-bar">
                <el-progress
                  color="#3E90F8"
                  :percentage="formatUnit(n.equipmentValue, 'speed')"
                  :striped="true"
                  :striped-flow="true"
                  >{{ formatUnit(n.equipmentValue, 'speed') + '%' }}</el-progress
                >
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="board-item">
      <div class="board-item-title">工艺温度</div>
      <div class="board-item-value temperature" style="height: 200px">
        <!-- 温度 -->
        <template v-if="equipmentTemperatureList.length > 0">
          <div v-for="n in equipmentTemperatureList" :key="n.equipmentCode" class="item">
            <div>{{ n.equipmentName }}</div>
            <div>{{ n.equipmentValue }}°C</div>
          </div>
        </template>
      </div>
    </div>
    <div class="board-item">
      <div class="board-item-title">设备报警信息</div>
      <div class="device-total">
        <div class="total-item">
          <div class="txt">本月报警数量</div>
          <div class="num">{{ equipmentWarning?.inThoseDays }}</div>
        </div>
        <div class="total-item">
          <div class="txt">全年报警数量</div>
          <div class="num">{{ equipmentWarning?.theSameMonth }}</div>
        </div>
      </div>
      <div class="board-item-value" style="height: 200px">
        <div class="table-head">
          <div>报警内容</div>
          <div>报警时间</div>
          <div>状态</div>
          <div>操作</div>
        </div>
        <vue3-seamless-scroll
          v-if="equipmentWarning"
          :list="equipmentWarning.getequipmentWarningRTs"
          :step="0.6"
          class="scroll"
        >
          <div
            class="item"
            v-for="(item, index) in equipmentWarning.getequipmentWarningRTs"
            :key="index"
          >
            <div>{{ item.name }}</div>
            <div>{{ item.createTime }}</div>
            <div>{{ item.isDispose }}</div>
            <div @click="console.log(item.name)">
              <span class="btn">查看</span>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>
