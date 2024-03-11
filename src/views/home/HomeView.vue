<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-11 11:00:56
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/views/home/HomeView.vue
 * 联系方式:910592680@qq.com
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { App, show, equipment } from '@/App'
import TipsBoard from '@/views/home/component/TipsBoard.vue'
let app: App
const main = async () => {
  const container = document.getElementById('webgl-container')
  // const css2container = document.getElementById('css2object')
  app = new App(container!)
  await app.init()
  app.start()
}
onMounted(async () => {
  initScrollData()
  main()
})
const list = ref<any>([])
const initScrollData = () => {
  list.value = []
  for (let key = 0; key < 10; key++) {
    list.value.push({
      id: Date.now(),
      title:
        'Vue3.0 无缝滚动组件展示数据第1条无缝滚动组件展示数据第1条无缝滚动组件展示数据第1条'.substr(
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 30)
        ),
      date: '2024-01-01 12:12:00',
      state: '已处理'
    })
  }
}
</script>
<template>
  <div class="bg">
    <div class="bg-border">
      <div class="header">
        <div class="title">科维智能电控可视化</div>
        <div class="time">2024.01.12 08:35</div>
      </div>
      <div class="board">
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
        <div class="board-container">
          <div class="webgl-view">
            <div class="tips-top">
              <tips-board id="XHN5261" class="item item-1" name="支架盖042"> </tips-board>
              <tips-board id="XHN5262" class="item item-2" name="支架盖045"> </tips-board>
              <tips-board id="XHN5262" class="item item-2" name="支架盖045"> </tips-board>
            </div>
            <div class="tips-bottom">
              <tips-board id="XHN5263" class="item item-1" name="支架盖015"> </tips-board>
              <tips-board id="XHN5264" class="item item-2" name="支架盖033"> </tips-board>
              <tips-board
                id="XHN5266"
                class="item"
                name="支架盖024"
                :style="{ left: 220 * 2 + 'px' }"
              >
              </tips-board>
              <tips-board
                id="XHN5267"
                class="item"
                name="支架盖033"
                :style="{ left: 220 * 3 + 'px' }"
              >
              </tips-board>
              <tips-board
                id="XHN5265"
                class="item"
                name="支架盖012"
                :style="{ left: 220 * 4 + 'px' }"
              >
              </tips-board>
            </div>
            <!-- webgl-container -->
            <div class="webgl-container" id="webgl-container"></div>
          </div>

          <div class="board-item device-status">
            <div class="board-item-title">设备状态</div>
            <div class="board-item-value">
              <div v-for="n in 42" :key="n" class="device-status-item">
                <div class="icon" :class="{ online: n % 2 }"></div>
                <div class="name">循环风机</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="css2object" id="css2object" v-show="show">
    <div>
      <div>设备名:{{ equipment.name }}</div>
      <div>编号{{ equipment.userData }}</div>
      <div>温度</div>
      <div>状态{{}}</div>
      <div>运行时间{{ equipment.date }}</div>
    </div>
    <div class="triangle"></div>
  </div>
</template>
<style lang="scss" scoped>
@import './HomeView.scss';
</style>
<style>
.pathshadow {
  opacity: 0.5;
}
</style>
