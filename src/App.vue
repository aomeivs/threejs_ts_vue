<!--
 * @Author: zhou lei
 * @Date: 2024-01-29 10:38:55
 * @LastEditTime: 2024-03-04 15:37:58
 * @LastEditors: zhoulei zhoulei@kehaida.com
 * @Description: Description
 * @FilePath: /vue3_ts_three/src/App.vue
 * 联系方式:910592680@qq.com 
-->
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { App, show, equipment } from './App'
const isPlay = ref(true)
let app: App
const config = reactive({
  data: [66, 45],
  shape: 'roundRect'
})
const main = async () => {
  const container = document.getElementById('scene-container')
  // const css2container = document.getElementById('css2object')
  app = new App(container!)
  // await app.init()
  app.start()
}
onMounted(() => {
  main()
})
const demo = () => {
  alert('这是方向3icon')
}

const play = async () => {
  app.play('Anim_0', isPlay.value)
  isPlay.value = !isPlay.value
}
</script>

<template>
  <div class="wrapper" id="scene-container"></div>
  <dov class="css2object" id="css2object" v-show="show">
    <div>
      <div>设备名:{{ equipment.name }}</div>
      <div>编号</div>
      <div>温度</div>
      <div>状态{{}}</div>
      <div>运行时间{{}}</div>
    </div>
    <div class="triangle"></div>
  </dov>
  <div class="control">
    <!-- <button type="button" @click="play">play</button> -->
  </div>
  <div class="view">
    <div class="v-bg title">
      <dv-border-box11 title="悬挂链控制系统" :title-width="400" :animate="true">
        <div dv-bg>悬挂链控制系统</div>
      </dv-border-box11>
    </div>
    <div class="v-body">
      <div class="v-b v-b-1">
        <div demo-bg>
          <dv-border-box12>
            <div class="content" dv-bg>
              数据内容1
              <div id="line1" @click="demo">这是方向icon</div>
            </div>
          </dv-border-box12>
        </div>
        <div demo-bg>
          <dv-border-box12>
            <div class="content" dv-bg>数据内容2</div>
          </dv-border-box12>
        </div>
        <div class="water">
          <div>
            <div>数据1</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
          <div>
            <div>数据2</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
          <div>
            <div>数据3</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
        </div>
      </div>
      <div class="v-b v-b-2">
        <!-- <dv-border-box1 ref="borderRef">
          <div>悬挂链控制系统</div>
        </dv-border-box1> -->
      </div>
      <div class="v-b v-b-3">
        <div demo-bg>
          <dv-border-box12>
            <div class="content" dv-bg>
              数据内容3
              <div id="line3">这是方向3icon</div>
            </div>
          </dv-border-box12>
        </div>
        <div demo-bg>
          <dv-border-box12>
            <div class="content" dv-bg>数据内容4
              <div id="line4">icon4</div>
            </div>
          </dv-border-box12>
        </div>
        <div class="water">
          <div>
            <div>数据1</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
          <div>
            <div>数据2</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
          <div>
            <div>数据3</div>
            <dv-water-level-pond :config="config" style="width: 120px; height: 120px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
}
.control {
  position: absolute;
  right: 10px;
  top: 10px;
}
.css2object {
  position: absolute;
  top: 0;
  width: 300px;
  height: 200px;
  margin-left: 150px;
  margin-top: -100px;
  background: rgba(0, 148, 253, 0.794);
  color: white;
  font-weight: bold;
  border-radius: 8px 8px 8px 0;
  box-shadow: 0 0 8px #00b1ff;
  padding: 8px;
  list-style: none;
  .deg {
    width: 8px;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
  }
  .triangle {
    position: absolute; /* 设置相对定位 */
    bottom: 0;
    left: -10px;
  }

  /* 使用 ::before 伪元素来创建三角形 */
  .triangle::before {
    content: ''; /* 必需属性，表示没有内容 */
    position: absolute; /* 设置绝对定位 */
    bottom: -10px; /* 调整三角形与矩形之间的距离 */
    left: 50%; /* 将三角形水平居中 */
    transform: translateX(-50%); /* 再次调整三角形的位置 */
    transform: rotate(225deg); /* 旋转三角形
    width: 20px; /* 控制三角形的大小 */
    height: 20px;
    background-color: transparent; /* 清除默认背景色 */
    border-style: solid; /* 设置为实线边框 */
    border-width: 10px; /* 控制边框的宽度 */
    border-top-color: transparent; /* 上边框不显示 */
    border-right-color: transparent; /* 右边框不显示 */
    border-bottom-color: #ff0; /* 下边框显示为黑色 */
    border-left-color: transparent; /* 左边框不显示 */
  }
}
.view {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  & > div {
    background: #00000033;
  }
  .v-bg {
    width: 100%;
    height: 100vh;
    background: transparent;
    // padding: 12px;
  }
  .v-body {
    // display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 400px auto 400px;
    grid-gap: 8px;
    // grid-template-areas: 'a . c';
    .v-b {
      .content {
        pointer-events: all;
      }
      flex: 1 1 0;
      padding-top: 80px;
      &-1,
      &-3 {
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-content: space-between;
        flex-direction: column;
      }
      :deep(.content) {
        padding: 12px;
        height: 350px;
      }
      .water {
        padding-top: 8px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
<style>
#svgContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
